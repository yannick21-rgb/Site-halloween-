"use client";

import { useEffect, useRef } from "react";
import { useSite } from "@/components/providers/site-provider";

/**
 * Nappe d'ambiance sonore de la boutique.
 *
 * Aucun fichier audio : tout est synthétisé à la volée par la Web Audio API.
 * Un sample mp3 d'1 Mo coûterait plus cher en octets que l'ensemble de cette
 * implémentation, et il ne permettrait pas de faire varier l'ambiance au zeitgeist
 * de la page.
 *
 * Trois couches, volontairement discrètes :
 * - un bourdon grave (deux oscillateurs légèrement désaccordés) ;
 * - un souffle large (bruit filtré, lent) ;
 * - des craquements de boiserie espacés et aléatoires.
 *
 * Le navigateur bloque l'audio tant que l'utilisateur n'a pas interagi avec la
 * page. Le contexte est donc créé au premier geste utilisateur, et l'état
 * `suspended` est récupéré quand la page revient au premier plan.
 */
export function AmbientSound() {
  const { soundEnabled } = useSite();
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const creakTimerRef = useRef<number | null>(null);
  const creakRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!soundEnabled) return;

    // Reporté après le clic : sur iOS le contexte doit être créé dans le geste.
    const start = () => {
      const existing = contextRef.current;
      if (existing) {
        // Son coupé puis rallumé : il faut remonter le gain et relancer les
        // craquements, le contexte et les oscillateurs étant toujours en place.
        void existing.resume().then(() => {
          const master = masterRef.current;
          if (!master) return;
          const at = existing.currentTime;
          master.gain.cancelScheduledValues(at);
          master.gain.setValueAtTime(0, at);
          master.gain.linearRampToValueAtTime(0.16, at + 2);

          if (!creakTimerRef.current) creakRef.current?.();
        });
        return;
      }

      const AudioContextClass =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      contextRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterRef.current = master;

      const now = ctx.currentTime;

      // Montée douce : jamais de pic audio au démarrage.
      master.gain.linearRampToValueAtTime(0.16, now + 2.5);

      // --- bourdon grave ---
      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.5;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 220;
      droneGain.connect(lowpass).connect(master);

      [55, 55.6, 82.5].forEach((frequency) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = frequency;
        osc.connect(droneGain);
        osc.start();
      });

      // Respiration lente du filtre.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 70;
      lfo.connect(lfoDepth).connect(lowpass.frequency);
      lfo.start();

      // --- souffle large ---
      const buffer = ctx.createBuffer(
        1,
        ctx.sampleRate * 4,
        ctx.sampleRate,
      );
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < channel.length; i += 1) {
        // Bruit brun approximé : moyenne glissante, moins agressif que blanc.
        channel[i] = (Math.random() * 2 - 1) * 0.4;
      }
      const wind = ctx.createBufferSource();
      wind.buffer = buffer;
      wind.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = "lowpass";
      windFilter.frequency.value = 420;

      const windGain = ctx.createGain();
      windGain.gain.value = 0.12;

      wind.connect(windFilter).connect(windGain).connect(master);
      wind.start();

      const scheduleCreak = () => {
        // Entre 7 et 16 secondes.
        creakTimerRef.current = window.setTimeout(
          creak,
          7000 + Math.random() * 9000,
        );
      };

      const creak = () => {
        if (!contextRef.current || !masterRef.current) return;

        const at = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140 + Math.random() * 90, at);
        osc.frequency.exponentialRampToValueAtTime(60, at + 0.5);

        const creakGain = ctx.createGain();
        creakGain.gain.setValueAtTime(0.0001, at);
        creakGain.gain.exponentialRampToValueAtTime(0.05, at + 0.04);
        creakGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.6);

        const creakFilter = ctx.createBiquadFilter();
        creakFilter.type = "bandpass";
        creakFilter.frequency.value = 700;
        creakFilter.Q.value = 6;

        osc.connect(creakFilter).connect(creakGain).connect(master);
        osc.start(at);
        osc.stop(at + 0.65);

        scheduleCreak();
      };

      creakRef.current = creak;
      creakTimerRef.current = window.setTimeout(creak, 4000);
    };

    // Reprise d'un audio suspendu (onglet revenu au premier plan, etc.).
    const onVisible = () => {
      if (document.visibilityState === "visible" && contextRef.current) {
        void contextRef.current.resume();
      }
    };

    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    document.addEventListener("visibilitychange", onVisible);
    start();

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [soundEnabled]);

  // Extinction propre quand le visiteur coupe le son.
  useEffect(() => {
    const context = contextRef.current;
    const master = masterRef.current;

    if (soundEnabled || !context || !master) return;

    const at = context.currentTime;

    // `cancelAndHoldAtTime` fige la rampe en cours ; sinon on repart de la
    // valeur instantanée, ce qui peut provoquer un petit saut audible.
    if (typeof master.gain.cancelAndHoldAtTime === "function") {
      master.gain.cancelAndHoldAtTime(at);
    } else {
      master.gain.cancelScheduledValues(at);
      master.gain.setValueAtTime(master.gain.value, at);
    }

    master.gain.linearRampToValueAtTime(0, at + 0.6);

    if (creakTimerRef.current) {
      window.clearTimeout(creakTimerRef.current);
      creakTimerRef.current = null;
    }

    // On suspend le contexte après la fondu : sans ça, les oscillateurs
    // tourneraient en silence et le thread audio resterait occupé.
    window.setTimeout(() => {
      if (!soundEnabled) void context.suspend();
    }, 700);
  }, [soundEnabled]);

  // Ménage complet au démontage : sans cela, le contexte reste ouvert et le
  // navigateur affiche l'icône « audio en cours ».
  useEffect(
    () => () => {
      if (creakTimerRef.current) window.clearTimeout(creakTimerRef.current);
      creakRef.current = null;
      void contextRef.current?.close();
      contextRef.current = null;
      masterRef.current = null;
    },
    [],
  );

  return null;
}

/**
 * Araignée suspendue à un fil, dans un coin de l'écran.
 *
 * Aucun état React : le composant est décoratif et doit coûter le moins
 * possible au navigateur. Le fil et la bestiole sont deux divs animées en CSS.
 */
export function SpiderWeb() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="spider-corner">
        <div className="spider-thread" />
        <div className="spider-body">
          <span className="spider-leg" />
          <span className="spider-leg" />
          <span className="spider-leg" />
          <span className="spider-leg" />
        </div>
      </div>
    </div>
  );
}

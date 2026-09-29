export const CURRENCIES = ["EUR", "USD"] as const;

export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
};

const FORMATTERS: Record<Currency, Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
};

export function formatPrice(amount: number, currency: Currency): string {
  return FORMATTERS[currency].format(amount);
}

/** Fourchette de prix affichée quand les deux devises sont proposées. */
export function formatPriceRange(
  prices: Record<Currency, number>,
  currency: Currency,
): string {
  const other: Currency = currency === "EUR" ? "USD" : "EUR";
  if (prices[currency] === prices[other]) {
    return formatPrice(prices[currency], currency);
  }
  return `${formatPrice(prices[currency], currency)} / ${formatPrice(prices[other], other)}`;
}

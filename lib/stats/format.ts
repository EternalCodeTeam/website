const THOUSAND = 1000;
const MILLION = 1_000_000;

function trimDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

/**
 * Formats a raw metric into the compact form used across the site (e.g. 38732 -> "38.7k").
 */
export function formatStatValue(value: number): string {
  if (value < THOUSAND) {
    return String(value);
  }

  if (value < MILLION) {
    return `${trimDecimal(value / THOUSAND)}k`;
  }

  return `${trimDecimal(value / MILLION)}m`;
}

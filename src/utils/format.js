/** Whole-euro price: "45 €" in Serbian, "€45" in English. */
export function formatEuro(intl, value) {
  return intl.formatNumber(value, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatRating(intl, value) {
  return intl.formatNumber(value, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const currencyToLocale: Record<string, string> = {
  PHP: "en-PH",
  USD: "en-US",
  EUR: "de-DE",
  JPY: "ja-JP",
  AUD: "en-AU",
  GBP: "en-GB",
};

export const toCurrency = (value: string | number, currency: string = "PHP") => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) throw new Error("Invalid number");

  const locale = currencyToLocale[currency] || "en-US"; // fallback to en-US

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(num);
};

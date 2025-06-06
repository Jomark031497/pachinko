export const toCurrency = (value: string) => {
  if (isNaN(parseInt(value))) throw new Error("Invalid nubmer");

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(parseInt(value));
};

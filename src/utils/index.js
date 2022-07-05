export const priceIdentifier = (prices, currency = "USD") => {
  const pricesArr = [...prices];
  const price = pricesArr.filter(
    (price) => price.currency.label === currency.toUpperCase()
  );

  return price[0];
};

export const getCartTotal = (cart, currencyLabel, extra) => {
  const pricesArray = [...cart].map((product) => ({
    ...product.prices.filter(
      (price) => price.currency.label === currencyLabel
    )[0],
    qty: product.qty,
  }));

  const currency = pricesArray[0].currency;

  const total = Number(
    pricesArray.reduce(
      (amount, product) => product.amount * product.qty + amount,
      0
    )
  ).toFixed(2);

  return { total, currency };
};

export const getCartTotalProducts = (cart) => {
  const cartArr = [...cart];

  const qtys = cartArr.map((product) => product.qty);
  const total = qtys.reduce((amount, qty) => qty + amount);

  return total;
};

export const replaceItemAtIndex = (array, item, index) => {
  const arrayCopy = [...array];
  arrayCopy[index] = item;

  return arrayCopy;
};

// tried - but realized not needed for now
export const getPDPAlertFromAttributes = (attrs) => {
  const attributes = [...attrs];

  const extract = attributes.map((attr) => ({
    name: attr.name,
    value: attr.selection.displayValue,
  }));
  let alertStr = `Product variation added to cart <br />`;
  extract.forEach((item, index) => {
    alertStr += `${item.name}: ${item.value} <br />`;
  });

  return alertStr;
};

export const calculateTax = (amount, rate) => {
  return ((parseFloat(rate) / 100) * parseFloat(amount)).toFixed(2);
};

export const getRandomNumberBetween = (x, y) => {
  const num = Math.floor(Math.random() * y) + 1;
  return num;
};

export const detectCartProductVariants = (variants, current) => {
  const prevVariants = [...variants];
  const currentVariant = { ...current };
  let isUnique = true;

  const prevAttributeSets = prevVariants.map((product) => product.attributes);
  let prevMinifiedAttributeSets = [];

  for (let i = 0; i < prevAttributeSets.length; i++) {
    const minifiedVersion = prevAttributeSets[i].map(
      (attributeSet) =>
        `${attributeSet.name}:${attributeSet.selection.displayValue}`
    );
    prevMinifiedAttributeSets.push(minifiedVersion);
  }

  const currentAttributeSets = currentVariant.attributes;
  const currentMinifiedAttributeSets = currentAttributeSets.map(
    (attributeSet) =>
      `${attributeSet.name}:${attributeSet.selection.displayValue}`
  );

  // doing shallow/deep compare
  for (let i = 0; i < prevMinifiedAttributeSets.length; i++) {
    if (
      JSON.stringify(prevMinifiedAttributeSets[i]) ===
      JSON.stringify(currentMinifiedAttributeSets)
    ) {
      isUnique = false;
    }
  }

  return isUnique;
};

export const capitalizeString = (str) => {
  const str1 = String(str).charAt(0);
  const str2 = String(str).slice(1);

  return str1.toUpperCase() + str2;
};

export const convertDecimals = (figure, decimalPoints) => {
  return Number(figure).toFixed(decimalPoints);
};

export const splitString = (str, chars, continueIndicator = true) => {
  return `${String(str).substring(0, chars)}${continueIndicator && "..."}`;
};

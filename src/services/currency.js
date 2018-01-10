const asCurrency = (value, currency = "USD") => {
  const val = parseFloat(`${value}`).toFixed(2);

  return `$${val}`;
};

export {
  asCurrency
};

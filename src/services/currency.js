const API_BASE = "/";

let currentCurrency = null;
let rates = null;

const SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£"
};

const getCurrency = () => {
  if (!currentCurrency) {
    currentCurrency = localStorage.getItem("currency") || "USD";
  }

  return currentCurrency;
};

const setCurrency = (currency) => {
  currentCurrency = currency;
  localStorage.setItem("currency", currency);
};

const asCurrency = (value) => {
  const symbol = SYMBOLS[currentCurrency] || "$";
  const rate = rates[currentCurrency] || 1;
  const val = parseFloat(`${value}`) * rate;

  return `${symbol}${val.toFixed(2)}`;
};

const fetchCurrencyRates = () =>
  window.fetch(`${API_BASE}rates.json`).then(
    res => res.json()
  ).then((json) => {
    rates = json.rates;
  });

export {
  asCurrency,
  fetchCurrencyRates,
  getCurrency,
  setCurrency
};

const API_BASE = "/";

const getCoins = () =>
  window.fetch(`${API_BASE}coins.json`).then(res => res.json());

const getPrices = () =>
  window.fetch(`${API_BASE}prices.json`).then(res => res.json());

export {
  getCoins,
  getPrices,
};

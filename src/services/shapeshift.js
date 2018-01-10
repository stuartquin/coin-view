const API_BASE = "/";

const getPrices = () =>
  window.fetch(`${API_BASE}prices.json`).then(res => res.json());

export {
  getPrices,
};

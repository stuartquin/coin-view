const API_BASE = "/";

const getCoins = () =>
  window.fetch(`${API_BASE}coins.json`).then(res => res.json());

export {
  getCoins
};

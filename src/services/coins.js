const getCoins = () => {
  return JSON.parse(localStorage.getItem("coins") || "[]");
};

const addCoin = (symbol, amount) => {
  const coin = { symbol, amount };
  const coins = getCoins();
  const isExisting = coins.filter(c => c.symbol === symbol).length > 0;
  const updated = isExisting ?
    coins.map(c => c.symbol === symbol ? coin : c) :
    coins.concat([coin]);

  localStorage.setItem("coins", JSON.stringify(updated));
};

export { addCoin, getCoins };

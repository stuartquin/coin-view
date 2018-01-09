const getCoins = () => {
  return JSON.parse(localStorage.getItem("coins") || "[]");
};

const serializeCoin = (coin, amount) => {
  return {
    amount,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
  };
};

const addCoin = (coin, amount) => {
  const serialized = serializeCoin(coin, amount);
  const coins = getCoins();
  const isExisting = coins.filter(c => c.symbol === coin.symbol).length > 0;
  const updated = isExisting ?
    coins.map(c => c.symbol === coin.symbol ? serialized : c) :
    coins.concat([serialized]);

  localStorage.setItem("coins", JSON.stringify(updated));
};

export { addCoin, getCoins };

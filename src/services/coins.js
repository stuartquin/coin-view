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

const deleteCoin = (coin, amount) => {
  const coins = getCoins();
  const updated = coins.filter(c => c.symbol !== coin.symbol);

  localStorage.setItem("coins", JSON.stringify(updated));
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

const getOpeningPrice = (coin) => {
  const change = (
    parseFloat(coin.price_usd) / (100 + parseFloat(coin.percent_change_24h))
  );

  return change * 100;
};


const getSummary = (coins) => {
  const total = coins.reduce(
    (acc, coin) => acc + (parseFloat(coin.price_usd) * coin.amount), 0
  );
  const opening = coins.reduce(
    (acc, coin) => acc + (getOpeningPrice(coin) * coin.amount), 0
  );
  const percentage = (((total - opening) / opening) * 100.0).toFixed(2);

  return {
    total,
    opening,
    percentage,
    diff: total - opening,
  };
};

export {
  addCoin, getCoins, getSummary, getOpeningPrice, deleteCoin
};

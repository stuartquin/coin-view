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

const deleteCoin = (coin) => {
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

const getOpeningPrice = (coin, period) => {
  const change = (
    parseFloat(coin.price) / (100 + parseFloat(coin[period]))
  );

  return change * 100;
};


const getSummary = (coins, time) => {
  const period = `percent_change_${time}`;
  const summaryCoins = coins.filter(coin => coin.amount);
  const total = summaryCoins.reduce(
    (acc, coin) => acc + (parseFloat(coin.price) * coin.amount), 0
  );
  const opening = summaryCoins.reduce(
    (acc, coin) => acc + (getOpeningPrice(coin, period) * coin.amount), 0
  );
  const percentage = summaryCoins.length ?
    (((total - opening) / opening) * 100.0).toFixed(2) :
    0;

  return {
    total,
    opening,
    percentage,
    diff: total - opening,
  };
};

export {
  addCoin, getCoins, getSummary, deleteCoin
};

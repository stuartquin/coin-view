const https = require("https");
const fs = require("fs");

const priceUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD";
const shapeShiftUrl = "https://shapeshift.io/getcoins";
const currencyURL = "https://api.fixer.io/latest?base=USD";

const getPrices = () => {
  const options = {
    host: "pro-api.coinmarketcap.com",
    path: "/v1/cryptocurrency/listings/latest",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY
    }
  };

  return new Promise((resolve, reject) => {
    https.get(options, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });

      res.on("end", () => {
        if (res.statusCode < 400) {
          resolve(JSON.parse(body));
        } else {
          console.error(res.statusCode, body);
          reject();
        }
      });

      res.on("error", () => {
        console.error("Error fetching from");
        reject();
      });
    });
  });
};

const getData = (url, cb) => {
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      if (res.statusCode < 400) {
        cb(JSON.parse(body));
      } else {
        console.error(res.statusCode, url);
        cb();
      }
    });

    res.on("error", () => {
      console.error("Error fetching from", url);
      cb();
    });
  });
};

const getPriceUSD = price => price.quote && price.quote.USD;

getPrices().then(({ data }) => {
  getData(shapeShiftUrl, shapeShiftData => {
    const output = data
      .map(price => {
        if (shapeShiftData[price.symbol]) {
          return Object.assign({}, price, {
            ...price,
            ...getPriceUSD(price),
            image: shapeShiftData[price.symbol].image
          });
        }
        return null;
      })
      .filter(price => price);

    console.log("Coin data fetched");
    fs.writeFileSync("public/prices.json", JSON.stringify(output));
    console.log("Coin data saved");
  });
});

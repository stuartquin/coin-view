const https = require("https");
const fs = require("fs");

const priceUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=200";
const shapeShiftUrl = "https://shapeshift.io/getcoins";

const getData = (url, cb) => {
  https.get(url, (res) => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", (data) => {
      body += data;
    });
    res.on("end", () => {
      cb(JSON.parse(body));
    });
  });
};

getData(priceUrl, (priceData) => {
  getData(shapeShiftUrl, (shapeShiftData) => {
    const output = priceData.map((price) => {
      if (shapeShiftData[price.symbol]) {
        return Object.assign({}, price, {
          image: shapeShiftData[price.symbol].image
        });
      }
      return null;
    }).filter(price => price);

    console.log("Coin data fetched");
    fs.writeFileSync("public/prices.json", JSON.stringify(output));
    console.log("Coin data saved");
  });
});

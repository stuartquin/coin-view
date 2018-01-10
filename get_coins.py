import urllib.request
import json

price_url = "https://api.coinmarketcap.com/v1/ticker/?limit=200"
shapeshift_url = "https://shapeshift.io/getcoins"


def get_data(url):
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode())


shapeshift_data = get_data(shapeshift_url)
price_data = get_data(price_url)

output = []

for price in price_data:
    if price["symbol"] in shapeshift_data:
        price["image"] = shapeshift_data[price["symbol"]]["image"]
        output.append(price)

with open("public/prices.json", "w") as output_file:
    output_file.write(json.dumps(output))

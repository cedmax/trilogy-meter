const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

(async function() {
  const { data } = await axios.get(
    "https://trilogies-56fa5.firebaseio.com/.json"
  );
  const $ = cheerio.load(fs.readFileSync(`./public/index.html`));
  $("#movies").text(JSON.stringify(data));
  fs.writeFileSync("./public/index.html", $.html(), "utf-8");
})();

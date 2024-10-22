const fs = require("fs");
const cheerio = require("cheerio");

module.exports = series => {
  const updated = Date.now();
  const jsonData = JSON.stringify({ series, updated });
  const $ = cheerio.load(fs.readFileSync(`./public/index.html`));

  $("#movies").text(jsonData);
  fs.writeFileSync("./public/index.html", $.html(), "utf8");
};

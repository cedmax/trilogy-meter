(async () => {
  const seriesData = require("./data/trilogies.json").series;
  const series = await require("./fetch-data")(seriesData);
  require("./saveData")(series);
})();

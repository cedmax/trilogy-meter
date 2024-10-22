(async () => {
  const seriesData = await require("./fetch-firebase-data")();
  const series = await require("./fetch-data")(seriesData);
  require("./saveData")(series);
})();

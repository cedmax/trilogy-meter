const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get(
    "https://trilogies-56fa5.firebaseio.com/.json"
  );

  return data.series;
};

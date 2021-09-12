const axios = require("axios");
const saveData = require("./utils/saveData");

(async function() {
  const { data } = await axios.get(
    "https://trilogies-56fa5.firebaseio.com/.json"
  );
  
  saveData(data)
})();

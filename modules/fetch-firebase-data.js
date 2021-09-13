const axios = require('axios')
const saveData = require('./utils/saveData')

module.exports = async () => {
  const { data } = await axios.get(
    'https://trilogies-56fa5.firebaseio.com/.json'
  )

  saveData(data)
}

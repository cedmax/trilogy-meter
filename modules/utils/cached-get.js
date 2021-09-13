const fs = require('fs')
const axios = require('axios')
const sanitize = require('sanitize-filename')

const cache_folder = process.env.CACHE_FOLDER || './modules/.tmp/'
const isWithinTheWeek = file => new Date(fs.statSync(file).mtime > Date.now() - 604800000)

module.exports = async url => {
  const cacheName = `${cache_folder}${sanitize(url)}.json`
  if (fs.existsSync(cacheName) && isWithinTheWeek(cacheName)) {
    return require(`../.${cacheName}`)
  }

  const { data } = await axios.get(url)
  fs.writeFileSync(cacheName, JSON.stringify(data), 'utf8')
  return data
}

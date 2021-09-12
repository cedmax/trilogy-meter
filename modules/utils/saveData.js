const fs = require('fs')
const cheerio = require('cheerio')

module.exports = data => {
  data.updated = Date.now()
  const jsonData = JSON.stringify(data)
  const $ = cheerio.load(fs.readFileSync(`./public/index.html`))
  $('#movies').text(jsonData)
  fs.writeFileSync('./public/index.html', $.html(), 'utf8')
  fs.writeFileSync('./modules/.tmp/data.json', jsonData, 'utf8')
}

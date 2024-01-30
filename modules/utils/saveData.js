const fs = require('fs')
const cheerio = require('cheerio')

const cleanData = (jsonData) => {
  const newData = JSON.parse(jsonData);
  for (const serie in newData.series) {
    newData.series[serie].movies = newData.series[serie].movies.map(movie => {
      delete movie.poster
      return movie
    })
  }
  return JSON.stringify(newData)
}


module.exports = data => {
  data.updated = Date.now()
  const jsonData = JSON.stringify(data)
  const $ = cheerio.load(fs.readFileSync(`./public/index.html`))
  fs.writeFileSync('./modules/.tmp/data.json', jsonData, 'utf8')
  
  const newData = cleanData(jsonData)

  $('#movies').text(newData)
  fs.writeFileSync('./public/index.html', $.html(), 'utf8')
}

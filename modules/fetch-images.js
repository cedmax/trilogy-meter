const downloadImage = require('./utils/download-image')
const fs = require('fs')

module.exports = async () => {
  const data = JSON.parse(fs.readFileSync('./modules/.tmp/data.json'))

  for (const [i, serie] of data.series.entries()) {
    try {
      console.log(
        `fetching images for: ${serie.title} – ${i + 1}/${
          data.series.length
        } – ${serie.movies.length} movies`
      )
      await Promise.all(serie.movies.map(downloadImage))
    } catch (e) {
      console.log(e)
    }
  }
}

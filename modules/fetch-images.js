const downloadImage = require('./utils/download-image');


;(async function () {
  const data = require('./.tmp/data.json')

  const series = []
  for (const [i, serie] of data.series.entries()) {
    try {
      console.log(`fetching data for: ${serie.title} – ${i+1}/${data.series.length} – ${serie.movies.length} movies`)
      await Promise.all(serie.movies.map(downloadImage));
    } catch (e) {
      console.log(e)
    }
  }

})()

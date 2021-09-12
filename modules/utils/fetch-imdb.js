const get = require('./cached-get')
const cheerio = require('cheerio')

const fetchImdb = async movie => {
  try {
    const data  = await get(
      `https://www.imdb.com/title/${movie.imdb}/`
    )
    const $ = cheerio.load(data)
    const img = $('.ipc-poster img').attr('src')
    const schema = JSON.parse($('script[type="application/ld+json"]').html())
    const rating = parseFloat(
      schema.aggregateRating && schema.aggregateRating.ratingValue
    )
    const votes = parseInt(
      schema.aggregateRating && schema.aggregateRating.ratingCount,
      10
    )

    return {
      poster: img,
      votes,
      rating: isNaN(rating) ? null : rating
    }
  } catch (e) {
    console.log(e)
    await new Promise(resolve => setTimeout(resolve, 5000))
    return fetchImdb(movie)
  }
}

module.exports = fetchImdb

const get = require('./cached-get')
const cheerio = require('cheerio')
const omdbkey = process.env.IMDB

const fetchImdb = async movie => {
  try {
    const data = await get(
      `http://www.omdbapi.com/?apikey=${omdbkey}&i=${movie.imdb}`
    )

    const rating = parseFloat(
      data.imdbRating
    )
    const votes = parseInt(
      data.imdbVotes.replace(/,/g, '')
    , 10)

    return {
      poster: data.Poster,
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

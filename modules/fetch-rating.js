const fetchImdb = require('./utils/fetch-imdb')
const fetchTMDB = require('./utils/fetch-tmdb')
const saveData = require('./utils/saveData')
const fs = require('fs')

const fetchMovieData = async movie => {
  const [imdbData, tmdbData] = await Promise.all([
    fetchImdb(movie),
    fetchTMDB(movie)
  ])

  return {
    ...movie,
    poster: imdbData.poster,
    rating: { imdb: imdbData.rating, tmdb: tmdbData.rating },
    votes: { imdb: imdbData.votes, tmdb: tmdbData.votes }
  }
}

module.exports = async () => {
  const data = JSON.parse(fs.readFileSync('./modules/.tmp/data.json'))

  const series = []
  for (const [i, serie] of data.series.entries()) {
    try {
      console.log(
        `fetching data for: ${serie.title} – ${i + 1}/${data.series.length} – ${
          serie.movies.length
        } movies`
      )
      const movies = await Promise.all(serie.movies.map(fetchMovieData))
      series.push({
        ...serie,
        movies
      })
    } catch (e) {
      console.log(e)
    }
  }

  saveData({ series })
}

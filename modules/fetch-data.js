const fetchImdb = require("./utils/fetch-imdb");
const fetchTMDB = require("./utils/fetch-tmdb");
const { getAverage, getDelta } = require("./utils/math");

const fetchMovieData = async imdb => {
  const [imdbData, tmdbData] = await Promise.all([
    fetchImdb({ imdb }),
    fetchTMDB({ imdb }),
  ]);

  return {
    imdb,
    title: imdbData.title,
    year: imdbData.year,
    poster: imdbData.poster,
    rating: { imdb: imdbData.rating, tmdb: tmdbData.rating },
    votes: { imdb: imdbData.votes, tmdb: tmdbData.votes },
  };
};

module.exports = async series => {
  const results = [];
  for (const [i, serie] of series.entries()) {
    try {
      console.log(
        `fetching data for: ${serie.title} – ${i + 1}/${series.length} – ${
          serie.movies.length
        } movies`
      );
      const movies = await Promise.all(serie.movies.map(fetchMovieData));
      results.push({
        ...serie,
        movies,
        average: {
          imdb: getAverage(movies, "imdb").toFixed(1),
          tmdb: getAverage(movies, "tmdb"),
        },
        delta: {
          imdb: getDelta(movies, "imdb").toFixed(1),
          tmdb: getDelta(movies, "tmdb").toFixed(1),
        },
        trilogyAverage: {
          imdb: getAverage(movies.slice(0, 3), "imdb").toFixed(1),
          tmdb: getAverage(movies.slice(0, 3), "tmdb").toFixed(1),
        },
        trilogyDelta: {
          imdb: getDelta(movies.slice(0, 3), "imdb").toFixed(1),
          tmdb: getDelta(movies.slice(0, 3), "tmdb").toFixed(1),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  return results;
};

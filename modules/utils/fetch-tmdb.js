const axios = require("axios");
const { decimalRounding } = require("./math");
const themoviedbKey = process.env.TMDB;

const fetchTMDB = async movie => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/find/${movie.imdb}?api_key=${themoviedbKey}&language=en-US&external_source=imdb_id`
    );

    if (data.status_code === 25) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return fetchTMDB(movie);
    }

    const result = data.movie_results[0] || {};
    const rating = decimalRounding(result.vote_average);
    const votes = result.vote_count;

    return {
      rating: isNaN(rating) ? null : rating,
      votes: isNaN(votes) ? null : votes,
    };
  } catch (e) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    return fetchTMDB(movie);
  }
};

module.exports = fetchTMDB;

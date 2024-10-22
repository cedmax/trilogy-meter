const axios = require("axios");
const { decimalRounding } = require("./math");
const omdbkey = process.env.IMDB;

const fetchImdb = async movie => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${omdbkey}&i=${movie.imdb}`
    );

    const rating = decimalRounding(parseFloat(data.imdbRating));
    const votes = parseInt(data.imdbVotes.replace(/,/g, ""), 10);

    return {
      title: data.Title,
      year: parseInt(data.Year, 10),
      poster: data.Poster.replace(
        "https://m.media-amazon.com/images/",
        "https://ik.imagekit.io/moviesposters/tr:w-300/"
      ),
      votes,
      rating: isNaN(rating) ? null : rating,
    };
  } catch (e) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return fetchImdb(movie);
  }
};

module.exports = fetchImdb;

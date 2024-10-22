const decimalRounding = num => Math.round(num * 10) / 10;

exports.getAverage = (movies, key) =>
  decimalRounding(
    movies.reduce((acc, movie) => {
      return acc + movie.rating[key];
    }, 0) / movies.length
  );

exports.getDelta = (movies, key) =>
  decimalRounding(
    Math.max(...movies.map(m => m.rating[key])) -
      Math.min(...movies.map(m => m.rating[key]))
  );

exports.decimalRounding = decimalRounding;

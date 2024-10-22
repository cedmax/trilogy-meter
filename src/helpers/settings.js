const camelCasify = (prefix, method) =>
  prefix ? prefix + method.charAt(0).toUpperCase() + method.slice(1) : method;

export const filter = (series, search) =>
  series.filter(
    series => series.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  );

export const decade = (series, decade, trilogies) => {
  const decadeNum = parseInt(decade, 10);
  const decadeLimitLow = decadeNum + (decadeNum >= 20 ? 1900 : 2000);
  const decadeLimitHigh = decadeLimitLow + 10;
  return series.filter(
    series =>
      !!(trilogies ? series.movies.slice(0, 3) : series.movies).filter(
        ({ year }) => {
          return year >= decadeLimitLow && year < decadeLimitHigh;
        }
      ).length
  );
};
export const sorting = {
  az: series =>
    [...series].sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }),
  year: series =>
    [...series].sort((a, b) => b.movies[0].year - a.movies[0].year),
  rating: (series, source, trilogies) => {
    const average = camelCasify(trilogies ? "trilogy" : "", "average");
    const delta = camelCasify(trilogies ? "trilogy" : "", "delta");

    return [...series].sort((a, b) =>
      b[average][source] !== a[average][source]
        ? b[average][source] - a[average][source]
        : a[delta][source] - b[delta][source]
    );
  },
  delta: (series, source, trilogies) => {
    const average = camelCasify(trilogies ? "trilogy" : "", "average");
    const delta = camelCasify(trilogies ? "trilogy" : "", "delta");

    return [...series].sort((a, b) =>
      b[delta][source] !== a[delta][source]
        ? a[delta][source] - b[delta][source]
        : b[average][source] - a[average][source]
    );
  },
};

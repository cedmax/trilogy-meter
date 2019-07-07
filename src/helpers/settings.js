import { camelCasify } from "./utils";

export const filter = (series, search) =>
  series.filter(
    series => series.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  );

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
    const range = camelCasify(trilogies ? "trilogy" : "", "range");

    return [...series].sort((a, b) =>
      b[average][source] !== a[average][source]
        ? b[average][source] - a[average][source]
        : a[range][source] - b[range][source]
    );
  },
  range: (series, source, trilogies) => {
    const average = camelCasify(trilogies ? "trilogy" : "", "average");
    const range = camelCasify(trilogies ? "trilogy" : "", "range");

    return [...series].sort((a, b) =>
      b[range][source] !== a[range][source]
        ? a[range][source] - b[range][source]
        : b[average][source] - a[average][source]
    );
  },
};

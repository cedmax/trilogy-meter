import {
  camelCasify
} from './utils'

export const filter = (series, search) => {
  return search ? series.filter((series) => {
    return series.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  }) : series
}

export const sorting = {
  az: (series) => series.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  }),
  year: (series) => series.sort((a, b) => b.movies[0].year - a.movies[0].year),
  rating: (series, trilogies) => {
    const average = camelCasify(trilogies ? 'trilogy' : '', 'average')
    const range = camelCasify(trilogies ? 'trilogy' : '', 'range')

    return series.sort((a, b) => (
      b[average] !== a[average]
        ? b[average] - a[average]
        : a[range] - b[range]
    ))
  },
  range: (series, trilogies) => {
    const average = camelCasify(trilogies ? 'trilogy' : '', 'average')
    const range = camelCasify(trilogies ? 'trilogy' : '', 'range')

    return series.sort((a, b) => (
      b[range] !== a[range]
        ? a[range] - b[range]
        : b[average] - a[average]
    ))
  }
}

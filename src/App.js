import React, { Component } from 'react'
import Card from './Card'
import cssStyles from './App.module.css'
import Header from './Header'
import Footer from './Footer'

function debounce (fn, delay) {
  var timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const camelCasify = (prefix, method) => {
  return prefix
    ? prefix + method.charAt(0).toUpperCase() + method.slice(1)
    : method
}

const sorter = {
  rating: (serie, trilogies) => {
    const average = camelCasify(trilogies ? 'trilogy' : '', 'average')
    const range = camelCasify(trilogies ? 'trilogy' : '', 'range')
    return serie.sort((a, b) => (
      b[average] !== a[average]
        ? b[average] - a[average]
        : a[range] - b[range]
    ))
  },
  year: (serie) => {
    return serie.sort((a, b) => b.movies[0].year - a.movies[0].year)
  },
  range: (serie, trilogies) => {
    const average = camelCasify(trilogies ? 'trilogy' : '', 'average')
    const range = camelCasify(trilogies ? 'trilogy' : '', 'range')
    return serie.sort((a, b) => (
      b[range] !== a[range]
        ? a[range] - b[range]
        : b[average] - a[average]
    ))
  },
  az: (serie) => {
    return serie.sort((a, b) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.actions = {
      sortBy: this.sortBy.bind(this),
      toggleTrilogies: this.toggleTrilogies.bind(this),
      filter: this.filter.bind(this),
      show: this.show.bind(this)
    }

    this.debouncedSetState = debounce(this.setState, 50)

    const {
      series
    } = props

    this.series = series
    this.state = {
      series,
      trilogies: true
    }
  }

  filter (search) {
    this.debouncedSetState({
      series: search ? this.series.filter((serie) => {
        return serie.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      }) : this.series
    })
  }

  sortBy (sorted, showTrilogies) {
    if (typeof showTrilogies === 'undefined') {
      showTrilogies = this.state.trilogies
    }
    const serie = this.series.slice(0)
    const sortedSerie = sorter[sorted] ? sorter[sorted](serie, showTrilogies) : serie

    this.setState({
      series: sortedSerie,
      sorted,
      trilogies: showTrilogies
    })
  }

  show (visible) {
    this.setState({
      visible
    })
  }

  toggleTrilogies () {
    this.sortBy(this.state.sorted, !this.state.trilogies)
  }

  render () {
    const {
      series
    } = this.state

    return (
      <div>
        <Header {...this.state} {...this.actions} />
        <main className={cssStyles.container}>
          {series.map((serie) => <Card trilogy={this.state.trilogies} label={this.state.visible} affiliate={this.props.affiliate} key={serie.title} serie={serie} />)}
        </main>
        <Footer updatedAt={this.props.updatedAt} affiliate={this.props.affiliate} />
      </div>
    )
  }
}

export default App

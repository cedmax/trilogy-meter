import React, { Component } from 'react'
import Card from './Card'
import cssStyles from './App.module.css'
import Header from './Header'
import Footer from './Footer'

const debounce = (func, wait, immediate) => {
  let timeout
  return () => {
    const context = this
    const args = arguments
    var later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const sorter = {
  rating: (serie) => {
    return serie.sort((a, b) => b.trilogyAverage - a.trilogyAverage)
  },
  year: (serie) => {
    return serie.sort((a, b) => a.movies[0].year - b.movies[0].year)
  },
  year_desc: (serie) => {
    return serie.sort((a, b) => b.movies[0].year - a.movies[0].year)
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
        return serie.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      }) : this.series
    })
  }

  sortBy (sorted) {
    const serie = this.series.slice(0)
    const sortedSerie = sorter[sorted] ? sorter[sorted](serie) : serie

    this.setState({
      series: sortedSerie,
      sorted
    })
  }

  show (visible) {
    this.setState({
      visible
    })
  }

  toggleTrilogies () {
    this.setState({
      trilogies: !this.state.trilogies
    })
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
        <Footer affiliate={this.props.affiliate} />
      </div>
    )
  }
}

export default App

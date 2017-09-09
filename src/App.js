import React, { Component } from 'react'
import Card from './Card'
import cssStyles from './App.module.css'
import Header from './Header'
import Footer from './Footer'

const sorter = {
  rating: (serie) => {
    return serie.sort((a, b) => b.average - a.average)
  },
  year: (serie) => {
    return serie.sort((a, b) => a.movies[0].year - b.movies[0].year)
  },
  year_desc: (serie) => {
    return serie.sort((a, b) => b.movies[0].year - a.movies[0].year)
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.sortBy = this.sortBy.bind(this)
    this.show = this.show.bind(this)

    const {
      series
    } = props

    this.state = {
      series
    }
  }

  sortBy (sorted) {
    const serie = this.props.series.slice(0)
    const sortedSerie = sorter[sorted] ? sorter[sorted](serie) : serie

    this.setState({
      series: sortedSerie,
      sorted
    })
  }

  show (show) {
    this.setState({
      show
    })
  }

  render () {
    const {
      series
    } = this.state

    return (
      <div>
        <Header show={this.show} visible={this.state.show} sorted={this.state.sorted} sort={this.sortBy} />
        <main className={cssStyles.container}>
          {series.map((serie) => <Card visible={this.state.show} affiliate={this.props.affiliate} key={serie.title} serie={serie} />)}
        </main>
        <Footer affiliate={this.props.affiliate} />
      </div>
    )
  }
}

export default App

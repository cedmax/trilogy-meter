import React, { Component } from 'react'
import SerieCard from './SerieCard'
import Header from './Header'
import Footer from './Footer'
import cssStyles from './App.module.css'
import {
  debounce
} from './helpers/utils'
import {
  filter as filterHelper,
  sorting as sortingHelper
} from './helpers/settings'

class App extends Component {
  constructor (props) {
    super(props)
    this.actions = {
      setSorting: this.setSorting.bind(this),
      setFilter: this.setFilter.bind(this),
      toggleTrilogies: this.toggleTrilogies.bind(this)
    }

    this.state = {
      filter: '',
      sorting: '',
      trilogies: true
    }

    this.filteredSeries = this.filteredSeries.bind(this)
    this.debouncedSetState = debounce(this.setState, 50)
  }

  filteredSeries () {
    const {
      series
    } = this.props

    const {
      filter,
      sorting,
      trilogies
    } = this.state

    const filteredSerie = filter ? filterHelper(series, filter) : series
    const sorter = sortingHelper[sorting]
    return (sorter)
      ? sorter(filteredSerie, trilogies)
      : filteredSerie
  }

  toggleTrilogies () {
    this.setState({
      trilogies: !this.state.trilogies
    })
  }

  setSorting (sorting) {
    this.setState({
      sorting
    })
  }

  setFilter (filter) {
    this.debouncedSetState({
      filter
    })
  }

  render () {
    const filteredSeries = this.filteredSeries()

    return (
      <div className={cssStyles.page}>
        <Header {...this.state} {...this.actions} />
        <main className={cssStyles.container}>
          {filteredSeries.map((serie) => (
            <SerieCard
              trilogy={this.state.trilogies}
              affiliate={this.props.affiliate}
              key={serie.title}
              serie={serie} />
          ))}
        </main>
        <Footer updatedAt={this.props.updatedAt} affiliate={this.props.affiliate} />
      </div>
    )
  }
}

export default App

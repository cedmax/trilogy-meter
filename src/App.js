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
      toggleTrilogies: this.toggleTrilogies.bind(this),
    }

    this.state = {
      filter: '',
      sorting: '',
      trilogies: true,
    }

    this.applySettings = this.applySettings.bind(this)
    this.debouncedSetState = debounce(this.setState, 50)
  }

  applySettings (series) {
    const {
      filter,
      sorting,
      trilogies
    } = this.state

    series = filter ? filterHelper(series, this.state.filter) : series
    series = sorting && sortingHelper[sorting] ? sortingHelper[sorting](series, trilogies) : series

    return series
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
    const {
      series
    } = this.props

    const filteredSeries = this.applySettings(series)

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

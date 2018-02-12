import React, { Component } from 'react'
import Graph from './Graph'
import blankshield from 'blankshield'
import cssStyles from './SerieCard.module.css'

export default class SerieCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: 3
    }

    this.view = this.view.bind(this)
  }

  view (num) {
    this.setState({
      visible: num || this.props.serie.movies.length
    })
  }

  handleClick (movie) {
    const {
      affiliate
    } = this.props

    const url = `http://${affiliate.domain}/s/ref=nb_ss_d?tag=${affiliate.tag}&url=search-alias%3Ddvd&field-keywords=${movie.name} ${movie.year}`
    blankshield.open(url)
  }

  render () {
    const {
      serie,
      label,
      trilogy,
      source,
      overlay
    } = this.props

    let toggleView
    if (serie.movies.length > 3 && trilogy) {
      if (this.state.visible > 3) {
        toggleView = <a onClick={() => this.view(3)}>show three</a>
      } else {
        toggleView = <a onClick={() => this.view()}>show all</a>
      }
    }

    const visible = trilogy ? this.state.visible : serie.movies.length

    let average = serie.trilogyAverage[source]
    if (visible > 3) {
      average = (
        <span>
          <s>{serie.trilogyAverage[source]}</s> {serie.average[source]}
        </span>
      )
    }

    let range = serie.trilogyRange[source]
    if (visible > 3) {
      range = (
        <span>
          <s>{serie.trilogyRange[source]}</s> {serie.range[source]}
        </span>
      )
    }

    const startYear = serie.movies[0].year
    let endYear = serie.movies[2].year
    if (visible > 3) {
      endYear = (
        <span>
          <s>{endYear}</s> {serie.movies[serie.movies.length - 1].year}
        </span>
      )
    }

    return (
      <div className={cssStyles.card}>
        <header>
          <h1>{serie.title}</h1>
          <small>{startYear} - {endYear}</small>
        </header>
        <Graph overlay={overlay} source={source} label={label} onClick={this.handleClick.bind(this)} movies={serie.movies.slice(0, visible)} />
        <footer>
          <small>
            <abbr title="Averange rating">Avg.</abbr> {average}<br />
            <abbr title="Range, difference between the highest and the lowest rating">Rng.</abbr> {range}
          </small>
          {toggleView}
        </footer>
      </div>
    )
  }
}

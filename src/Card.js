import React, { Component } from 'react'
import cssStyles from './Card.module.css'
import Graph from './Graph'
import blankshield from 'blankshield'

class Card extends Component {
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
      visible
    } = this.props

    return (
      <div className={cssStyles.card}>
        <h1>{serie.title}</h1>
        <Graph visible={visible} onClick={this.handleClick.bind(this)} movies={serie.movies} />
      </div>
    )
  }
}

export default Card

import React, { Component } from 'react'
import cssStyles from './Card.module.css'
import Graph from './Graph'
import blankshield from 'blankshield'

class Card extends Component {
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
      trilogy
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

    return (
      <div className={cssStyles.card}>
        <h1>{serie.title}</h1>
        <Graph label={label} onClick={this.handleClick.bind(this)} movies={serie.movies.slice(0, visible)} />
        {toggleView}
      </div>
    )
  }
}

export default Card

import React, { Component } from 'react'
import cssStyles from './Footer.module.css'

export default class Graph extends Component {
  render () {
    return (
      <footer className={cssStyles.footer}>
        <p>
          Made by <a rel="noopener noreferrer" target="_blank" href="https://cedmax.com">cedmax</a> in order to win an argument. Ratings from IMDB, last fetched
          <time dateTime="2017-10-24T20:35"> Oct 24th, 2017</time>.
        </p>

        <p><small>Marco Cedaro is a participant in the Amazon EU Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to {this.props.affiliate.domain}.</small></p>

      </footer>
    )
  }
}

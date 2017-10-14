import React, { Component } from 'react'
import cssStyles from './Header.module.css'
import Search from './Search'

export default class Graph extends Component {
  render () {
    const {
      sortBy,
      sorted,
      show,
      visible,
      filter,
      trilogies,
      toggleTrilogies
    } = this.props

    return (
      <header className={cssStyles.header}>
        <h1>The Trilogy Meter *</h1>
        <nav className={cssStyles.nav}>
          <small className={cssStyles.line}>
            Sort by:
            {' '}<a className={!sorted ? cssStyles.selected : ''} onClick={() => sortBy()}>default</a>
            {' '}<a className={sorted === 'az' ? cssStyles.selected : ''} onClick={() => sortBy('az')}>a-z</a>            
            {' '}<a className={sorted === 'rating' ? cssStyles.selected : ''} onClick={() => sortBy('rating')}>avg. rating</a>
            {' '}<a className={sorted === 'year' ? cssStyles.selected : ''} onClick={() => sortBy('year')}>least recent</a>
            {' '}<a className={sorted === 'year_desc' ? cssStyles.selected : ''} onClick={() => sortBy('year_desc')}>most recent</a>
          </small>
          <div className={`${cssStyles.line} ${cssStyles.distribute}`}>
            <small>
              Tooltips:
              {' '}<a className={!visible ? cssStyles.selected : ''} onClick={() => show()}>posters</a>
              {' '}<a className={visible === 'title' ? cssStyles.selected : ''} onClick={() => show('title')}>titles</a>
            </small>
            <small>
            View:
              {' '}<a className={trilogies ? cssStyles.selected : ''} onClick={() => toggleTrilogies()}>trilogies</a>
              {' '}<a className={!trilogies ? cssStyles.selected : ''} onClick={() => toggleTrilogies()}>all</a>
            </small>
          </div>
        </nav>
        <small>* some series might not be trilogies, no matter what who grew in the 80s thinks</small>
        <Search filter={filter} />
      </header>
    )
  }
}

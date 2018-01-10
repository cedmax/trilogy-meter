import React, { Component } from 'react'
import cssStyles from './Header.module.css'
import Search from './Search'
import Spacer from './Spacer'

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
            <Spacer/><a className={!sorted ? cssStyles.selected : ''} onClick={() => sortBy()}>default</a>
            <Spacer/><a className={sorted === 'az' ? cssStyles.selected : ''} onClick={() => sortBy('az')}>a-z</a>
            <Spacer/><a className={sorted === 'rating' ? cssStyles.selected : ''} onClick={() => sortBy('rating')}>rating</a>
            <Spacer/><a className={sorted === 'year' ? cssStyles.selected : ''} onClick={() => sortBy('year')}>newest</a>
            <Spacer/><a className={sorted === 'range' ? cssStyles.selected : ''} onClick={() => sortBy('range')}>consistency</a>
          </small>
          <div className={`${cssStyles.line} ${cssStyles.distribute}`}>
            <small>
              Tooltips:
              <Spacer/><a className={!visible ? cssStyles.selected : ''} onClick={() => show()}>posters</a>
              <Spacer/><a className={visible === 'title' ? cssStyles.selected : ''} onClick={() => show('title')}>titles</a>
            </small>
            <small>
            View:
              <Spacer/><a className={trilogies ? cssStyles.selected : ''} onClick={() => toggleTrilogies()}>trilogies</a>
              <Spacer/><a className={!trilogies ? cssStyles.selected : ''} onClick={() => toggleTrilogies()}>all</a>
            </small>
          </div>
        </nav>
        <small>* some series might not be trilogies, despite what who grew in the 80s thinks</small>
        <Search filter={filter} />
      </header>
    )
  }
}

import React, { Component } from 'react'
import cssStyles from './Navigation.module.css'
import Button from './Button'

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
      <section className={cssStyles.nav}>
        <div className={`${cssStyles.distribute}`}>
          <div className={cssStyles.line}>
            <h4>View</h4>
            <Button selected={trilogies} onClick={() => toggleTrilogies()} text="trilogies" />
            <Button selected={!trilogies} onClick={() => toggleTrilogies()} text="all" />
          </div>
          <div className={cssStyles.line}>
            <h4>Sorting</h4>
            <Button selected={!sorted} onClick={() => sortBy()} text="default" />
            <Button selected={sorted === 'az'} onClick={() => sortBy('az')} text="a-z" />
            <Button selected={sorted === 'rating'} onClick={() => sortBy('rating')} text="rating" />
            <Button selected={sorted === 'year'} onClick={() => sortBy('year')} text="newest" />
            <Button selected={sorted === 'range'} onClick={() => sortBy('range')} text="consistency" />
          </div>
          <div className={cssStyles.line}>
            <h4>Tooltips</h4>
            <Button selected={!visible} onClick={() => show()} text="posters" />
            <Button selected={visible === 'title'} onClick={() => show('title')} text="titles" />
          </div>
        </div>
        <label className={cssStyles.search}><h4>Filter</h4><input onChange={(e) => filter(e.target.value)} /></label>
      </section>
    )
  }
}

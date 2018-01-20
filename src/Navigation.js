import React from 'react'
import Button from './Button'
import cssStyles from './Navigation.module.css'

export default ({
  filter,
  setFilter,
  sorting,
  setSorting,
  show,
  setShow
}) => (
  <section className={cssStyles.nav}>
    <div className={cssStyles.distribute}>
      <div className={cssStyles.line}>
        <h4>View</h4>
        <Button selected={!show} onClick={() => setShow()} text="trilogies" />
        <Button selected={show === 'all'} onClick={() => setShow('all')} text="all" />
      </div>
      <div className={cssStyles.line}>
        <h4>Sorting</h4>
        <Button selected={!sorting} onClick={() => setSorting()} text="default" />
        <Button selected={sorting === 'az'} onClick={() => setSorting('az')} text="a-z" />
        <Button selected={sorting === 'rating'} onClick={() => setSorting('rating')} text="rating" />
        <Button selected={sorting === 'year'} onClick={() => setSorting('year')} text="newest" />
        <Button selected={sorting === 'range'} onClick={() => setSorting('range')} text="consistency" />
      </div>
      <div className={cssStyles.line}>
        <label className={cssStyles.search}>
          <h4>Filter</h4>
          <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </label>
      </div>
    </div>
  </section>
)

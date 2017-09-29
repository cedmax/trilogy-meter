import React from 'react'
import cssStyles from './Search.module.css'

export default ({filter}) => <label htmlFor="search-trilogy" className={cssStyles.search}><small>Filter:</small> <input id="search-trilogy" onChange={(e) => filter(e.target.value)} /></label>
import React from 'react'
import cssStyles from './Footer.module.css'

const formatIso = (updatedAt) => updatedAt && (new Date(updatedAt)).toISOString()
const formatReadable = (updatedAt) => updatedAt && (new Date(updatedAt)).toDateString()

export default ({ updatedAt, affiliate }) => (
  <footer className={cssStyles.footer}>
    <p id="note">
        * some series might not be trilogies anymore, despite what who grew in the 80s thinks
    </p>

    <p>
      Made by <a rel="noopener noreferrer" target="_blank" href="https://cedmax.com">cedmax</a> in order to win an argument.<br />
      Ratings from <a rel="noopener noreferrer" href="https://www.imdb.com"><img width="50" src="/imdb.png" alt="IMDb" /></a> and <a rel="noopener noreferrer" href="https://www.themoviedb.org"><img width="75" src="/tmdb.png" alt="The Movie Database" /></a>, last fetched
      <time dateTime={formatIso(updatedAt)}> {formatReadable(updatedAt)}</time>.
    </p>

    <p><small>Marco Cedaro is a participant in the Amazon EU Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to {affiliate.domain}.</small></p>

  </footer>
)

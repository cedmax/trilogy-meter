import React, { Component } from 'react'
import Nav from './Navigation'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import cssStyles from './Header.module.css'

export default class Header extends Component {
  render () {
    return (
      <header className={cssStyles.header}>
        <h1>The Trilogy Meter <AnchorLink href='#note'>*</AnchorLink></h1>
        <Nav {...this.props} />
      </header>
    )
  }
}

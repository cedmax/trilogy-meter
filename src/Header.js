import React, { memo } from "react";
import Nav from "./Navigation";
import Strip from './Strip';
import AnchorLink from "react-anchor-link-smooth-scroll";
import cssStyles from "./Header.module.css";

export default memo(props => (
  <header className={cssStyles.header}>
    <h1>
      The Trilogy Meter <AnchorLink href="#note">*</AnchorLink>
    </h1>
    <Strip />
    <Nav {...props} />
  </header>
));

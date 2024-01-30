import React, { memo } from "react";
import cssStyles from "./Strip.module.css";

export default memo(() => (
  <a target="_blank" href="https://movie-posters.dsgn.it/" className={cssStyles.strip}>
    Have a look at the new <strong>Movie Colour Palette</strong> website
  </a>
));

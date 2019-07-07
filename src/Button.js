import React, { memo } from "react";
import cssStyles from "./Button.module.css";

export default memo(({ onClick, text, selected }) => (
  <button
    onClick={onClick}
    className={`${cssStyles.button} ${selected ? cssStyles.selected : ""}`}
  >
    {text}
  </button>
));

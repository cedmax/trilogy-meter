import React from "react";
import App from "./App";
import { render, hydrate } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const dataNode = document.getElementById("movies");
const { series, updated } = JSON.parse(dataNode.innerHTML);
const rootNode = document.getElementById("root");

if (rootNode.hasChildNodes()) {
  hydrate(<App series={series} updatedAt={updated} />, rootNode);
} else {
  render(<App series={series} updatedAt={updated} />, rootNode);
}

registerServiceWorker();

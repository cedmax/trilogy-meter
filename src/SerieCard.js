import React, { Component, Fragment } from "react";
import Graph from "./Graph";
import cssStyles from "./SerieCard.module.css";
import { getOtherColor, getOtherSource } from "./utils";

export default class SerieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: 3,
    };

    this.view = this.view.bind(this);
  }

  view(num) {
    this.setState({
      visible: num || this.props.serie.movies.length,
    });
  }

  render() {
    const { serie, label, trilogy, source, overlay } = this.props;

    let toggleView;

    if (serie.movies.length > 3 && trilogy) {
      if (this.state.visible > 3) {
        toggleView = (
          <button type="button" onClick={() => this.view(3)}>
            show trilogy
          </button>
        );
      } else {
        toggleView = (
          <button type="button" onClick={() => this.view()}>
            show all
          </button>
        );
      }
    }

    const visible = trilogy ? this.state.visible : serie.movies.length;

    const isAll = visible > 3;
    let average = isAll ? serie.average[source] : serie.trilogyAverage[source];
    let delta = isAll ? serie.delta[source] : serie.trilogyDelta[source];
    if (overlay) {
      const oSrc = getOtherSource(source);
      let oAverage = isAll ? serie.average[oSrc] : serie.trilogyAverage[oSrc];
      let oDelta = isAll ? serie.delta[oSrc] : serie.trilogyDelta[oSrc];
      average = (
        <Fragment>
          {average}{" "}
          <span style={{ color: getOtherColor(source) }}>{oAverage}</span>
        </Fragment>
      );
      delta = (
        <Fragment>
          {delta} <span style={{ color: getOtherColor(source) }}>{oDelta}</span>
        </Fragment>
      );
    }

    const startYear = serie.movies[0].year;
    let endYear = serie.movies[2].year;
    if (visible > 3) {
      endYear = serie.movies[serie.movies.length - 1].year;
    }

    return (
      <div className={cssStyles.card}>
        <header>
          <h1>{serie.title}</h1>
          <small>
            {startYear} - {endYear}
          </small>
        </header>
        <Graph
          overlay={overlay}
          source={source}
          label={label}
          movies={serie.movies.slice(0, visible)}
        />
        <footer>
          <small>
            <abbr title="Average rating">Average</abbr> {average}
            <br />
            <abbr title="Delta between the highest and the lowest rating">
              Delta
            </abbr>{" "}
            {delta}
          </small>
          {toggleView}
        </footer>
      </div>
    );
  }
}

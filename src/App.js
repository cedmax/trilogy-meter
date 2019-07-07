import React, { Component } from "react";
import SerieCard from "./SerieCard";
import Header from "./Header";
import Footer from "./Footer";
import FlipMove from "react-flip-move";
import cssStyles from "./App.module.css";
import queryString from "query-string";
import {
  filter as filterHelper,
  decade as decadeHelper,
  sorting as sortingHelper,
} from "./helpers/settings";

const defaultSource = "imdb";
const defaultState = {
  decade: "",
  filter: "",
  sorting: "",
  show: "",
  source: "",
  overlay: "",
  disableAnim: false,
};

const { location, history } = window;
const readQs = () => queryString.parse(location.search);
const decades = ["60", "70", "80", "90", "00", "10"];
class App extends Component {
  constructor(props) {
    super(props);
    this.actions = {
      setSorting: this.setSorting,
      setDecade: this.setDecade,
      setFilter: this.setFilter,
      setShow: this.setShow,
      setSource: this.setSource,
      setOverlay: this.setOverlay,
    };

    this.state = {
      ...defaultState,
      ...readQs(),
      decades,
    };

    this.filteredSeries = this.filteredSeries;

    if (history.pushState) {
      window.onpopstate = () => {
        this.setState({
          ...defaultState,
          ...readQs(),
        });
      };
    }
  }

  filteredSeries() {
    const { series } = this.props;
    const { filter, sorting, show, source, decade } = this.state;

    const serieByDecade = decade ? decadeHelper(series, decade, !show) : series;
    const filteredSerie = filter
      ? filterHelper(serieByDecade, filter)
      : serieByDecade;

    const sorter = sortingHelper[sorting];
    return sorter
      ? sorter(filteredSerie, source || defaultSource, !show)
      : filteredSerie;
  }

  buildUrl(newState) {
    const qsObj = {
      ...readQs(),
      ...newState,
    };
    delete qsObj.disableAnim;
    const qs = queryString.stringify(qsObj);
    return `${location.origin}/${qs ? `?${qs}` : ""}`;
  }

  updateState = state => {
    const { disableAnim } = state;
    this.setState({
      ...state,
      disableAnim: !!disableAnim,
    });
  };

  setShow = show => {
    const newState = { show };
    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  setSorting = sorting => {
    const newState = { sorting };

    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  setDecade = decade => {
    const newState = { decade, disableAnim: true };

    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  setFilter = filter => {
    filter = filter || undefined;
    const newState = { filter, disableAnim: true };

    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  setSource = source => {
    source = source || undefined;
    const newState = { source, overlay: undefined };

    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  setOverlay = overlay => {
    overlay = overlay || undefined;
    const newState = { overlay };

    if (history.pushState) history.pushState({}, "", this.buildUrl(newState));
    this.updateState(newState);
  };

  render() {
    const filteredSeries = this.filteredSeries();

    return (
      <div className={cssStyles.page}>
        <Header {...this.state} {...this.actions} />
        <main className={cssStyles.container}>
          <FlipMove disableAllAnimations={this.state.disableAnim}>
            {filteredSeries.map(serie => (
              <SerieCard
                overlay={this.state.overlay}
                source={this.state.source || defaultSource}
                trilogy={!this.state.show}
                key={serie.title}
                serie={serie}
              />
            ))}
          </FlipMove>
        </main>
        <Footer updatedAt={this.props.updatedAt} />
      </div>
    );
  }
}

export default App;

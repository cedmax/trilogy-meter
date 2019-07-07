import React, { memo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import TooltipComponent from "./TooltipComponent";
import slugify from "slugify";
import cssStyles from "./Graph.module.css";

const formatImage = string =>
  slugify(string.toLowerCase(), { remove: /[$*_+~.()'"!/\-:@]/g });

const formatTooltip = label => (
  <>
    <img alt={label} src={`/images/${formatImage(label)}.jpg`} width="120" />
    <small className={cssStyles.title}>{label}</small>
    <br />
  </>
);

export default memo(({ movies, onClick, source, overlay }) => {
  let counter = 1;
  const length = movies.length;
  const sources = ["imdb", "tmdb"];
  sources.splice(sources.indexOf(source), 1);
  const otherSource = sources[0];

  movies = movies.map(movie => ({
    ...movie,
    rating: movie.rating[source],
    otherRating: overlay ? movie.rating[otherSource] : 0,
    votes: movie.votes[source],
  }));

  const mainColor =
    source === "imdb" ? "rgb(119, 176, 216)" : "rgb(216,119,176)";
  const otherColor = (alpha = 1) =>
    source === "imdb"
      ? `rgba(216,119,176, ${alpha})`
      : `rgba(119, 176, 216, ${alpha})`;

  return (
    <ResponsiveContainer style={{ maxWidth: 300 }} width="90%" height={300}>
      <BarChart data={movies}>
        <XAxis
          dataKey="name"
          xAxisId={0}
          tickCount={3}
          interval={0}
          tickFormatter={() => counter++ % length || length}
        />
        <XAxis dataKey="name" xAxisId={1} hide />
        <YAxis tickCount={6} domain={[0, 10]} />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip
          content={<TooltipComponent />}
          itemStyle={{ padding: 0, margin: 0 }}
          active={true}
          labelFormatter={formatTooltip}
        />
        <Bar
          unit=" ⭑"
          xAxisId={0}
          name={source}
          dataKey="rating"
          fill={mainColor}
          onClick={onClick}
        />
        <Bar
          unit=" ⭑"
          xAxisId={1}
          name={otherSource}
          dataKey="otherRating"
          fill={otherColor()}
          onClick={onClick}
        >
          {movies.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={otherColor(".5")}
              stroke={otherColor()}
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

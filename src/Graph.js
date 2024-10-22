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
import { getOtherSource, getMainColor, getOtherColor } from "./utils";

export default memo(({ movies, onClick, source, overlay }) => {
  let counter = 1;
  const length = movies.length;
  const otherSource = getOtherSource(source);

  movies = movies.map(movie => ({
    ...movie,
    rating: movie.rating[source],
    otherRating: overlay ? movie.rating[otherSource] : 0,
    votes: movie.votes[source],
  }));

  const mainColor = getMainColor(source);

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
          fill={getOtherColor(source)}
          onClick={onClick}
        >
          {movies.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getOtherColor(source, ".5")}
              stroke={getOtherColor(source)}
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

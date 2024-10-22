import React, { memo } from "react";
import cssStyles from "./Graph.module.css";

const defaultStyle = {
  margin: 0,
  padding: 10,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  whiteSpace: "nowrap",
};

const defaultItemStyle = {
  display: "block",
  fontSize: "90%",
  padding: 0,
  margin: 0,
};

const Content = memo(({ payload, itemStyle, itemSorter }) => {
  const listStyle = { padding: 0, margin: 0, lineHeight: 1.2 };

  const items = payload.sort(itemSorter).map((entry, i) => {
    return entry.value ? (
      <li
        key={`tooltip-item-${i}`}
        style={{
          ...defaultItemStyle,
          ...itemStyle,
          color: entry.color,
        }}
      >
        {entry.name}:<span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
        {entry.value}
        {entry.unit}
      </li>
    ) : null;
  });

  return (
    <ul className="recharts-tooltip-item-list" style={listStyle}>
      {items}
    </ul>
  );
});

const DefaultTooltipContent = memo(
  ({ labelStyle, wrapperStyle, payload, itemStyle, itemSorter }) => {
    const finalStyle = {
      ...defaultStyle,
      ...wrapperStyle,
      lineHeight: 1.4,
    };

    const finalLabelStyle = {
      margin: 0,
      ...labelStyle,
    };

    const { payload: movieData } = payload[0] || {};

    return (
      <div className="recharts-default-tooltip" style={finalStyle}>
        {movieData && (
          <p className="recharts-tooltip-label" style={finalLabelStyle}>
            <img
              alt={`${movieData.title} - ${movieData.year}`}
              src={movieData.poster}
              width="150"
            />
            <small
              className={cssStyles.title}
            >{`${movieData.year} – ${movieData.title}`}</small>
            <br />
          </p>
        )}
        <Content
          payload={payload}
          itemStyle={itemStyle}
          itemSorter={itemSorter}
        />
      </div>
    );
  }
);

export default DefaultTooltipContent;

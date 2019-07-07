import React, { memo } from "react";

const defaultStyle = {
  margin: 0,
  padding: 10,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  whiteSpace: "nowrap",
};

const defaultItemStyle = {
  display: "block",
  paddingTop: 4,
  paddingBottom: 4,
};

const Content = memo(({ payload, itemStyle, itemSorter }) => {
  const listStyle = { padding: 0, margin: 0 };

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
  ({
    labelStyle,
    label,
    labelFormatter,
    wrapperStyle,
    payload,
    itemStyle,
    itemSorter,
  }) => {
    const finalStyle = {
      ...defaultStyle,
      ...wrapperStyle,
    };

    const finalLabelStyle = {
      margin: 0,
      ...labelStyle,
    };

    let finalLabel = label;
    if (!!label && labelFormatter) {
      finalLabel = labelFormatter(label);
    }

    return (
      <div className="recharts-default-tooltip" style={finalStyle}>
        <p className="recharts-tooltip-label" style={finalLabelStyle}>
          {finalLabel}
        </p>
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

import React, { Component } from "react";

class DefaultTooltipContent extends Component {
  renderContent() {
    const { payload, itemStyle, itemSorter } = this.props;

    const listStyle = { padding: 0, margin: 0 };

    const items = payload.sort(itemSorter).map((entry, i) => {
      const finalItemStyle = {
        display: "block",
        paddingTop: 4,
        paddingBottom: 4,
        color: entry.color || "#000",
        ...itemStyle,
      };

      return entry.value ? (
        <li key={`tooltip-item-${i}`} style={finalItemStyle}>
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
  }

  render() {
    const { labelStyle, label, labelFormatter, wrapperStyle } = this.props;
    const finalStyle = {
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap",
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
        {this.renderContent()}
      </div>
    );
  }
}

export default DefaultTooltipContent;

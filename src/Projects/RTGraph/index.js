/* eslint-disable no-unused-vars */
import React from "react";
import {
  LineChart,
  XAxis,
  Line,
  CartesianGrid,
  PieChart,
  BarChart,
  Bar,
  Area,
  Legend,
  Pie,
  Cell,
  Label,
  LabelList,
  ComposedChart,
  YAxis,
} from "recharts"; // https://www.npmjs.com/package/recharts

class RTGTools {
  static getType = (types, i) => {
    if (types.length === 1) return types[0];
    return types[i];
  };

  static getItems = (data, types = ["LINE"], colors, props) => {
    let items = [];
    if (data) {
      items = Object.keys(data).filter((key) => {
        if (key !== "name") return key;
        return null;
      });
    }

    let i = 0;
    const result = items.map((key) => {
      return this.getItem(this.getType(types, i), key, i, {
        ...props,
        stroke: colors[i++],
      });
    });

    return result;
  };

  // Compile items appropriate for the graph type
  static getItem = (type, key, i, props) => {
    switch (type) {
      case "AREA":
        return <Area key={i} dataKey={key} {...props} />;
      case "BAR":
        return <Bar key={i} dataKey={key} {...props} />;
      case "LINE":
        return <Line key={i} dataKey={key} {...props} />;
      case "PIE":
      default:
        return null;
    }
  };
}

export { RTGTools };

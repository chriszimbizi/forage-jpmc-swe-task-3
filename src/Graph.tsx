import React, { Component } from "react";
import { Table, TableData } from "@finos/perspective";
import { ServerRespond } from "./DataStreamer";
import { DataManipulator } from "./DataManipulator";
import "./Graph.css";
import { time } from "console";

interface IProps {
  data: ServerRespond[];
}

interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void;
}
class Graph extends Component<IProps, {}> {
  table: Table | undefined;

  render() {
    return React.createElement("perspective-viewer");
  }

  componentDidMount() {
    // Runs when the component is first added to the DOM
    // Get element from the DOM.
    const elem = (document.getElementsByTagName(
      "perspective-viewer"
    )[0] as unknown) as PerspectiveViewerElement;

    const schema = {
      // Data to be used in the visualization (columns)
      price_abc: "float",
      price_dec: "float",
      ratio: "float",
      timestamp: "date",
      upper_bound: "float",
      lower_bound: "float",
      trigger_alert: "float",
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);
      elem.setAttribute("view", "y_line"); // chart type: line, bar, etc.
      elem.setAttribute("row-pivots", '["timestamp"]'); // x-axis
      elem.setAttribute(
        // y-axis (plotted as lines)
        "columns",
        '["ratio", "lower_bound", "upper_bound", "trigger_alert"]'
      );
      elem.setAttribute(
        "aggregates",
        JSON.stringify({
          price_abc: "avg",
          price_def: "avg",
          timestamp: "distinct count", // We only consider a data point if it has a unique timestamp
          ratio: "avg",
          upper_bound: "avg",
          lower_bound: "avg",
          trigger_alert: "avg",
        })
      );
    }
  }

  componentDidUpdate() {
    // Runs when the component is updated
    if (this.table) {
      this.table.update(([
        DataManipulator.generateRow(this.props.data),
      ] as unknown) as TableData);
    }
  }
}

export default Graph;

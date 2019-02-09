import React from "react";
import Axes from "./Axes";
import Plot from "./Plot";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      td: {}
    };
  }

  setDimens(tableDimens) {
    this.setState({
      dimens: {
        td: tableDimens.td,
        tr: tableDimens.tr
      }
    });
  }
  render() {
    const data = this.props.data;
    const ySteps = 7;
    const setDimens = this.setDimens;
    return (
      <div className="Graph">
        <Axes data={data} ySteps={ySteps} setDimens={setDimens.bind(this)} />
        <Plot data={data} ySteps={ySteps} dimens={this.state.dimens} />
      </div>
    );
  }
}

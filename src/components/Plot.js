import React from "react";
import ReactDOM from "react-dom";

export default class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftOffset: 50
    };
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (!(node instanceof HTMLElement)) return;
    const svg = node.querySelector("svg");
    const svgBoundRect = svg.getBoundingClientRect();
    this.setState({
      svg: {
        width: svgBoundRect.width,
        height: svgBoundRect.height
      },
      graphWidth: svgBoundRect.width - this.state.leftOffset
    });
    // graphHeigth: svgBoundRect.height - this.props.dimens.tr.height
  }

  renderSvg() {
    // let leftOffset = 0;
    //if (this.state) {
    //   leftOffset = this.state.leftOffset;
    //}
    // stroke="blue"
    const svgHeight =
      this.state && this.state.svg ? this.state.svg.height : 100;
    const trHeight =
      this.props && this.props.dimens && this.props.dimens.tr
        ? this.props.dimens.tr.heigth
        : 0;
    const graphHeight = svgHeight - trHeight;
    const points = this.calculatePoints();
    const path = this.renderPath(points, {
      width: this.state.graphWidth,
      height: graphHeight,
      leftOffset: this.state.leftOffset
    });
    return (
      <svg
        width="95%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        version="2.0"
      >
        <title>Plot</title>
        <desc>A of the graph</desc>
        <defs>
          <rect
            id="plot-area"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
          />
          <rect
            id="graph-area"
            x={this.state.leftOffset}
            y="0"
            width={this.state.graphWidth}
            height={graphHeight}
            fill="none"
            stroke="black"
          />
          {path}
        </defs>
        <g>
          <use href="#path" />
          <use href="#plot-path" />
        </g>
      </svg>
    );
  }

  calculatePoints() {
    if (!this.state || !this.state.svg || !this.props.dimens) {
      return;
    }
    const data = this.props.data;
    if (!data) return;
    const maxValue = Math.max(...Object.values(data));
    const xStepWidth = this.props.dimens.td.width + 0.5;
    const yStopHeigth = this.props.dimens.td.height;
    const svgHeigth = this.state.svg.height - 2 * yStopHeigth;
    const points = [];
    Object.entries(data).forEach(([x, y], i) => {
      const cx = (i === 0 ? 0.5 : i * xStepWidth) + this.state.leftOffset;
      const cy = svgHeigth - (svgHeigth * y) / maxValue + yStopHeigth;
      points.push({
        cx: cx,
        cy: cy
      });
    });
    return points;
  }

  renderPath(points, svgDimens, leftOffset) {
    if (!points || !points.length) return;
    let d = "M ";
    points.forEach((point, i) => {
      if (i !== 0) {
        d += "L ";
      }
      d += point.cx + " " + point.cy + "\n";
    });
    console.log(d);
    const plotAreaD =
      d +
      "\n" +
      "L " +
      (svgDimens.width + svgDimens.leftOffset) +
      " " +
      svgDimens.height +
      "\n" +
      "L " +
      (svgDimens.leftOffset + 0.5) +
      " " +
      svgDimens.height +
      " z";
    return [
      <path
        id="path"
        d={d}
        fill="none"
        stroke="rgb(35, 112, 237)"
        stroke-width="1"
      />,
      <path id="plot-path" d={plotAreaD} fill="rgba(28, 232, 255, 0.5)" />
    ];
  }

  render() {
    return <div className="Plot">{this.renderSvg()}</div>;
  }
}

import React from "react";
import ReactDOM from "react-dom";

export default class Axes extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    const yNoStops = this.props.ySteps;
    const xStops = Object.keys(data);
    const maxValue = Math.max(...Object.values(data));
    const yStops = [];
    let lastValue = 0;
    const numRows = yNoStops + 1;
    [...Array(numRows)].forEach((_, i) => {
      const actualI = i - 1;
      yStops.push(
        Math.round(lastValue + actualI * (maxValue / (yNoStops - 1)))
      );
    });
    const yStopsReverse = yStops.slice(0).reverse();
    this.state = {
      yStops: yStops,
      yStopsReverse: yStopsReverse,
      xStops: xStops,
      numRows: numRows
    };
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (!(node instanceof HTMLElement)) return;
    const td2 = node.querySelector("table tr:first-child > td:nth-child(2)");
    const trLast = node.querySelector("table tr:last-child");
    if (!td2 || !trLast) return;
    const tdBoundRect = td2.getBoundingClientRect();
    const trBoundRect = trLast.getBoundingClientRect();
    this.props.setDimens({
      td: {
        width: tdBoundRect.width,
        height: tdBoundRect.height
      },
      tr: {
        width: trBoundRect.width,
        heigth: trBoundRect.height
      }
    });
  }

  renderRows() {
    return this.state.yStopsReverse.map((e, i) => {
      return <tr key={i}>{this.renderCols(e, i)}</tr>;
    });
  }

  renderCols(firstColData, rowNum) {
    return this.state.xStops.map((yData, i) => {
      const key = rowNum + "-" + i;
      if (i === 0 && rowNum !== this.state.numRows - 1) {
        return this.renderTd(key, firstColData);
      }
      if (rowNum === this.state.numRows - 1) {
        return this.renderTd(key, yData);
      }
      return this.renderTd(key, null);
    });
  }

  renderTd(key, data) {
    return <td key={key}>{data ? <span>{data}</span> : null}</td>;
  }

  render() {
    return (
      <div className="Axes">
        <table>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

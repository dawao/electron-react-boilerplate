import React, { Component } from 'react';
import d3                   from 'd3';
import ReStock from "react-stockcharts";

var { ChartCanvas, Chart, DataSeries } = ReStock;
var { CandlestickSeries } = ReStock.series;
var { XAxis, YAxis } = ReStock.axes;
var { ChartWidthMixin } = ReStock.helper;

let FuelSpeedVis = React.createClass({
  mixins: [ChartWidthMixin],
  propTypes: {
    data: React.PropTypes.array.isRequired,
    type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
  },

  render() {
    console.log(this.state);
    if (this.state === null || !this.state.width) return <div />;
    var { data, type } = this.props;
    console.log(data);
    if (!data.length) return <div />;
    return (
      <ChartCanvas width={this.state.width} height={400}
             margin={{left: 35, right: 50, top:10, bottom: 30}}
             data={data} type={type}>
        <Chart id={1} xAccessor={(d) => d.date}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
        <YAxis axisAt="left" orient="left" ticks={5}/>
        <DataSeries id={0} yAccessor={CandlestickSeries.yAccessor}>
          <CandlestickSeries />
        </DataSeries>
        </Chart>
      </ChartCanvas>
    );
  }
});

export default FuelSpeedVis
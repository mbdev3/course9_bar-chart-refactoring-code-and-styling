import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft';
import { Marks } from './Marks';
import {
  csv,
  arc,
  pie,
  scaleBand,
  scaleLinear,
  max,
  format,
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 60,
  right: 30,
  left: 200,
};

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>loading..</pre>;
  }
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);
  const dy = innerHeight / data.length / 2;
  console.log(dy);
  const siFormat = format('.2s')
const xAxisTickFormat = tickValue=>siFormat(tickValue).replace('G','B')
const tooltipFormat = tickValue=>format(",.2r")(tickValue).replace('G','B')
  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={height - margin.bottom / 2}
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={tooltipFormat}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);

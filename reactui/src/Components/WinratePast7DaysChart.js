import React from "react";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryStack,
  VictoryTooltip
} from "victory";

const today = new Date();

let yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

let twoDaysAgo = new Date();
twoDaysAgo.setDate(today.getDate() - 2);

let threeDaysAgo = new Date();
threeDaysAgo.setDate(today.getDate() - 3);

let fourDaysAgo = new Date();
fourDaysAgo.setDate(today.getDate() - 4);

let fiveDaysAgo = new Date();
fiveDaysAgo.setDate(today.getDate() - 5);

let sixDaysAgo = new Date();
sixDaysAgo.setDate(today.getDate() - 6);

Date.prototype.formatMMDDYY = function () {
  return (
    this.getDate() +
    "-" +
    (this.getMonth() + 1) +
    "-" +
    parseInt(this.getFullYear().toString().substring(2))
  );
};

const dataset = [
  [
    { x: today.formatMMDDYY(), y: 1, label: " 3 wins 5 losses = 30% " },
    { x: yesterday.formatMMDDYY(), y: 2, label: " 3 wins 5 losses = 30% " },
    { x: twoDaysAgo.formatMMDDYY(), y: 3, label: " 3 wins 5 losses = 30% " },
    { x: threeDaysAgo.formatMMDDYY(), y: 4, label: " 3 wins 5 losses = 30% " },
    { x: fourDaysAgo.formatMMDDYY(), y: 5, label: " 3 wins 5 losses = 30% " },
    { x: fiveDaysAgo.formatMMDDYY(), y: 6, label: " 3 wins 5 losses = 30% " },
    { x: sixDaysAgo.formatMMDDYY(), y: 100, label: " 3 wins 5 losses = 30% " },
  ],
];

export default function WinratePast7DaysChart() {
  return (
    <VictoryChart height={300} width={800} domainPadding={{ x: 30, y: 20 }}>
      <VictoryStack colorScale={["green"]} labelComponent={<VictoryTooltip/>}>        
        {dataset.map((data, i) => {
          return <VictoryBar data={data} key={i} />;
        })}
      </VictoryStack>
      <VictoryAxis
        style={{
          tickLabels: { fill: "white" },
        }}
        dependentAxis
        tickFormat={(tick) => `${tick}%`}
        domain={{ y: [0, 100] }}
      />
      <VictoryAxis
        style={{
          tickLabels: { fill: "white" },
        }}
        tickFormat={[
          today.formatMMDDYY(),
          yesterday.formatMMDDYY(),
          twoDaysAgo.formatMMDDYY(),
          threeDaysAgo.formatMMDDYY(),
          fourDaysAgo.formatMMDDYY(),
          fiveDaysAgo.formatMMDDYY(),
          sixDaysAgo.formatMMDDYY(),
        ]}
      />
    </VictoryChart>
  );
}

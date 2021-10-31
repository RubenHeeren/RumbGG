import React, { useContext } from "react";
import RumbGGContext from "../../Context/RumbGGContext";
import Spinner from "react-bootstrap/Spinner";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
  VictoryTheme,
} from "victory";

export default function WinratePast7DaysChart() {
  const context = useContext(RumbGGContext);

  return (
    <div>
      <h1>Past 7 days ranked winrate</h1>
          <p>
            Striked through date means no games played on that day. Hover bars
            to see total games played. Includes flex and solo/duo.
          </p>
      {context.winRateDTOsPast7DaysState.winRateDTOsPast7Days.length > 0 ? (
        <VictoryChart
          theme={VictoryTheme.material}
          style={{
            parent: {
              backgroundColor: "#282c34",
            },
          }}
          height={300}
          width={800}
          domainPadding={{ x: 30, y: 20 }}
        >          
          <VictoryStack labelComponent={<VictoryTooltip />}>
            <VictoryBar
              style={{
                data: {
                  fill: ({ datum }) => GetBarColorBasedOnWinrate0To100(datum.y),
                },
              }}
              data={getDataSet(
                context.winRateDTOsPast7DaysState.winRateDTOsPast7Days
              )}
              animate={{
                duration: 100,
                onLoad: { duration: 300 },
              }}
              barRatio={0.5}
            />
          </VictoryStack>
          <VictoryAxis
            style={{
              tickLabels: { fill: "white", fontFamily: "Roboto" },
              axis: {
                fill: "transparent",
                stroke: "#fff",
                opacity: 0.3,
                strokeWidth: 1,
              },
              grid: {
                fill: "transparent",
                opacity: 0.1,
                stroke: "#fff",
                pointerEvents: "painted",
              },
            }}
            dependentAxis
            tickFormat={(tick) => `${tick}%`}
            domain={{ y: [0, 100] }}
          />
          {/* textDecoration is line-through if no games are played. */}
          <VictoryAxis
            style={{
              tickLabels: {
                fill: "white",
                fontFamily: "Roboto",
                textDecoration: ({ tick }) =>
                  context.winRateDTOsPast7DaysState.winRateDTOsPast7Days[
                    7 - tick
                  ].gamesWon === 0 &&
                  context.winRateDTOsPast7DaysState.winRateDTOsPast7Days[
                    7 - tick
                  ].gamesLost === 0
                    ? "line-through"
                    : "none",
              },
              axis: {
                fill: "transparent",
                stroke: "#fff",
                opacity: 0.3,
                strokeWidth: 1,
              },
              grid: {
                fill: "transparent",
                opacity: 0,
              },
            }}
            tickFormat={[
              sixDaysAgo.formatMMDDYY(),
              fiveDaysAgo.formatMMDDYY(),
              fourDaysAgo.formatMMDDYY(),
              threeDaysAgo.formatMMDDYY(),
              twoDaysAgo.formatMMDDYY(),
              yesterday.formatMMDDYY(),
              today.formatMMDDYY(),
            ]}
          />
        </VictoryChart>
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

function GetBarColorBasedOnWinrate0To100(winRate) {
  if (winRate < 33) {
    // Red
    return "#ff0000";
  } else if (winRate < 50) {
    // Orange
    return "#E06A22";
  } else if (winRate < 65) {
    // Light Green
    return "#5BC750";
  } else {
    // Green
    return "#00ff00";
  }
}

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
  let shortenedDateString =
    this.getDate() +
    "/" +
    (this.getMonth() + 1) +
    "/" +
    parseInt(this.getFullYear().toString().substring(2));
  let dayName = this.toLocaleDateString("en-US", { weekday: "short" });

  return dayName + " " + shortenedDateString;
};

// 0 = today
function getFormattedDDYYByDayIndex(index) {
  switch (index) {
    case 0:
      return today.formatMMDDYY();
    case 1:
      return yesterday.formatMMDDYY();
    case 2:
      return twoDaysAgo.formatMMDDYY();
    case 3:
      return threeDaysAgo.formatMMDDYY();
    case 4:
      return fourDaysAgo.formatMMDDYY();
    case 5:
      return fiveDaysAgo.formatMMDDYY();
    case 6:
      return sixDaysAgo.formatMMDDYY();
    default:
      return today.formatMMDDYY();
  }
}

function getDataSet(winRateDTOsPast7Days) {
  let arrayToReturn = [];

  for (let i = 6; i >= 0; i--) {
    arrayToReturn.push({
      x: getFormattedDDYYByDayIndex(i),
      y: GetWinRatePercentageAs0To100(
        winRateDTOsPast7Days[i].gamesWon,
        winRateDTOsPast7Days[i].gamesLost
      ),
      label: ` ${winRateDTOsPast7Days[i].gamesWon} wins ${
        winRateDTOsPast7Days[i].gamesLost
      } losses = ${GetWinRatePercentageAs0To100(
        winRateDTOsPast7Days[i].gamesWon,
        winRateDTOsPast7Days[i].gamesLost
      )}% `,
    });
  }

  return arrayToReturn;
}

function GetWinRatePercentageAs0To100(gamesWon, gamesLost) {
  const totalGames = gamesWon + gamesLost;

  if (gamesWon === 0 || totalGames === 0) {
    return 0;
  } else {
    return Math.round((gamesWon / totalGames) * 100);
  }
}

import React, { useContext } from "react";
import RumbGGContext from "../../Context/RumbGGContext";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
} from "victory";

export default function WinratePast7DaysChart() {
  const context = useContext(RumbGGContext);

  return (
    <div>
      {context.winRateDTOsPast7DaysState.winRateDTOsPast7Days.length > 0 ? (
        <VictoryChart height={300} width={800} domainPadding={{ x: 30, y: 20 }}>
          <VictoryStack            
            labelComponent={<VictoryTooltip />}
          >
            <VictoryBar
              style={{
                data: {
                  fill: ({ datum }) => GetBarColorBasedOnWinrate0To100(datum.y),
                }
              }}
              data={getDataSet(
                context.winRateDTOsPast7DaysState.winRateDTOsPast7Days
              )}
              animate={{
                duration: 100,
                onLoad: { duration: 300 }
              }}
              barRatio={0.6}
            />
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
              sixDaysAgo.formatMMDDYY(),
              fiveDaysAgo.formatMMDDYY(),
              fourDaysAgo.formatMMDDYY(),
              threeDaysAgo.formatMMDDYY(),
              twoDaysAgo.formatMMDDYY(),
              yesterday.formatMMDDYY(),
              today.formatMMDDYY()
            ]}
          />
        </VictoryChart>
      ) : (
        <p>Loading winrate of the past 7 days...</p>
      )}
    </div>
  );
}

function GetBarColorBasedOnWinrate0To100(winRate) {
  if (winRate < 35) {
    // Red
    return '#ff0000';
  } else if (winRate < 50) {
    // Orange
    return '#ffa500';
  } else if (winRate < 65) {
    // Light Green
    return '#90ee90';    
  } else {
    // Green
    return '#00ff00';
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
  let shortenedDateString = this.getDate() + "/" + (this.getMonth() + 1) + "/" + parseInt(this.getFullYear().toString().substring(2));
  let dayName = this.toLocaleDateString("en-US", { weekday: 'short' });

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

  for (let i = 6; i > 0; i--) {
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

  console.log(arrayToReturn);

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

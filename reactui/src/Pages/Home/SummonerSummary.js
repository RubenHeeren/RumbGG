import React, { useContext } from "react";
import WinratePast7DaysChart from "./WinratePast7DaysChart";
import MainChampionCard from "./MainChampionCard";
import RumbGGContext from "../../Context/RumbGGContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion'
import GameAccordion from "./GameAccordion";

export default function SummonerSummary() {
  const context = useContext(RumbGGContext);

  function isObjectNotEmpty(obj) {
    let objectIsEmpty =
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype;
    return !objectIsEmpty;
  }

  return (
    <Col
      xs={12}
      className="px-md-25 align-items-center justify-content-start mb-auto"
    >
      {(isObjectNotEmpty(context.summonerState.summoner) && 
        isObjectNotEmpty(context.summonerRankedSolo5x5LeagueEntryState.summonerRankedSolo5x5LeagueEntry) &&
        context.threeMainChampionsState.threeMainChampions.length > 0
        ) && (
          <div className="bg-dark p-4">
            <Row>
              <Col md={2} xs={4}>
                <img
                  className="mw-100"
                  src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${context.summonerState.summoner.profileIconId}.jpg?image=q_auto:best&v=1518361200`}
                />
              </Col>

              <Col md={8} xs={8}>
                <h1>{context.summonerState.summoner.name}</h1>
                <p>Level {context.summonerState.summoner.level}</p>
                <p>
                  {
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.tier
                  }
                  &nbsp;
                  {convertRankToNumber(
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.rank
                  )}
                  &nbsp;
                  {
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.leaguePoints
                  }{" "}
                  LP |{" "}
                  {
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.wins
                  }{" "}
                  wins |{" "}
                  {
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.losses
                  }{" "}
                  losses |{" "}
                  {GetWinRatePercentageAs0To100(
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.wins,
                    context.summonerRankedSolo5x5LeagueEntryState
                      .summonerRankedSolo5x5LeagueEntry.losses
                  )}
                  % winrate
                </p>
              </Col>

              <Col md={2} xs={12}>
                <Button className="w-100 h-md-50">>> Full profile</Button>
              </Col>


              <Col xs={12} className="mt-4">
                <h1 className="text-center">Past 7 days winrate</h1>
              </Col>

              <Col xs={12} className="mt-2">
                <WinratePast7DaysChart />
              </Col>              

              <Row className="mt-5 mb-3 text-center pe-0">
                <h1 className="mb-3">Main champions</h1>
                <Col md={4} className="mb-3 pe-0">
                  <MainChampionCard top3PlayedChampionsCardDTO={context.threeMainChampionsState.threeMainChampions[0]} />
                </Col>
                <Col md={4} className="mb-3 pe-0">
                  <MainChampionCard top3PlayedChampionsCardDTO={context.threeMainChampionsState.threeMainChampions[1]} />
                </Col>
                <Col md={4} className="mb-3 pe-0">
                  <MainChampionCard top3PlayedChampionsCardDTO={context.threeMainChampionsState.threeMainChampions[2]} />
                </Col>
              </Row>                                  

              <Col className="mt-5" xs={12}>
                <Accordion>
                  <GameAccordion eventKey={0} />
                  <GameAccordion eventKey={1} />
                  <GameAccordion eventKey={2} />
                </Accordion>
              </Col>
            </Row>
          </div>
        )}
    </Col>
  );
}

function convertRankToNumber(rank) {
  switch (rank) {
    case "I":
      return "1";
    case "II":
      return "2";
    case "III":
      return "3";
    case "IV":
      return "4";
    default:
      return "?";
  }
}

function GetWinRatePercentageAs0To100(gamesWon, gamesLost) {
  const totalGames = gamesWon + gamesLost;

  if (gamesWon === 0 || totalGames === 0) {
    return 0;
  } else {
    return Math.round((gamesWon / totalGames) * 100);
  }
}

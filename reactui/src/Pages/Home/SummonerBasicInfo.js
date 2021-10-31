import React, { useContext } from 'react'
import RumbGGContext from "../../Context/RumbGGContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { isObjectNotEmpty, getWinRatePercentageAs0To100 } from "../../Utilities/UtilityFunctions";
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function SummonerBasicInfo() {
  const context = useContext(RumbGGContext);

  return (
    <div className="w-100">
      {isObjectNotEmpty(context.summonerState.summoner) ? (
        <Container fluid>
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
                {getWinRatePercentageAs0To100(
                  context.summonerRankedSolo5x5LeagueEntryState
                    .summonerRankedSolo5x5LeagueEntry.wins,
                  context.summonerRankedSolo5x5LeagueEntryState
                    .summonerRankedSolo5x5LeagueEntry.losses
                )}
                % season winrate
              </p>
            </Col>

            <Col md={2} xs={12}>
              <OverlayTrigger
                key="bottom"
                overlay={
                  <Tooltip id="bottom">
                    <strong>Coming soon!</strong>
                  </Tooltip>
                }
              >
                <Button className="w-100 h-md-50">{">> Full profile"}</Button>
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  )
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

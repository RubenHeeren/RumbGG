import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Constants } from "../../Utilities/Constants";
import { numberWithCommas } from "../../Utilities/UtilityFunctions";

export default function GameAccordion(props) {
  const game = props.game;

  return (
    <Accordion className="mt-3" defaultActiveKey={props.key + 1}>
      {/* Set className of the header to "win" or "lose to toggle color changes" */}
      <Accordion.Item className={`bg-body ${game.won ? "win" : "lose"}`} eventKey={props.key}>
        <Accordion.Header>
          <Container fluid>
            <Row className="w-100 pb-2 border-bottom border-secondary">
              <Col xs={6}>
                <strong>{game.matchType} - </strong>Started {game.matchStartingDate}
              </Col>
              <Col xs={6} className="text-end">
              {game.durationInMinutes} minutes <strong>{game.won ? "VICTORY" : "LOSE"}</strong>
              </Col>
            </Row>
            <Row className="w-100 mt-3">
              <Col xs={3}>
                <Row>
                  <Col xs={6} className="g-0 pe-2">
                    <img
                      src={`${Constants.STATIC_FILE_URL_CHAMPION_TILES}/${game.championName}_0.jpg`}
                      className="w-100 rounded-circle border border-secondary shadow"
                      alt="champion image"
                    />
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src={`${Constants.STATIC_FILE_URL_SUMMONER_SPELLS}/${game.summoner1Id}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="summoner spell 1"
                        />
                      </Col>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src={`${Constants.STATIC_FILE_URL_STYLES}/${game.style1Id}.png`}
                          className="w-100"
                          alt="rune primary"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src={`${Constants.STATIC_FILE_URL_SUMMONER_SPELLS}/${game.summoner2Id}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="summoner spell 2"
                        />
                      </Col>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src={`${Constants.STATIC_FILE_URL_STYLES}/${game.style2Id}.png`}
                          className="ms-1 w-75"
                          alt="rune secondary"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={2} className="text-start ps-3">
                <h5>{game.kills} / {game.deaths} / {game.assists}</h5>
                <h5>{((game.kills + game.assists) / game.deaths).toFixed(1)} KDA</h5>
                <h5>70% KP</h5>
              </Col>
              <Col xs={4} className="text-start ps-4">
                <h5>Level {game.level}</h5>
                <h5>{game.creepScore} CS ({(game.creepScore / game.durationInMinutes).toFixed(1)}/min)</h5>
                <h5>{numberWithCommas(game.gold)} gold ({(game.gold / game.durationInMinutes).toFixed(1)}/min)</h5>
              </Col>
              <Col xs={3}>
                <Row>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item0Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 1"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                      <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item3Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 4"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                      <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item1Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 2"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                      <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item4Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 5"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                      <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item2Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 3"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                      <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.item5Id)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Item 6"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={3}
                    className="g-0 p-1 d-flex justify-content-center align-items-center"
                  >
                    <div className="w-100 pe-2">
                    <img
                          src={`${Constants.STATIC_FILE_URL_ITEMS}/${getWinOrLoseItemStringFromItemId(game.win, game.trinketId)}.png`}
                          className="w-100 border border-secondary shadow-sm"
                          alt="Trinket"
                        />
                    </div>                    
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Accordion.Header>
        <Accordion.Body className="text-center py-5">
          Match details coming soon!
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function getWinOrLoseItemStringFromItemId(win, itemId) {
  if (itemId !== 0) {
    return itemId.toString();
  }
  
  if (win === true) {
    return "0win";
  } else {
    return "0lose";
  }
}

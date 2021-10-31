import React, { useContext } from "react";
import WinratePast7DaysChart from "./WinratePast7DaysChart";
import SummonerBasicInfo from "./SummonerBasicInfo";
import MainChampions from "./MainChampions";
import RumbGGContext from "../../Context/RumbGGContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GameAccordion from "./GameAccordion";
import Spinner from "react-bootstrap/Spinner";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function SummonerSummary(props) {
  const context = useContext(RumbGGContext);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <SummonerBasicInfo />
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} className="mt-4">
              <WinratePast7DaysChart />
            </Col>

            <Col xs={12} className="mt-5">
              <MainChampions />
            </Col>

            <Col className="mt-4 mb-4" xs={12}>
              <h1>Last 3 ranked games</h1>
              {context.matchHistoryCardDTOsLast3RankedGamesState.matchHistoryCardDTOsLast3RankedGames.length === 3 ? (
                <div>
                  <GameAccordion key={1} game={context.matchHistoryCardDTOsLast3RankedGamesState.matchHistoryCardDTOsLast3RankedGames[0]} />
                  <GameAccordion key={2} game={context.matchHistoryCardDTOsLast3RankedGamesState.matchHistoryCardDTOsLast3RankedGames[1]} />
                  <GameAccordion key={3} game={context.matchHistoryCardDTOsLast3RankedGamesState.matchHistoryCardDTOsLast3RankedGames[2]} />
                </div>
              ) : (
                <div className="mt-2 w-100 d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>)}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
      <Button onClick={props.onHide}>Close</Button>        
      </Modal.Footer>
    </Modal>
  );
}

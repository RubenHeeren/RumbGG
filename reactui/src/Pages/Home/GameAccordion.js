import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function GameAccordion(props) {
  return (
    <Accordion className="mb-2" defaultActiveKey={props.key + 1}>
      {/* Set className of the header to "win" or "lose to toggle color changes" */}
      <Accordion.Item className="bg-body win" eventKey={props.key}>
        <Accordion.Header>
          <Container fluid>
            <Row className="w-100 pb-2 border-bottom border-secondary">
              <Col xs={6}>
                <strong>Ranked solo - </strong>an hour ago
              </Col>
              <Col xs={6} className="text-end">
                23 minutes <strong>VICTORY</strong>
              </Col>
            </Row>
            <Row className="w-100 mt-3">
              <Col xs={3}>
                <Row>
                  <Col xs={6} className="g-0 pe-2">
                    <img
                      src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                      className="w-100 rounded-circle"
                    />
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                      <Col xs={6} className="g-0 p-2">
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={2} className="text-start ps-3">
                <h4>7 / 1 / 11</h4>
                <h4>18.5 KDA</h4>
                <h5>70% KP</h5>
              </Col>
              <Col xs={4} className="text-start ps-4">
                <h4>Level 14</h4>
                <h4>300 CS (10/min)</h4>
                <h5>10.312 gold (300/min)</h5>
              </Col>
              <Col xs={3}>
                <Row>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                      <Col className="g-0 p-1" xs={12}>
                        <img
                          src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                          className="w-100"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={3}
                    className="g-0 p-1 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src="https://localhost:7124/assets/img/champion-tiles/Aatrox_0.jpg"
                      className="w-100"
                    />
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

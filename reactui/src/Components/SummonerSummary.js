import React, { useContext } from "react";
import WinratePast7DaysChart from "./WinratePast7DaysChart";
import RumbGGContext from "../Context/RumbGGContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      {isObjectNotEmpty(context.summoner) && (
        <div>
          <Row className="mb-4">
            <Col xs={3}>
              <img
                className="mw-100"
                src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${context.summoner.profileIconId}.jpg?image=q_auto:best&v=1518361200`}
              />
            </Col>

            <Col xs={9}>
              <h1>{context.summoner.name}</h1>
              <p>Level {context.summoner.level}</p>
            </Col>

            <Col className="mt-4" xs={12}>
              <h3 className="text-center">Winrate of the past 7 days</h3>
            </Col>

            <Col xs={12}>
              <WinratePast7DaysChart />
            </Col>

            <Col className="text-center mt-4" xs={12}>
              <h1>{"<Past 3 games cards>"}</h1>
              <h1>{"<Past 3 games cards>"}</h1>
              <h1>{"<Past 3 games cards>"}</h1>
            </Col>
          </Row>
        </div>
      )}
    </Col>
  );
}

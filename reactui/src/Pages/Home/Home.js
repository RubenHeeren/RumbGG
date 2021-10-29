import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SummonerSearchForm from "./SummonerSearchForm";
import SummonerSummary from "./SummonerSummary";

const Home = () => {
  return (
    <div>
      <Container fluid className="align-items-center justify-content-center min-vh-100">
        <Row className="min-vh-100 align-items-center">
          <SummonerSearchForm />

          {/* Needs summoner from SummonerSearchForm. */}
          <SummonerSummary />
        </Row>
      </Container>
    </div>
  );
};

export default Home;

// REGIONS
// Brasil | Br = 0,
// North-eastern europe | Eune = 1
// Western europe | Euw = 2
// North america | Na = 3
// South korea | Kr = 4
// Latin America North | Lan = 5
// Latin America South | Las = 6
// Oceania | Oce = 7
// Russia | Ru = 8
// Turkey | Tr = 9
// Japan | Jp = 10
// Global | Global = 11

// Regional proxy for services only deployed in North America. For example the tournament and tournament stub services.
// Americas = 12
// Europe = 13
// Asia = 14
// NoRegion = 15

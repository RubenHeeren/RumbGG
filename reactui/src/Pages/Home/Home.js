import React, { useContext, useState, useEffect, useRef } from "react";
import RumbGGContext from "../../Context/RumbGGContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SummonerSearchForm from "./SummonerSearchForm";
import SummonerSummary from "./SummonerSummary";
import { isObjectNotEmpty } from "../../Utilities/UtilityFunctions";

export default function Home() {
  const context = useContext(RumbGGContext);
  const [modalShow, setModalShow] = useState(false);

  const isFirstRun = useRef(true);
  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (modalShow === false && context.fetchingSummonerDataState.fetchingSummonerData === false) {
      setModalShow(true);
    }
  }, [ context.fetchingSummonerDataState.fetchingSummonerData ]);

  return (
    <div>
      <Container fluid className="align-items-center justify-content-center min-vh-100">
        <Row className="min-vh-85 align-items-center">
          <SummonerSearchForm />

          <SummonerSummary show={modalShow} onHide={() => setModalShow(false)} /> 
        </Row>
      </Container>
    </div>
  );
}

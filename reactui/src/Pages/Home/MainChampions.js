import React, { useContext } from "react";
import RumbGGContext from "../../Context/RumbGGContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import MainChampionCard from "./MainChampionCard";

export default function MainChampions() {
    const context = useContext(RumbGGContext);

    return (
        <div>
            {context.threeMainChampionsState.threeMainChampions.length > 0 ? (
                <Row className="mb-3 pe-0">
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

import React from "react";
import Card from "react-bootstrap/Card";
import { numberWithCommas } from "../../Utilities/UtilityFunctions";

export default function MainChampionCard(props) {
  return (
    <Card className="bg-extradark p-3">
      <Card.Img variant="top" src={`https://localhost:7124/${props.top3PlayedChampionsCardDTO.relativeImagePath}`} />
      <Card.Body className="pb-0">
        <Card.Title>{props.top3PlayedChampionsCardDTO.name}</Card.Title>
        <Card.Text>
            {numberWithCommas(props.top3PlayedChampionsCardDTO.masteryPoints)} Mastery Points
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

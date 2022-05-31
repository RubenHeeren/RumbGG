import React from "react";
import Card from "react-bootstrap/Card";
import { numberWithCommas } from "../../Utilities/UtilityFunctions";
import { Constants } from "../../Utilities/Constants";

export default function MainChampionCard(props) {
  return (
    <Card className="bg-extradark p-3">
      <Card.Img variant="top" src={`${Constants.STATIC_FILE_URL_CHAMPION_TILES}/${props.top3PlayedChampionsCardDTO.name.replace(/[^a-zA-Z0-9]/g, '')}_0.jpg`} />
      <Card.Body className="pb-0">
        <Card.Title>{props.top3PlayedChampionsCardDTO.name}</Card.Title>
        <Card.Text>
            {numberWithCommas(props.top3PlayedChampionsCardDTO.masteryPoints)} Mastery Points
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

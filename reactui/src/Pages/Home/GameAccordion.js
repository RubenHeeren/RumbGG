import React from "react";
import Accordion from 'react-bootstrap/Accordion'

export default function GameAccordion(props) {
  return (
    <Accordion.Item eventKey={props.eventKey} className="bg-body mb-3">
      <Accordion.Header>Game played card. Click me to expand.</Accordion.Header>
      <Accordion.Body>
        Some stats about the game. Show who won etc.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Accordion.Body>
    </Accordion.Item>
  );
}

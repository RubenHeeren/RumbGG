import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RumbGGContext from "../../Context/RumbGGContext";

export default function SummonerSearchForm() {
  const context = useContext(RumbGGContext);
  const { summoner, setSummoner } = context.summonerState;
  const { winRateDTOsPast7Days, setWinRateDTOsPast7Days } = context.winRateDTOsPast7DaysState;

  const [summonerName, setSummonerName] = useState("Bold Critter");
  const [region, setRegion] = useState(2);
  const [fetchingSummoner, setFetchingSummoner] = useState(false);  

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSummoner();
  };

  function fetchSummoner() {
    setFetchingSummoner(true);

    const url = `https://localhost:7124/riotapi/summoner?name=${encodeURIComponent(
      summonerName
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((summoner) => {
          console.log(summoner);
          setSummoner(summoner);
          getWinrateDTOsPast7Days(summoner.puuid, summoner.region);
        });
      } else {
        response
          .text()
          .then(function (text) {
            throw new Error(
              `Fetching summoner. Server error message: ${text}.`
            );
          })
          .catch((error) => {
            alert(error);
          });
      }
    });

    setFetchingSummoner(false);
  }

  function getWinrateDTOsPast7Days(puuid, region) {
    const url = `https://localhost:7124/riotapi/winrate-dtos-past-7-days/?puuid=${encodeURIComponent(puuid)}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((winrateDTOsPast7Days) => {
          console.log(winrateDTOsPast7Days);
          setWinRateDTOsPast7Days(winrateDTOsPast7Days);
        });
      } else {
        response
          .text()
          .then(function (text) {
            throw new Error(
              `Fetching WinrateDTOsPast7Days. Server error message: ${text}.`
            );
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit} className="px-md-25 mt-auto mb-4">
        <Row>
          <Col xs={9}>
            <Form.Control
              value={summonerName}
              onChange={(event) => setSummonerName(event.target.value)}
              size="lg"
              type="text"
              placeholder="Summoner name"
              className="h-100"
            />
          </Col>

          <Col xs={2}>
            <Form.Select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              aria-label="Floating label select example"
              className="h-100"
            >
              <option value="2">EUW</option>
              <option value="2">NA</option>
              <option value="3">OCE</option>
            </Form.Select>
          </Col>

          <Col xs={1}>

            <Button type="submit" className="h-100" disabled={fetchingSummoner}>
              {fetchingSummoner ? "Loading..." : "Search"}
            </Button>
          </Col>
        </Row>
      </Form>
  );
}
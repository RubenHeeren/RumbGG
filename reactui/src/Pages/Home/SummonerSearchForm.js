import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RumbGGContext from "../../Context/RumbGGContext";
import Spinner from "react-bootstrap/Spinner";

export default function SummonerSearchForm() {
  const context = useContext(RumbGGContext);
  const { summoner, setSummoner } = context.summonerState;
  const { summonerRankedSolo5x5LeagueEntry, setSummonerRankedSolo5x5LeagueEntry, } = context.summonerRankedSolo5x5LeagueEntryState;
  const { winRateDTOsPast7Days, setWinRateDTOsPast7Days } = context.winRateDTOsPast7DaysState;
  const { threeMainChampions, setThreeMainChampions } = context.threeMainChampionsState;

  const [summonerName, setSummonerName] = useState("Bold Critter");
  const [region, setRegion] = useState(2);
  const [fetchingSummonerData, setFetchingSummonerData] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFetchingSummonerData(true);
    getSummoner();
  };

  function getSummoner() {    
    const url = `https://localhost:7124/riotapi/summoner?name=${encodeURIComponent(
      summonerName
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((summonerFromServer) => {
          setSummoner(summonerFromServer);
          getWinrateDTOsPast7Days(summonerFromServer.puuid, summonerFromServer.region);
          getRankedSolo5x5leagueEntry(summonerFromServer.id, summonerFromServer.region);
          getThreeMainChampions(summonerFromServer.id, summonerFromServer.region);
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
  }

  function getRankedSolo5x5leagueEntry(encryptedSummonerId, region) {
    const url = `https://localhost:7124/riotapi/ranked-solo-5x5-league-entry/?encryptedSummonerId=${encodeURIComponent(
      encryptedSummonerId
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((rankedSolo5x5leagueEntry) => {          
          setSummonerRankedSolo5x5LeagueEntry(rankedSolo5x5leagueEntry);
        });
      } else {
        response
          .text()
          .then(function (text) {
            throw new Error(
              `Fetching getRankedSolo5x5leagueEntry. Server error message: ${text}.`
            );
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  }

  function getWinrateDTOsPast7Days(puuid, region) {
    const url = `https://localhost:7124/riotapi/winrate-dtos-past-7-days/?puuid=${encodeURIComponent(
      puuid
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((winrateDTOsPast7DaysFromServer) => {
          setWinRateDTOsPast7Days(winrateDTOsPast7DaysFromServer);
          setFetchingSummonerData(false);
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

  function getThreeMainChampions(encryptedSummonerId, region) {
    const url = `https://localhost:7124/riotapi/3-main-champions/?encryptedSummonerId=${encodeURIComponent(encryptedSummonerId)}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((threeMainChampionsFromServer) => {
          setThreeMainChampions(threeMainChampionsFromServer);
        });
      } else {
        response
          .text()
          .then(function (text) {
            throw new Error(
              `Fetching getThreeMainChampions. Server error message: ${text}.`
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
        <Col xs={8}>
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

        <Col xs={2}>
          <Button
            type="submit"
            className="h-100 w-100"
            disabled={fetchingSummonerData}
          >
            {fetchingSummonerData ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Search"
            )}
          </Button>
        </Col>
      </Row>

      {fetchingSummonerData && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Form>
  );
}

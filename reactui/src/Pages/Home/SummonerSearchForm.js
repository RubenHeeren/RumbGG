import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RumbGGContext from "../../Context/RumbGGContext";
import Spinner from "react-bootstrap/Spinner";
import { Constants } from "../../Utilities/Constants";

export default function SummonerSearchForm() {
  const context = useContext(RumbGGContext);
  const { fetchingSummonerData, setFetchingSummonerData } = context.fetchingSummonerDataState;

  const [summonerName, setSummonerName] = useState("Bold Critter");
  const [region, setRegion] = useState(2);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFetchingSummonerData(true);
    getSummoner();
  };

  function getSummoner() {
    const url = `${Constants.API_URL_SUMMONER}?name=${encodeURIComponent(summonerName)}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((summonerFromServer) => {
          context.summonerState.setSummoner(summonerFromServer);
          getWinrateDTOsPast7Days(summonerFromServer.puuid, summonerFromServer.region);
          getRankedSolo5x5leagueEntry(summonerFromServer.id, summonerFromServer.region);
          getThreeMainChampions(summonerFromServer.id, summonerFromServer.region);
          getMatchHistoryCardDTOsLast3RankedGames(summonerFromServer.puuid, summonerFromServer.region);
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
    const url = `${Constants.API_URL_RANKED_SOLO_5X5_LEAGUE_ENTRY}?encryptedSummonerId=${encodeURIComponent(
      encryptedSummonerId
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((rankedSolo5x5leagueEntry) => {
          context.summonerRankedSolo5x5LeagueEntryState.setSummonerRankedSolo5x5LeagueEntry(rankedSolo5x5leagueEntry);
          setFetchingSummonerData(false);
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
    const url = `${Constants.API_URL_WINRATE_DTOS_PAST_SEVEN_DAYS}?puuid=${encodeURIComponent(
      puuid
    )}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((winrateDTOsPast7DaysFromServer) => {
          context.winRateDTOsPast7DaysState.setWinRateDTOsPast7Days(winrateDTOsPast7DaysFromServer);
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
    const url = `${Constants.API_URL_THREE_MAIN_CHAMPIONS}?encryptedSummonerId=${encodeURIComponent(encryptedSummonerId)}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((threeMainChampionsFromServer) => {
          context.threeMainChampionsState.setThreeMainChampions(threeMainChampionsFromServer);
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

  function getMatchHistoryCardDTOsLast3RankedGames(puuid, region) {
    const url = `${Constants.API_URL_MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES}?puuid=${encodeURIComponent(puuid)}&region=${encodeURIComponent(region)}`;

    fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((matchHistoryCardDTOsLast3RankedGamesFromServer) => {
          context.matchHistoryCardDTOsLast3RankedGamesState.setMatchHistoryCardDTOsLast3RankedGames(matchHistoryCardDTOsLast3RankedGamesFromServer);
        });
      } else {
        response
          .text()
          .then(function (text) {
            throw new Error(
              `Fetching MatchHistoryCardDTOsLast3RankedGames. Server error message: ${text}.`
            );
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit} className="px-md-25 mb-4">
      <Row>
        <div className="w-100 d-flex flex-column justify-content-center">
          <h1 className="main-rumb-gg-text">RUMB.GG</h1>          
        </div>
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
            aria-label="Region"
            className="h-100"
          >
            <option value="2">EUW</option>
            <option value="3">NA</option>
            <option value="4">OCE</option>
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
    </Form>
  );
}

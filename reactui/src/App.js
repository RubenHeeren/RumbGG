import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Home from "./Pages/Home/Home";
import About from "./Pages/About";
import Champions from "./Pages/Champions";
import RumbGGContext from "./Context/RumbGGContext";

const App = () => {
  const [summoner, setSummoner] = useState({});
  const [summonerRankedSolo5x5LeagueEntry, setSummonerRankedSolo5x5LeagueEntry] = useState({});
  const [winRateDTOsPast7Days, setWinRateDTOsPast7Days] = useState([]);
  const [threeMainChampions, setThreeMainChampions] = useState([]);
  const [matchHistoryCardDTOsLast3RankedGames, setMatchHistoryCardDTOsLast3RankedGames] = useState([]);
  const [fetchingSummonerData, setFetchingSummonerData] = useState(false);

  const contextValue = {
    summonerState: {
      summoner,
      setSummoner
    },
    summonerRankedSolo5x5LeagueEntryState: {
      summonerRankedSolo5x5LeagueEntry,
      setSummonerRankedSolo5x5LeagueEntry
    },
    winRateDTOsPast7DaysState: {
      winRateDTOsPast7Days,
      setWinRateDTOsPast7Days
    },
    threeMainChampionsState: {
      threeMainChampions,
      setThreeMainChampions
    },
    matchHistoryCardDTOsLast3RankedGamesState: {
      matchHistoryCardDTOsLast3RankedGames,
      setMatchHistoryCardDTOsLast3RankedGames
    },
    fetchingSummonerDataState: {
      fetchingSummonerData,
      setFetchingSummonerData
    }
  };

  return (
    <RumbGGContext.Provider value={contextValue}>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-0 pt-1">
          <Container>
            <LinkContainer exact to="/">
              <Navbar.Brand href="/" className="pb-2">RUMB.GG</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer exact to="/" className="mx-md-2">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/champions" className="mx-md-2">
                  <Nav.Link>Champions</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/about" className="mx-md-2">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Route path="/" exact component={Home} />
        <Route path="/champions" component={Champions} />
        <Route path="/about" component={About} />
      </Router>
    </RumbGGContext.Provider>
  );
};

export default App;

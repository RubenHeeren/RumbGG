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
  const [
    summonerRankedSolo5x5LeagueEntry,
    setSummonerRankedSolo5x5LeagueEntry,
  ] = useState({});
  const [winRateDTOsPast7Days, setWinRateDTOsPast7Days] = useState([]);
  const [threeMainChampions, setThreeMainChampions] = useState([]);

  const contextValue = {
    summonerState: {
      summoner,
      setSummoner,
    },
    summonerRankedSolo5x5LeagueEntryState: {
      summonerRankedSolo5x5LeagueEntry,
      setSummonerRankedSolo5x5LeagueEntry,
    },
    winRateDTOsPast7DaysState: {
      winRateDTOsPast7Days,
      setWinRateDTOsPast7Days,
    },
    threeMainChampionsState: {
      threeMainChampions,
      setThreeMainChampions,
    },
  };

  return (
    <RumbGGContext.Provider value={contextValue}>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer exact to="/">
              <Navbar.Brand href="/">RUMB.GG</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer exact to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/champions">
                  <Nav.Link>Champions</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/about">
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

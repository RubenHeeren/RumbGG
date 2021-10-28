import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Home from "./Components/Home";
import About from "./Components/About";
import Champions from "./Components/Champions";
import RumbGGContext from "./Context/RumbGGContext";

const App = () => {
  const [summoner, setSummoner] = useState({});
  const value = { summoner, setSummoner };

  return (
    <RumbGGContext.Provider value={value}>
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
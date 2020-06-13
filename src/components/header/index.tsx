import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "gatsby";
import headerStyles from "./header.module.css";

type Props = {
  siteTitle: string;
};

const Header = (props: Props) => {
  const { siteTitle } = props;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Container fluid>
      <Row className={headerStyles.siteTitleContainer + " " + "pt-3"}>
        <Col>
          <Link to="/">
            <h1 className={headerStyles.siteTitle}>Julian Inwood</h1>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/blog">Blog</Link>
                <Link className="nav-link" to="/projects">Projects</Link>
                <Link className="nav-link" to="/about">About</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

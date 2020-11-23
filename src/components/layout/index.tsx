/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Container from "react-bootstrap/Container";

import Header from "../header/";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/global.css";
import "../../styles/custom.css";
import { Col, Row } from "react-bootstrap";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const play = () => {
    const audio = document.getElementsByClassName(
      "audio-element"
    )[0] as HTMLAudioElement;
    console.log("yo");
    //audio.play();
  };

  return (
    <>
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="p-3 container">{children}</div>
      </Container>
      <footer>
        <Container className="">
          <Row>
            <Col></Col>
            <Col onClick={play} className="d-flex justify-content-center">
              🦆
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <div>
          <audio className="audio-element">
            <source src="https://quicksounds.com/uploads/tracks/1145428463_122281271_796721762.mp3" />
          </audio>
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

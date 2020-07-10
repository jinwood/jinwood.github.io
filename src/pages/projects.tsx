import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      jinwoodImage: file(relativePath: { eq: "jinwood-github-io.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  console.log(data);
  return (
    <Layout>
      <Row>
        <Col md={8}>
          <h3>jinwood.github.io</h3>
          <p>
            I built this site during 2020 when I decided I wanted to retire my
            old express blog, which was built many moons ago and became somewhat
            neglected. This is still a work in progress, and I intend to add a
            blog and some other bits and pieces I've been working on to the
            projects page.
          </p>
          <p>
            It's built using gatsby.js - a fantastic tool for creating static
            sites with react. Has some really great features, like serving
            filesystem assets using graphql, PWA support out the box, etc. It
            took me a couple of evenings to get the bulk of it set up, and now
            I'm just tweaking, refining and adding features. Overall it's been a very
            pleasant experience.
          </p>
          <p>
            Take a look at the source{" "}
            <a
              href="https://github.com/jinwood/jinwood.github.io/tree/develop"
              target="blank"
            >
              here.
            </a>
          </p>
        </Col>
        <Col>
          <Img
            className="rounded mb-3"
            fluid={data.jinwoodImage.childImageSharp.fluid}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Projects;

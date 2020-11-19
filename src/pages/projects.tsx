import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";
import { Carousel, CarouselItem } from "react-bootstrap";

const Projects = () => {
  const data = useStaticQuery(
    graphql`
      query {
        jinwoodImage: file(relativePath: { eq: "jinwood-github-io.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        allFile(
          sort: { fields: name, order: DESC }
          filter: { relativeDirectory: { eq: "letme" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    `
  );
  const { allFile, jinwoodImage } = data;
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
            I'm just tweaking, refining and adding features. Overall it's been a
            very pleasant experience.
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
            fluid={jinwoodImage.childImageSharp.fluid}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Letme CMS & Caseworking</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Carousel interval={7000}>
            {allFile.edges.map((pic: any) => (
              <Carousel.Item key={pic.node.id}>
                <Img fluid={pic.node.childImageSharp.fluid} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col>
          <p>
            Letme was an exciting startup in the property rental space. I was
            the first developer on a team of three tasked with building out an
            ecommerce website, caseworking, crm, marketing and callcenter
            system.
          </p>
          <p>
            The caseworking / crm system were both built using React and flux
            (this is going back a while!). Everything ran off a .NET core
            backend using a microservices architecture.
          </p>
        </Col>
      </Row>
    </Layout>
  );
};

export default Projects;

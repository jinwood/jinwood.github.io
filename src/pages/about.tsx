import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";

const About = () => {
  return (
    <Layout>
      <Row>
        <Col md={8}>
          <h3>Web developer - Bristol, UK</h3>

          <p>
            <strong>
              A programming enthusiast who loves writing good software.
            </strong>{" "}
            I'm experienced in web development and have worked across a variety
            of stacks, in various industries.
          </p>
        </Col>
      </Row>
    </Layout>
  );
};

export default About;

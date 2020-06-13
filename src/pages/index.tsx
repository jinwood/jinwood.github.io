import React from "react";
import { Link } from "gatsby";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <Row>
      <Col md={8} sm={12}>
        <Jumbotron className="p-5">
          <SEO title="Home" />
          <p>Hey</p>

          <p>I'm a web developer based in Bristol</p>
          <p>stuff</p>
        </Jumbotron>
      </Col>
      <Col>
        <Jumbotron>
          Socials
        </Jumbotron>
        <Jumbotron>
          Recent Posts
        </Jumbotron>
      </Col>
    </Row>
  </Layout>
);

export default IndexPage;

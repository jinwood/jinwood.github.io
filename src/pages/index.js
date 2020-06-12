import React from "react";
import { Link } from "gatsby";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout/";
import SEO from "../components/seo/";

const IndexPage = () => (
  <Layout>
    <Jumbotron className="p-5">
      <Row>
        <Col>
          <SEO title="Home" />
          <p>Hey</p>

          <p>I'm a web developer based in Bristol</p>
        </Col>
      </Row>

      <Row>
        <Link to="/page-2/">Go to page 2</Link>
        <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </Row>
    </Jumbotron>
  </Layout>
);

export default IndexPage;

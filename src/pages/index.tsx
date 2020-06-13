import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ProfileImage from "../components/profile-image";

const IndexPage = () => (
  <Layout>
    <Row>
      <Col md={8} sm={12}>
        <Jumbotron className="p-5">
          <SEO title="Home" />
          <Row>
            <Col md={4}>
              <ProfileImage />
            </Col>
            <Col>
              <h3>
                Lifelong nerd, tech enthusiast and self taught web developer.
              </h3>
            </Col>
          </Row>
          <p>
            I've been working in web development since 2013, where I began my
            career building web apps with ASP.Net web forms. Since then I've
            built APIs, mobile apps, caseworking software, telephony interfaces,
            and recently PWAs. I originally focused on the Microsoft tech stack,
            but now my passion is in open source technology and UNIX operating
            systems. My work laptop is a Mac, but I use Linux at home. I'm
            passionate about the web, online privacy, and technology in general.
          </p>
          <p>
            Recently I've been working with react.js, flow, redux and graphql
            but I am interested in any and all web stacks.
          </p>

          <p>
            Outside of work, I practise Brazillian Jiu-Jitsu, listen to a ton of
            music and play video games.
          </p>
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

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
          <h2>Web developer - Bristol, UK</h2>

          <p>
            <strong>
              A programming enthusiast who loves writing good software.
            </strong>
            {" "}
            I'm experienced in web development and have worked across a variety
            of stacks, in various industries. I started my career working in
            ASP.NET but have since transitioned into more JavaScript orintated
            positions. With that said, I am interested in any and all tech
            stacks.
          </p>
          <h3>
            Employment
          </h3>
          <h4>Current</h4>
          <strong>Quadrotech</strong>
          <p>
            I currently work for <a
              href="https://www.quadrotech-it.com/"
              target="blank"
            >
              Quadrotech
            </a>, building <a
              href="https://www.quadrotech-it.com/office-365-management-software/"
              target="blank"
            >
              Nova
            </a>, an Office 365 management and reporting platform for the
            enterprise. I'm part of the UI team working with React, Redux and
            Flow. My day to day activities include building new features, fixing
            bugs, writing documentation, tests, etc. I am currenty spearheading
            a push towards a micro-frontend architecture so this invovles some
            high level design work, task scoping and plenty of planning.
          </p>
          <h4>Previous</h4>
          <strong>Just Eat</strong>
          <p>
            Part of the web foundations team, running the Just Eat global
            homepage, static pages and shared assets.
          </p>
          <ul>
            <li>
              Produce and maintain shareable web components for use throughout
              the Just Eat web platform
            </li>
            <li>
              Contribute to <a
                href="https://github.com/justeat/fozzie/graphs/contributors"
                target="blank"
              >
                Fozzy
              </a>, UI library and suite of tools used across Just Eat.
            </li>
            <li>
              Assist in migration from classic MVC style UI archtecture to Vue
              components
            </li>
            <li>
              Provide support to ensure maximum uptime including on call duties
            </li>
            <li>
              Provide regular code reviews, code pairing and assistance with
              other team members
            </li>
            <li>
              Release management, including reviewing, merging and deployment•On
              call support, montioring, escaltion and issue resolution
            </li>
          </ul>
        </Col>
      </Row>
    </Layout>
  );
};

export default About;

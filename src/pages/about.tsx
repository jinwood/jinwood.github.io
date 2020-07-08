import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/layout";

//todo make this a bit more dynamic...
const About = () => {
  return (
    <Layout>
      <Row>
        <Col md={8}>
          <h2>Web developer - Bristol, UK</h2>

          <p>
            <strong>
              A programming enthusiast who takes pride in writing good software.
            </strong>{" "}
            I'm experienced in web development and have worked across a variety
            of stacks, in various industries. I started my career working in
            ASP.NET but have since transitioned into more JavaScript orientated
            positions. With that said, I am interested in any and all tech
            stacks (but I'd prefer to stay away from Windows 😀).
          </p>
          <p>
            I use a Macbook for my day job and a Linux desktop for everything
            else. Vim is my text editor of choice for most languages, but when
            I'm using TypeScript I tend to switch between it and VS Code (hard
            to argue with the fantastic language integration). I do everything
            else from the terminal. If you're interested you can see my dotfiles{" "}
            <a href="https://github.com/jinwood/dotfiles" target="blank">
              here
            </a>{" "}
            (although they are still very much WIP and probably not very good).
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <p>
            Currently I am working with react, redux and flow during the day,
            and TypeScript at home. I'm experienced with C# .NET and spent the
            first few years of my software career building web apps using this
            technology. Although currently my preference is with the JavaScript
            / node ecosystem, I am interested in any and all web technologies.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h3>Employment</h3>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h4>Current</h4>
          <strong>Quadrotech</strong>
          <p>
            I currently work for{" "}
            <a href="https://www.quadrotech-it.com/" target="blank">
              Quadrotech
            </a>
            , building{" "}
            <a
              href="https://www.quadrotech-it.com/office-365-management-software/"
              target="blank"
            >
              Nova
            </a>
            , an Office 365 management and reporting platform for the
            enterprise. I'm part of the UI team working with React, Redux and
            Flow. My day to day activities include building new features, fixing
            bugs, writing documentation, tests, etc. I am currently spearheading
            a push towards a micro-frontend architecture so this involves some
            high level design work, task scoping and plenty of planning.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
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
              Contribute to{" "}
              <a
                href="https://github.com/justeat/fozzie/graphs/contributors"
                target="blank"
              >
                Fozzy
              </a>
              , UI library and suite of tools used across Just Eat.
            </li>
            <li>
              Assist in migration from classic MVC style UI architecture to Vue
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
              call support, monitoring, escalation and issue resolution
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <strong>Software Engineer at REPL Group </strong>
          <div>05-2017 - 08-2018</div>
          {/* todo - more */}
          <ul>
            <li>
              Support and maintenance tasks on Gloodoo enterprise social
              network.
            </li>
            <li>
              Develop new and existing API endpoints with Web API and Entity
              Framework.
            </li>
            <li>
              Greenfield tasks management app built using bleeding edge cloud
              technology - Azure Functions, Web Apps, Service Fabric, Storage
              Queues.
            </li>
            <li>
              Extend a legacy telent service by implementing a proxy Web App,
              used by Waitrose distribution centers.
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <strong>Software Engineer at The Richmond Group</strong>
          <div>06-2015 04-2017</div>
          <p>
            Startup incubator environment where moving fast and delivering were
            of upmost priority. Worked on two startup companies, building a
            platform for renting properties and lending money. Using Azure cloud
            technology with microservices architecture.
          </p>
          <p>Projects included:</p>
          <ul>
            <li>
              Call center application using Twilio and microservices
              architecture. Support queueing, multiple agents, call fetching,
              sending and receiving SMS. Built using .NET, Dapper.
            </li>
            <li>
              Marketing application for managing customer communications
              throughout signup process. Integration with customer.io and
              Twilio. The application needed to handle all automated marketing
              and follow up needs, scaling with a rapidly growing customer base.
              Generating email and sms messages on the fly, as customers moved
              through the apply process.
            </li>
            <li>
              CMS / Caseworking web application for managing customers & their
              journey throughout the product. Built using React and Flux.
              Integrated with existing microservices, including marketing, call
              center, etc.
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <strong> Software Developer at BSS Digital </strong>
          <div>07-2014 06-2015</div>
          <p>
            Digital agency serving the web needs of various charities across the
            UK.{" "}
          </p>
          <p>Responsibilities included</p>
          <ul>
            <li>
              Maintenance of Continuity CMS, used by LV Insurance. Python / .NET
              application. Building new features, writing new web components and
              fixing bugs
            </li>
            <li>
              Maintenance of bespoke logging application for Mind charity, a
              Python flask application.
            </li>
            <li>Build email templates for marketing.</li>
            <li>Provide general web support for various customers.</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <strong>Junior Developer at Interface 247 </strong>
          <div>04-2012 07-2014</div>
          <p>
            Started my career in software engineering at a vehicle management
            company.
          </p>
          <p>
            First project was a data import tool that took a CSV and converted
            it into a format that existing system could understand. Built
            initially in SQL, eventually added a basic front end.Assisted in
            building mygoodslocker website, a basic web forms application for
            managing home contents. Wrote Excel formulas for other staff
            members.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h4>Hobbies and Interests (pre covid)</h4>
          <p>
            I train Brazilian Jiu-Jitsu at Sweatbox Bristol under Pedro Bessa.
          </p>
          <p>
            I am fanatical about Formula 1 and try to attend one race a year. So
            far I've been to Spa x2 and Hungary, absolutely fantastic events and
            a lot of fun.
          </p>
          <p>
            I practice meditation when I can and try to be mindful in everything
            I do (not always easy!).
          </p>
          <p>I'm an avid gamer and currently play Dota and CS:GO.</p>
        </Col>
      </Row>
    </Layout>
  );
};

export default About;

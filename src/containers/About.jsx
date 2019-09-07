import React, { Component } from "react";
import { Container, Col, Row } from "react-grid-system";

import "../css/About.css";
import { disconnect } from "../actions/actionsAuth";

class About extends Component {

  render() {
    return (
      <div id="about">
        <Container fluid id="aboutContainer">
          <Row>
            <Col className="aboutCol">
              <img
                src={require("../static/manage_icon.png")}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br/>
              <strong className="aboutText">Gestion</strong>
              <br/>
              <p className="aboutDesc">
                Gérez votre activité, de la réception d'une oeuvre à la facturation.
              </p>
            </Col>
            <Col className="aboutCol">
              <img
                src={require("../static/suivi_icon.png")}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br/>
              <strong className="aboutText">Suivi</strong>
              <br/>
              <p className="aboutDesc">
                Suivez les oeuvres grâce au code QR avec notre application pour savoir exactement le statut de votre
                collection.
              </p>
            </Col>
            <Col className="aboutCol">
              <img
                src={require("../static/relation_icon.png")}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br/>
              <strong className="aboutText">Relation</strong>
              <br/>
              <p className="aboutDesc">
                Restez en contact avec les artistes et vos clients à travers notre plateforme.
              </p>
            </Col>
          </Row>
        </Container>
        <div className="quotation">
          <em className="quote">
            "Mes notes ne suffisent pas pour retrouver quelles oeuvres a acheté
            un client."
          </em>
          <br/>
          <p className="author">Philipe Eschenlohr, Galerie Raugraff</p>
        </div>
      </div>
    );
  }
}

export default About;

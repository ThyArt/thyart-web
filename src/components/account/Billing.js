import React, {Component} from 'react';
import { Navbar, Button, Jumbotron, Col, FormControl, FormGroup } from "react-bootstrap";

import "../../css/Billing.css";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      lName: "",
      address: "",
      mail: "",
      phone: "",
      artworkName: ""
    };
  }

  editable() {
    return (
      <div>
        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Informations du client</h2>

          <div className="row">
            <Col sm={5}>
              <h3 className="billingJumbotronTag">Prénom :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.fName}
                  placeholder="Entrer le prénom du client"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Nom :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.lName}
                  placeholder="Entrer le nom du client"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Adresse :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.address}
                  placeholder="Entrer l'adresse du client"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Mail :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.mail}
                  placeholder="Entrer l'adresse mail du client"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Téléphone :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.phone}
                  placeholder="Entrer le numéro de téléphone du client"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </div>
        </Jumbotron>

        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Oeuvre achetée</h2>

          <div className="row">
            <Col sm={5}>
              <h3 className="billingJumbotronTag">Nom de l'oeuvre :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this}>
                <FormControl
                  type="name"
                  value={this.state.artworkName}
                  placeholder="Entrer le nom de l'oeuvre"
                  onChange={this}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </div>
        </Jumbotron>
      </div>
    );
  };

  nonEditable() {
    //TODO: Remove following
    this.state.fName = "Maxence";
    this.state.lName = "TISSERANT";
    this.state.address = "Saint Petersbourg, Russie";
    this.state.mail = "maxence.tisserant@epitech.eu";
    this.state.phone = "0123456789";
    this.state.artworkName = "Path of Exile";

    return (
      <div>
        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Informations du client</h2>

          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Prénom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.state.fName }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Nom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.state.lName }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Adresse :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.state.address }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Mail :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.state.mail }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Téléphone :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.state.phone }</h3>
            </Col>
          </div>
        </Jumbotron>

        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Oeuvre achetée</h2>

          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Nom de l'oeuvre :</h3>
            </Col>
            <Col sm={6}>
              <h3>{ this.state.artworkName }</h3>
            </Col>
          </div>
        </Jumbotron>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          <Navbar fixedTop id='billingTopBar'>
            <a href="/account">
              <img src={require('../../static/SmallLogo.png')} alt="logo" height="100" id="logo"/>
            </a>
            <h1 id='billingTopTitle'>Facturation</h1>
          </Navbar>
        </div>

        <div>
          <Button bsStyle="primary" id="billingBackButton" href="/account">Retour à mon profil</Button>
        </div>

        {this.props.location.state.infos ? this.editable() : this.nonEditable()}

      </div>
    );
  }
}

export default Billing;
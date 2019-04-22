import React, {Component} from 'react';
import { Navbar, Button, Jumbotron, Col, FormControl, FormGroup } from "react-bootstrap";

import "../../css/Billing.css";
import { addBilling, signInIfNeeded } from "../../actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findIndex } from "lodash";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artworkName: '',
      fName: '',
      lName: '',
      mail: '',
      address: '',
      phone: ''
    };
    this.billingCreation= this.billingCreation.bind(this);
  }

  getArtworkNameValidationState() {
    let name = this.state.artworkName;
    if (name === '') return 'error';
    return 'success';
  };

  handleChangeArtworkName = event => {
    this.setState({ artworkName: event.target.value });
  };

  getNameValidationState() {
    let name = this.state.lName;
    if (name === '') return 'error';
    return 'success';
  };

  handleChangeName = event => {
    this.setState({ lName: event.target.value });
  };

  getFamilyValidationState() {
    let family = this.state.fName;
    if (family === '') return 'error';
    return 'success';
  };

  handleChangeFamily = event => {
    this.setState({ fName: event.target.value });
  };

  getMailValidationState() {
    let email = this.state.mail;
    if (email === '') return 'error';
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  };

  handleChangeMail = event => {
    this.setState({ mail: event.target.value });
  };

  getAddressValidationState() {
    let address = this.state.address;
    if (address === '') return 'error';
    let re = /^.+$/;

    if (re.test(address)) {
      return 'success';
    } else {
      return 'error';
    }
  };

  handleChangeAddress = event => {
    this.setState({ address: event.target.value });
  };

  getNumberValidationState() {
    let number = this.state.phone;
    if (number === '') return 'error';
    let re = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

    if (re.test(number)) {
      return 'success';
    } else {
      return 'error';
    }
  };

  handleChangeNumber = event => {
    this.setState({ phone: event.target.value });
  };

  billingCreation = () => {
    if (
      this.getMailValidationState() === 'success' &&
      this.getArtworkNameValidationState() === 'success' &&
      this.getNameValidationState() === 'success' &&
      this.getFamilyValidationState() === 'success' &&
      this. getNumberValidationState() === 'success'
    ) {
      this.props.dispatch(addBilling({fName: this.state.fName, lName: this.state.lName,
        mail: this.state.mail, address: this.state.address ,
        phone: this.state.phone, artworkName: this.state.artworkName}));
      this.props.onClick();
    }
  };

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
              <FormGroup className='billingJumbotronInput' validationState={this.getNameValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.lName}
                  placeholder="Entrer le prénom du client"
                  onChange={this.handleChangeName}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Nom :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getNameValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.fName}
                  placeholder="Entrer le nom du client"
                  onChange={this.handleChangeFamily}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Adresse :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getAddressValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.address}
                  placeholder="Entrer l'adresse du client"
                  onChange={this.handleChangeAddress}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Mail :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getMailValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.mail}
                  placeholder="Entrer l'adresse mail du client"
                  onChange={this.handleChangeMail}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Téléphone :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getNumberValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.phone}
                  placeholder="Entrer le numéro de téléphone du client"
                  onChange={this.handleChangeNumber}
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
              <FormGroup className='billingJumbotronInput' validationState={this.getArtworkNameValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.artworkName}
                  placeholder="Entrer le nom de l'oeuvre"
                  onChange={this.handleChangeArtworkName}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </div>
        </Jumbotron>
        <Button onClick={this.billingCreation}>Create</Button>
      </div>

    );
  };

  nonEditable() {
    //TODO: Remove following
   /* this.state.fName = "Maxence";
    this.state.lName = "TISSERANT";
    this.state.address = "Saint Petersbourg, Russie";
    this.state.mail = "maxence.tisserant@epitech.eu";
    this.state.phone = "0123456789";
    this.state.artworkName = "Path of Exile"; */


    return (
      <div>
        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Informations du client</h2>

          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Prénom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.currentBilling.lName }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Nom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.currentBilling.fName }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Adresse :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.currentBilling.address }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Mail :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.currentBilling.mail }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Téléphone :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.currentBilling.phone }</h3>
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
              <h3>{ this.props.currentBilling.artworkName }</h3>
            </Col>
          </div>
        </Jumbotron>
      </div>
    );
  };

  render() {
    return (
      <div>

        {!this.props.currentBilling ? this.editable() : this.nonEditable()}

      </div>
    );
  }
}

Billing.propTypes = {
  billings: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    billings,
    currentBilling
  } = state;

  return {
    billings,
    currentBilling
  }
}

export default connect(
  mapStateToProps
)(Billing)
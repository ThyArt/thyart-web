import React, {Component} from 'react';
import { Button, Jumbotron, Col, FormControl, FormGroup, Form } from "react-bootstrap";

import "../../css/Billing.css";
import { createBillingIfNeeded, modifyBillingIfNeeded, openModifyBilling } from "../../actions/actionsBillings";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artworkId: '',
      fName: '',
      lName: '',
      mail: '',
      address: '',
      phone: '',
      country: '',
      city: ''
    };
    this.billingCreation= this.billingCreation.bind(this);
  }

  getArtworkIdValidationState() {
    return 'success';
  }

  handleChangeArtworkId = event => {
    this.setState({ artworkId: event.target.value });

  };

  getCountryValidationState() {
    let country = this.state.country;
    if (country === '') return 'error';
    return 'success';
  };

  handleChangeCountry = event => {
    this.setState({ country: event.target.value });
  };

  getCityValidationState() {
    let city = this.state.city;
    if (city === '') return 'error';
    return 'success';
  };

  handleChangeCity = event => {
    this.setState({ city: event.target.value });
  };

  getNameValidationState() {
    let name = this.state.fName;
    if (name === '') return 'error';
    return 'success';
  };

  handleChangeName = event => {
    this.setState({ fName: event.target.value });
  };

  getFamilyValidationState() {
    let family = this.state.lName;
    if (family === '') return 'error';
    return 'success';
  };

  handleChangeFamily = event => {
    this.setState({ lName: event.target.value });
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
      this.getCountryValidationState() === 'success' &&
      this.getAddressValidationState() === 'success' &&
      this.getCityValidationState() === 'success' &&
      this.getNameValidationState() === 'success' &&
      this.getFamilyValidationState() === 'success' &&
      this.getNumberValidationState() === 'success'
    ) {
      if (this.props.new) {
        this.props.dispatch(createBillingIfNeeded(this.props.token, this.state.mail, this.state.phone,
          this.state.fName, this.state.lName, this.state.country,
          this.state.city, this.state.address, this.state.artworkId));
      }
      else
      {
        this.props.dispatch(modifyBillingIfNeeded(this.props.token, this.state.mail, this.state.phone,
          this.state.fName, this.state.lName, this.state.country,
          this.state.city, this.state.address, this.state.artworkId));
      }
    }
  };

  onModify = () => {
    this.props.dispatch(openModifyBilling());
    this.setState({
      artworkId: this.props.billing.artwork.id,
      fName: this.props.billing.customer.first_name,
      lName: this.props.billing.customer.last_name,
      mail: this.props.billing.customer.email,
      address: this.props.billing.customer.address,
      phone: this.props.billing.customer.phone,
      country: this.props.billing.customer.country,
      city: this.props.billing.customer.city
    });
  };


  handleClickArtwork = event =>{
      console.log(event);
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
                  value={this.state.fName}
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
              <FormGroup className='billingJumbotronInput' validationState={this.getFamilyValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.lName}
                  placeholder="Entrer le nom du client"
                  onChange={this.handleChangeFamily}
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
              <h3 className="billingJumbotronTag">Ville :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getCityValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.city}
                  placeholder="Entrer la ville du client"
                  onChange={this.handleChangeCity}
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={5}>
              <h3 className="billingJumbotronTag">Pays :</h3>
            </Col>
            <Col sm={7}>
              <FormGroup className='billingJumbotronInput' validationState={this.getCountryValidationState()}>
                <FormControl
                  type="name"
                  value={this.state.country}
                  placeholder="Entrer le pays du client"
                  onChange={this.handleChangeCountry}
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
              {
                this.props.artworks.length ? (
                <FormGroup className='billingJumbotronInput' validationState={this.getArtworkIdValidationState()}>
                  <FormControl
                    onChange={this.handleChangeArtworkId}
                    as="select"
                    value={this.props.artworks[0].value}
                  >
                    {this.props.artworks.map(artwork =>
                      <option key={artwork.id} value={artwork.key} >
                        {artwork.name}
                      </option>
                    )}
                    </FormControl>
                  </FormGroup>
                  ) : (<div/>)
                }
              {
                this.props.newObj ? (
                  <Button bssize="lg" onClick={this.billingCreation}
                        className='billingCreateButton' bsstyle="primary">
                    Créer une nouvelle facture
                  </Button>) :
                  (<Button bssize="lg" onClick={this.billingCreation}
                           className='billingCreateButton' bsstyle="primary">
                    Modifier facture
                  </Button>)
              }
            </Col>
          </div>
        </Jumbotron>
      </div>
    );
  };

  nonEditable() {
    return (
      <div>
        <Button bssize="lg" onClick={this.onModify} className='billingMainButton'>
          <span className='add'>Modify</span>
        </Button>
        <Jumbotron className="billingJumbotron">
          <h2 className="billingJumbotronTitle">Informations du client</h2>

          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Prénom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.first_name }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Nom :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.last_name }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Mail :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.email }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Téléphone :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.phone }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Adresse :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.address }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">City :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.city }</h3>
            </Col>

            <Col sm={6}>
              <h3 className="billingJumbotronTag">Country :</h3>
            </Col>
            <Col sm={6}>
              <h3 className="billingJumbotronInfo">{ this.props.billing.customer.country }</h3>
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
              <h3>{ this.props.billing.artwork.name }</h3>
            </Col>
          </div>
          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Référence :</h3>
            </Col>
            <Col sm={6}>
              <h3>{ this.props.billing.artwork.ref }</h3>
            </Col>
          </div>
          <div className="row">
            <Col sm={6}>
              <h3 className="billingJumbotronTag">Prix :</h3>
            </Col>
            <Col sm={6}>
              <h3>{ this.props.billing.artwork.price + '€'}</h3>
            </Col>
          </div>
        </Jumbotron>
      </div>
    );
  };

  render() {
    return (
      <div>

        {this.props.modif ? this.editable() : this.nonEditable()}

      </div>
    );
  }
}

Billing.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  billing: PropTypes.object,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  artworks: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    billing,
    modif,
    newObj,
    table,
    artworks,
    dispatch
  } = state.billings;

  return {
    isFetching,
    msg,
    error,
    billing,
    modif,
    newObj,
    table,
    artworks,
    dispatch
  }
}

export default connect(
  mapStateToProps
)(Billing);
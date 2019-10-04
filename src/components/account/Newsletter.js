import React, {Component} from 'react';
import { Jumbotron} from "react-bootstrap";

import "../../assets/css/Newsletter.css";
import { createBillingIfNeeded } from "../../actions/actionsBillings";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Newsletter extends Component {
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
      this.props.dispatch(createBillingIfNeeded(this.props.token, this.state.mail, this.state.phone,
          this.state.fName, this.state.lName, this.state.country,
          this.state.city, this.state.address, this.state.artworkId));
    }
  };

  handleClickArtwork = event =>{
    console.log(event);
  };

  editable() {
    return (
        <div>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Sélection des clients</h2>


          </Jumbotron>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Texte</h2>

          </Jumbotron>
        </div>
    );
  };

  nonEditable() {
    return (
        <div>
          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Sélection des clients</h2>

          </Jumbotron>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Texte</h2>

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

Newsletter.propTypes = {
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
    table,
    artworks,
    dispatch
  }
}

export default connect(
    mapStateToProps
)(Newsletter);
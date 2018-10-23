import React, {Component} from 'react';
import { PageHeader, Jumbotron, Col } from 'react-bootstrap';
import Modal from "react-responsive-modal";
import { FormControl, FormGroup, Button } from "react-bootstrap";
import ReactLoading from 'react-loading';


import '../../css/Profile.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfileIfNeeded} from "../../actions/actions";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tmpMail: '',
      newPassword1: '',
      newPassword2: '',
      mailModal: false,
      passwordModal: false
    };
  }

  onMailOpen = () => {
    this.setState({ mailModal: true });
  };

  onMailClose = () => {
    this.setState({ mailModal: false });
  };

  onPasswordOpen = () => {
    this.setState({ passwordModal: true });
  };

  onPasswordClose = () => {
    this.setState({ passwordModal: false });
  };

  handleChangeMail = event => {
    this.setState({ tmpMail: event.target.value });
  };

  handleChangePassword1 = event => {
    this.setState({ newPassword1: event.target.value });
  };

  handleChangePassword2 = event => {
    this.setState({ newPassword2: event.target.value });
  };

  checkMail = () => {
    if (this.state.tmpMail.length > 4 /*&& valid mail address*/) {
      this.setState({ mail: this.state.tmpMail, mailModal: false });
    //  Send new mail to API
    }
  };

  componentDidMount(){
    this.props.dispatch(getProfileIfNeeded(this.props.token))
  }

  checkPassword = () => {
    if (this.state.newPassword1 === this.state.newPassword2 &&
      this.state.newPassword1.length >= 6 /*&& valid password*/)
    {
      this.setState({ passwordModal: false });
      // Send new password to API
      this.setState({ newPassword1: '', newPassword2: '' });
    }
  };

  render() {
    return (
        <div id='profile'>
          <PageHeader>Vos informations :</PageHeader>

          <Jumbotron className='jumbo'>
            <h3>Informations de connexion :</h3>

            <div className='form'>
              <div>
                <Col sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                    {this.props.isFetching ? (
                        <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
                    ) : (
                        this.props.mail
                    )
                    }
                  <button className='modify' onClick={this.onMailOpen}>
                    <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto" />
                    <span className='modifyText'>Modifier</span>
                  </button>
                </Col>

                <Modal open={this.state.mailModal} onClose={this.onMailClose} center>
                  <h2 className="title">Changement d'adresse mail :</h2>
                  <Col sm={6}>
                    <h3 className="name">Nouvelle adresse mail :</h3>
                  </Col>
                  <Col sm={6}>
                    <FormGroup className='input'>
                      <FormControl
                        type="text"
                        value={this.state.tmpMail}
                        placeholder="Entrer la nouvelle adresse mail"
                        onChange={this.handleChangeMail}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Button bsStyle="primary" onClick={this.checkMail} className='validate' bsSize='large'>
                    Valider
                  </Button>
                </Modal>
              </div>

              <div>
                <Col sm={2}>
                  Mot de passe
                </Col>
                <Col sm={10}>
                  ********
                  <button className='modify' onClick={this.onPasswordOpen}>
                    <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto" />
                    <span className='modifyText'>Modifier</span>
                  </button>
                </Col>

                <Modal open={this.state.passwordModal} onClose={this.onPasswordClose} center>
                  <h2 className='title'>Changement de mot de passe :</h2>
                  <Col sm={6}>
                    <h3 className="name">Nouveau mot de passe :</h3>
                  </Col>
                  <Col sm={6}>
                    <FormGroup className='input'>
                      <FormControl
                        type="password"
                        value={this.state.newPassword1}
                        placeholder="Entrer le nouveau mot de passe"
                        onChange={this.handleChangePassword1}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <h3 className="name">Confirmer mot de passe :</h3>
                  </Col>
                  <Col sm={6}>
                    <FormGroup className='input'>
                      <FormControl
                        type="password"
                        value={this.state.newPassword2}
                        placeholder="Entrer le nouveau mot de passe"
                        onChange={this.handleChangePassword2}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Button bsStyle="primary" onClick={this.checkPassword} className='validate' bsSize='large'>
                    Valider
                  </Button>
                </Modal>
              </div>
            </div>
          </Jumbotron>

        </div>
    );
  }
}


Profile.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    token: PropTypes.string,
    msg: PropTypes.string,
    error: PropTypes.string,
    mail: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isLogged,
        isFetching,
        token,
        msg,
        error,
        mail
    } = state;

    return {
        isLogged,
        isFetching,
        token,
        msg,
        error,
        mail
    }
}

export default connect(mapStateToProps)(Profile);

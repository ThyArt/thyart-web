import React, {Component} from 'react';
import { PageHeader, Jumbotron, Col } from 'react-bootstrap';
import Modal from "react-responsive-modal";
import { FormControl, FormGroup, Button } from "react-bootstrap";
import ReactLoading from 'react-loading';

import '../../css/Profile.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfileIfNeeded,
  modifyMailIfNeeded,
  modifyPasswordIfNeeded,
  modifyFirstnameIfNeeded,
  modifyLastnameIfNeeded} from "../../actions/actionsProfile";
import Row from "react-bootstrap/es/Row";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tmpMail: '',
      newPassword1: '',
      newPassword2: '',
      newFirstname: '',
      newLastname: '',
      mailModal: false,
      passwordModal: false,
      firstnameModal: false,
      lastnameModal: false
    };
  }

  componentDidMount(){
    this.props.dispatch(getProfileIfNeeded(this.props.token))
  }

  onMailOpen = () => {
    this.setState({tmpMail: this.props.mail, mailModal: true });
  };

  onMailClose = () => {
    this.setState({tmpMail: this.props.mail, mailModal: false});
  };

  onPasswordOpen = () => {
    this.setState({ passwordModal: true });
  };

  onPasswordClose = () => {
    this.setState({newPassword1: '', newPassword2: '', passwordModal: false });
  };

  onFirstnameOpen = () => {
    this.setState({newFirstname: this.props.firstname, firstnameModal: true });
  };

  onFirstnameClose = () => {
    this.setState({newFirstname: this.props.firstname, firstnameModal: false});
  };

  onLastnameOpen = () => {
    this.setState({newLastname: this.props.lastname, lastnameModal: true });
  };

  onLastnameClose = () => {
    this.setState({newLastname: this.props.lastname, lastnameModal: false});
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

  handleChangeFirstname = event => {
    this.setState({ newFirstname: event.target.value });
  };

  handleChangeLastname = event => {
    this.setState({ newLastname: event.target.value });
  };

  getFirstnameValidationState() {
    let firstname = this.state.newFirstname;
    if (firstname === '') return 'error';
    return 'success';
  }

  getLastnameValidationState() {
    let lastname = this.state.newLastname;
    if (lastname === '') return 'error';
    return 'success';
  }

  getMailValidationState() {
    let email = this.state.tmpMail;
    if (email === '') return 'error';
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getPassValidationState() {
    let password = this.state.newPassword1;
    if (password === '') return 'error';
    let strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    let mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    if (strongRegex.test(password) || mediumRegex.test(password)) {
      return 'success';
    } else if (password !== '') {
      return 'warning';
    } else {
      return 'error';
    }
  }

  getConfirmValidationState() {
    let password = this.state.newPassword1;
    if (password === '') return 'error';
    if (password === this.state.newPassword2) {
      return 'success';
    } else {
      return 'error';
    }
  }

  checkMail = () => {
    if (this.getMailValidationState() === 'success') {
      this.props.dispatch(modifyMailIfNeeded(this.props.token, this.state.tmpMail));
      this.setState({mailModal: false });
      this.setState({ newMail: ''});

    }
  };

  checkPassword = () => {
    if (this.getPassValidationState() === 'success' && this.getConfirmValidationState() === 'success')
    {
      this.setState({ passwordModal: false });
      this.props.dispatch(modifyPasswordIfNeeded(this.props.token, this.state.newPassword1));
      this.setState({ newPassword1: '', newPassword2: '' });
    }
  };

  checkFirstname = () => {
    if (this.getFirstnameValidationState() === 'success')
    {
      this.setState({ firstnameModal: false });
      this.props.dispatch(modifyFirstnameIfNeeded(this.props.token, this.state.newFirstname));
      this.setState({ newFirstname: ''});
    }
  };

  checkLastname = () => {
    if (this.getLastnameValidationState() === 'success')
    {
      this.setState({ lastnameModal: false });
      this.props.dispatch(modifyLastnameIfNeeded(this.props.token, this.state.newLastname));
      this.setState({ newLastname: ''});
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
              <Row className='info'>
                <Col sm={2} className='field'>
                  Prénom:
                </Col>
                <Col sm={2}>
                {
                  this.props.isFetching ? (
                  <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
                ) : (
                  <div>
                    {this.props.firstname}

                  </div>
                )
                }
                </Col>
                  <Col sm={2}>
                      {
                          !this.props.isFetching ? (
                              <button className='modify' onClick={this.onFirstnameOpen}>
                                  <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto"/>
                                  <span className='modifyText'>Modifier</span>
                              </button>
                          ) : (<div/>)
                      }
                  </Col>

              </Row>
              <Modal open={this.state.firstnameModal} onClose={this.onFirstnameClose} center>
                <h2 className="title">Changement de prénom :</h2>
                <Col sm={6} className='field'>
                  <h3 className="name">Nouveau prénom :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input' validationState={this.getFirstnameValidationState()}>
                    <FormControl
                      type="text"
                      value={this.state.newFirstname}
                      placeholder="Entrer le nouveau prénom"
                      onChange={this.handleChangeFirstname}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Button bsStyle="primary" onClick={this.checkFirstname} className='validate' bsSize='large'>
                  Valider
                </Button>
              </Modal>
            </div>

            <div>
              <Row className='info'>
                <Col sm={2} className='field'>
                  Nom:
                </Col>
                <Col sm={2}>
                  {this.props.isFetching ? (
                    <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
                  ) : (
                    <div>
                      {this.props.lastname}
                    </div>
                  )
                  }
                </Col>
                  <Col sm={2}>
                      {
                          !this.props.isFetching ? (
                              <button className='modify' onClick={this.onLastnameOpen}>
                                  <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto"/>
                                  <span className='modifyText'>Modifier</span>
                              </button>
                          ) : (<div/>)
                      }
                  </Col>
              </Row>
              <Modal open={this.state.lastnameModal} onClose={this.onLastnameClose} center>
                <h2 className="title">Changement de nom de famille :</h2>
                <Col sm={6} className='field'>
                  <h3 className="name">Nouveau nom de famille :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input' validationState={this.getLastnameValidationState()}>
                    <FormControl
                      type="text"
                      value={this.state.newLastname}
                      placeholder="Entrer le nouveau nom de famille"
                      onChange={this.handleChangeLastname}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Button bsStyle="primary" onClick={this.checkLastname} className='validate' bsSize='large'>
                  Valider
                </Button>
              </Modal>
            </div>

            <div>
              <Row className="info">
                <Col sm={2} className='field'>
                  Adresse mail:
                </Col>
                <Col sm={2}>
                {this.props.isFetching ? (
                  <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
                ) : (
                    <div>
                      {this.props.mail}
                    </div>
                )

                }
                </Col>
                  <Col sm={2}>
                      {
                          !this.props.isFetching ? (
                              <button className='modify' onClick={this.onMailOpen}>
                                  <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto"/>
                                  <span className='modifyText'>Modifier</span>
                              </button>
                          ) : (<div/>)
                      }
                  </Col>
              </Row>
              <Modal open={this.state.mailModal} onClose={this.onMailClose} center>
                <h2 className="title">Changement d'adresse mail :</h2>
                <Col sm={6}>
                  <h3 className="name">Nouvelle adresse mail :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input' validationState={this.getMailValidationState()}>
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
              <Row className="info">
                <Col sm={2} className='field'>
                  Mot de passe:
                </Col>
                <Col sm={2}>
                {this.props.isFetching ? (
                  <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
                ) : (
                  <div>
                    ******
                  </div>
                )
                }
                </Col>
                  <Col sm={2}>
                      {
                          !this.props.isFetching ? (
                              <button className='modify' onClick={this.onPasswordOpen}>
                                  <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto"/>
                                  <span className='modifyText'>Modifier</span>
                              </button>
                          ) : (<div/>)
                      }
                  </Col>
              </Row>

              <Modal open={this.state.passwordModal} onClose={this.onPasswordClose} center>
                <h2 className='title'>Changement de mot de passe :</h2>
                <Col sm={6}>
                  <h3 className="name">Nouveau mot de passe :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input' validationState={this.getPassValidationState()}>
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
                  <FormGroup className='input' validationState={this.getConfirmValidationState()}>
                    <FormControl
                      type="password"
                      value={this.state.newPassword2}
                      placeholder="Confirmation du nouveau mot de passe"
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
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isFetching,
        msg,
        error,
        mail,
        firstname,
        lastname
    } = state.profile;

    return {
        isFetching,
        msg,
        error,
        mail,
        firstname,
        lastname
    }
}

export default connect(mapStateToProps)(Profile);

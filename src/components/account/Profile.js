import React, {Component} from 'react';
import { PageHeader, Jumbotron, Col } from 'react-bootstrap';
import Modal from "react-responsive-modal";
import { FormControl, FormGroup, Button } from "react-bootstrap";
import ReactLoading from 'react-loading';


import '../../css/Profile.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfileIfNeeded, modifyMailIfNeeded, modifyPasswordIfNeeded, modifyUsernameIfNeeded} from "../../actions/actions";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tmpMail: '',
      newPassword1: '',
      newPassword2: '',
      newUsername: '',
      mailModal: false,
      passwordModal: false
    };
  }

  onMailOpen = () => {
    this.setState({ mailModal: true });
  };

  onMailClose = () => {
    this.setState({tmpMail: ''});
    this.setState({ mailModal: false });
  };

  onPasswordOpen = () => {
    this.setState({ passwordModal: true });
  };

  onPasswordClose = () => {
    this.setState({newPassword1: '', newPassword2: ''});
    this.setState({ passwordModal: false });
  };

  onUsernameOpen = () => {
    this.setState({ usernameModal: true });
  };

  onUsernameClose = () => {
    this.setState({newUsername: ''});
    this.setState({ usernameModal: false });
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

  handleChangeUsername = event => {
    this.setState({ newUsername: event.target.value });
  };

  getUsernameValidationState() {
    let username = this.state.newUsername;
    if (username === '') return 'error';
    return 'success';
  }

  getMailValidationState() {
    let email = this.state.tmpMail;
    if (email === '') return null;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getPassValidationState() {
    let password = this.state.newPassword1;
    if (password === '') return null;
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
    if (password === '') return null;
    if (password === this.state.newPassword2) {
      return 'success';
    } else {
      return 'error';
    }
  }

  checkMail = () => {
    if (this.getMailValidationState()) {
      this.props.dispatch(modifyMailIfNeeded(this.props.token, this.state.tmpMail));
      this.setState({mailModal: false });

    }
  };

  componentDidMount(){
    this.props.dispatch(getProfileIfNeeded(this.props.token))
  }

  checkPassword = () => {
    if (this.getPassValidationState())
    {
      this.setState({ passwordModal: false });
      this.props.dispatch(modifyPasswordIfNeeded(this.props.token, this.state.newPassword1));
      this.setState({ newPassword1: '', newPassword2: '' });
    }
  };

  checkUsername = () => {
    if (this.getUsernameValidationState())
    {
      this.setState({ usernameModal: false });
      this.props.dispatch(modifyUsernameIfNeeded(this.props.token, this.state.newUsername));
      this.setState({ newUsername: ''});
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
                Nom
              </Col>
              {this.props.isFetching ? (
                <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
              ) : (
                <Col sm={10}>
                  {this.props.username}
                  <button className='modify' onClick={this.onUsernameOpen}>
                    <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto" />
                    <span className='modifyText'>Modifier</span>
                  </button>
                </Col>
              )
              }

              <Modal open={this.state.usernameModal} onClose={this.onUsernameClose} center>
                <h2 className="title">Changement de nom d'utilisateur :</h2>
                <Col sm={6}>
                  <h3 className="name">Nouveau nom d'utilisateur :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input'>
                    <FormControl
                      type="text"
                      value={this.props.username}
                      placeholder="Entrer le nouveau nom d'utilisateur"
                      onChange={this.handleChangeUsername}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Button bsStyle="primary" onClick={this.checkUsername} className='validate' bsSize='large'>
                  Valider
                </Button>
              </Modal>
            </div>

            <div>
              <Col sm={2}>
                Adresse mail
              </Col>
              {this.props.isFetching ? (
                <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
              ) : (
                <Col sm={10}>
                  ********
                  {this.props.mail}
                  <button className='modify' onClick={this.onMailOpen}>
                    <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto" />
                    <span className='modifyText'>Modifier</span>
                  </button>
                </Col>
              )
              }

              <Modal open={this.state.mailModal} onClose={this.onMailClose} center>
                <h2 className="title">Changement d'adresse mail :</h2>
                <Col sm={6}>
                  <h3 className="name">Nouvelle adresse mail :</h3>
                </Col>
                <Col sm={6}>
                  <FormGroup className='input' validationState={this.getMailValidationState()}>
                    <FormControl
                      type="text"
                      value={this.props.mail}
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
              {this.props.isFetching ? (
                <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
              ) : (
                <Col sm={10}>
                  ********
                  {this.props.mail}
                  <button className='modify' onClick={this.onPasswordOpen}>
                    <img src={require('../../static/pencil.svg')} alt="modify" height="25" width="auto" />
                    <span className='modifyText'>Modifier</span>
                  </button>
                </Col>
              )
              }

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

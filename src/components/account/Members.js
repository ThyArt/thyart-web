import React, { Component } from "react";

import { cloneDeep, findIndex } from "lodash";
import * as Table from "reactabular-table";

import "../../css/Membres.css";
import { Button, Col, FormControl, FormGroup, Row } from "react-bootstrap";
import Modal from "react-responsive-modal";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Switch from "react-switch";
import {getMembersIfNeeded, createMemberIfNeeded, modifyMemberIfNeeded} from "../../actions/actionsMembers";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: this.getColumns(),
      addModal: false,
      removeModal: false,
      newUsername: "",
      newName: "",
      newFamily: "",
      newMail: "",
      newPassword: ""
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getMembersIfNeeded(this.props.token));
  }


  onAddOpen = () => {
    this.setState({ addModal: true });
  };

  onAddClose = () => {
    this.setState({ newName: "", addModal: false });
  };

  onRemoveClose = () => {
    this.setState({ newName: "", removeModal: false });
  };

  handleChangeMail = event => {
    this.setState({ newMail: event.target.value });
  };

  handleChangeUsername = event => {
    this.setState({ newUsername: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ newName: event.target.value });
  };

  handleChangeFamily = event => {
    this.setState({ newFamily: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ newPassword: event.target.value });
  };

  getUsernameValidationState() {
    let name = this.state.newUsername;
    if (name === "") return "error";
    return "success";
  }

  getNameValidationState() {
    let name = this.state.newName;
    if (name === "") return "error";
    return "success";
  }

  getFamilyValidationState() {
    let family = this.state.newFamily;
    if (family === "") return "error";
    return "success";
  }

  getMailValidationState() {
    let email = this.state.newMail;
    if (email === "") return "error";
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return "success";
    } else {
      return "error";
    }
  }

  getPasswordValidationState() {
    let password = this.state.newPassword;
    if (password === "") return "error";
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    let mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (strongRegex.test(password) || mediumRegex.test(password)) {
      return "success";
    } else if (password !== "") {
      return "warning";
    } else {
      return "error";
    }
  }

  onPermissionsChange = (checked, event, id) => {
    if (checked)
      this.props.dispatch(modifyMemberIfNeeded(this.props.token, id, "gallerist"));
    else
      this.props.dispatch(modifyMemberIfNeeded(this.props.token, id, "member"));
  };

  getColumns() {
    return [
      {
        property: "name",
        header: {
          label: "Nom d'utilisateur"
        }
      },
      {
        property: "firstname",
        header: {
          label: "Prénom"
        }
      },
      {
        property: "lastname",
        header: {
          label: "Nom de famille"
        }
      },
      {
        property: "email",
        header: {
          label: "Adresse Mail"
        }
      },
      {
        property: 'role',
        header: {
          label: 'Permissions des membres'
        },
        cell: {
          formatters: [
            (value, { rowData }) => (
                <div>
                  <div>
                    <Row>
                    <Col xs={4}>
                      Membre
                    </Col>
                    <Col xs={4}>
                      <Switch checkedIcon={false} uncheckedIcon={false} checked={(rowData.role === 'gallerist')} onChange={this.onPermissionsChange} id={rowData.id}/>
                    </Col>
                    <Col xs={4}>
                      Galeriste
                    </Col>
                    </Row>
                  </div>
                </div>)]
        }
      },
      {
        props: {
          style: {
            width: 50
          }
        },
        cell: {
          formatters: [
            (value, { rowData }) => (
              <div>
                <div
                  className="remove"
                  onClick={() => this.confirmRemove(rowData.id)} style={{ cursor: "pointer", float: "left" }}
                >
                  <img src={require("../../static/cross.png")} alt="modify" height="30" width="auto"/>
                </div>
              </div>)]
        }
      }
    ];
  }

  render() {
    let rows;
    const columns = this.state.columns;
    if (this.props.members)
      rows = this.props.members;
    else
      rows = [];

    return (
      <div className="clients">
        <Col sm={10}>
          {this.props.add}
          <Button bssize="lg" className='add' id='addMemberButton' onClick={this.onAddOpen}>
            <img src={require("../../static/add.svg")} alt="add" height="25" width="auto" id='addMemberImage'/>
            <span id='addMemberText'>Ajouter</span>
          </Button>
        </Col>

        <Modal open={this.state.addModal} onClose={this.onAddClose} center>
          <Container>
            <Row>
              <h2 className='title'>Ajout d'un membre :</h2>
            </Row>
            <FormGroup as={Row} className='input' validationState={this.getUsernameValidationState()}>
              <FormLabel column lg={3}>
                Nom d'utilisateur :
              </FormLabel>
              <Col>
                <FormControl
                  lg={9}
                  type="username"
                  value={this.props.newUsername}
                  placeholder="Entrer le nom d'utilisateur"
                  onChange={this.handleChangeUsername}
                />
              </Col>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup as={Row} className='input' validationState={this.getFamilyValidationState()}>
              <FormLabel column lg={3}>
                Nom :
              </FormLabel>
              <Col>
                <FormControl
                  lg={9}
                  type="firstname"
                  value={this.props.newFamily}
                  placeholder="Entrer le nom du membre"
                  onChange={this.handleChangeFamily}
                />
              </Col>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup as={Row} className='input' validationState={this.getNameValidationState()}>
              <FormLabel column lg={3}>
                Prénom :
              </FormLabel>
              <Col>
                <FormControl
                  lg={9}
                  type="name"
                  value={this.props.newName}
                  placeholder="Entrer le prénom du membre"
                  onChange={this.handleChangeName}
                />
              </Col>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup as={Row} className='input' validationState={this.getMailValidationState()}>
              <FormLabel column lg={3}>
                Mail :
              </FormLabel>
              <Col>
                <FormControl
                  lg={9}
                  type="mail"
                  value={this.props.newMail}
                  placeholder="Entrer le mail du membre"
                  onChange={this.handleChangeMail}
                />
              </Col>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup as={Row} className='input' validationState={this.getPasswordValidationState()}>
              <FormLabel column lg={3}>
                Mot de passe :
              </FormLabel>
              <Col>
                <FormControl
                  lg={9}
                  type="password"
                  value={this.props.newPassword}
                  placeholder="Entrer le mot de passe"
                  onChange={this.handleChangePassword}
                />
              </Col>
              <FormControl.Feedback/>
            </FormGroup>
            <Row>
              <Button bsstyle="primary" onClick={this.onAdd} className='validate' bssize='large'>
                Valider
              </Button>
            </Row>
          </Container>
        </Modal>

        <Table.Provider
          className="pure-table pure-table-bordered"
          columns={columns}
        >
          <Table.Header/>
          <Table.Body rows={rows} rowKey="id"/>
        </Table.Provider>
      </div>
    );
  }

  onAdd(e) {
    if (this.getNameValidationState() === "success" && this.getMailValidationState() === "success"
      && this.getFamilyValidationState() === "success" && this.getUsernameValidationState() === "success"
      && this.getPasswordValidationState() === "success") {
      e.preventDefault();
      this.props.dispatch(createMemberIfNeeded(this.props.token, this.state.newUsername, this.state.newMail, this.state.newName, this.state.newFamily, this.state.newPassword));
      this.setState({addModal: false });
    }
  }

  confirmRemove(id) {
    this.setState({ idToRemove: id, removeModal: true });
  }

  onRemove() {
    const rows = cloneDeep(this.state.rows);
    const id = this.state.idToRemove;
    const idx = findIndex(rows, { id });

    // this could go through flux etc.
    rows.splice(idx, 1);

    this.setState({ rows, removeModal: false });
  }
}

Members.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  members: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    members,
    dispatch
  } = state.members;

  return {
    isFetching,
    msg,
    error,
    members,
    dispatch
  };
}

export default connect(mapStateToProps)(Members);
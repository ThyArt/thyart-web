import React, {Component} from 'react';

import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import uuid from 'uuid';

import '../../css/Membres.css'
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import Modal from "react-responsive-modal";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";

export class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [], // initial rows
      columns: this.getColumns(), // initial columns
      addModal: false,
      removeModal: false,
      newName: '',
      newFamily: '',
      newMail: '',
      isGalerist: false,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onAddOpen = () => {
    this.setState({ addModal: true });
  };

  onAddClose = () => {
    this.setState({newName: '', addModal: false});
  };


  onRemoveClose = () => {
    this.setState({newName: '', removeModal: false});
  };

  handleChangeMail = event => {
    this.setState({ newMail: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ newName: event.target.value });
  };

  handleChangeFamily = event => {
    this.setState({  newFamily: event.target.value });
  };

  getNameValidationState() {
    let name = this.state.newName;
    if (name === '') return 'error';
    return 'success';
  }

  getFamilyValidationState() {
    let family = this.state.newFamily;
    if (family === '') return 'error';
    return 'success';
  }

  getMailValidationState() {
    let email = this.state.newMail;
    if (email === '') return 'error';
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  onPermissionsChange = event => {
    console.log(event.target.value === 'galeriste');
    this.setState({ isGalerist: (event.target.value === 'galeriste') });
  };

  getColumns() {
    return [
      {
        property: 'name',
        header: {
          label: 'Prénom'
        }
      },
      {
        property: 'family',
        header: {
          label: 'Nom de famille'
        }
      },
      {
        property: 'mail',
        header: {
          label: 'Adresse Mail'
        }
      },
      {
        property: 'permissions',
        header: {
          label: 'Permissions des membres'
        },
        cell: {
          formatters: [
            (value, { rowData }) => (
                <div>
                  <div>
                    <Row>
                    <Col xs={6}>
                      <label>
                        <input type="radio" value="galeriste" checked={this.state.isGalerist} onChange={this.onPermissionsChange}/>
                        Galeriste
                      </label>
                    </Col>
                    <Col xs={6}>
                      <label>
                        <input type="radio" value="membre" checked={!this.state.isGalerist} onChange={this.onPermissionsChange}/>
                        Membre
                      </label>
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
                      onClick={() => this.confirmRemove(rowData.id)} style={{ cursor: 'pointer', float: 'left' }}
                  >
                    <img src={require('../../static/cross.png')} alt="modify" height="30" width="auto" />
                  </div>
                </div>)]
        }
      }
    ];
  }

  render() {
    const { columns, rows } = this.state;

    return (
      <div className="clients">
        <Col sm={10}>
          {this.props.add}
          <Button bssize="lg" className='add' id='addMemberButton' onClick={this.onAddOpen}>
            <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" id='addMemberImage'/>
            <span id='addMemberText'>Ajouter</span>
          </Button>
        </Col>

        <Modal open={this.state.addModal} onClose={this.onAddClose} center>
          <Container>
            <Row>
              <h2 className='title'>Ajout d'un membre :</h2>
            </Row>
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
              <FormControl.Feedback />
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
              <FormControl.Feedback />
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
              <FormControl.Feedback />
            </FormGroup>
            <Row>
              <Button bsstyle="primary" onClick={this.onAdd} className='validate' bssize='large'>
                Valider
              </Button>
            </Row>
          </Container>
        </Modal>

        <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
          <h2 className='title'>Voulez-vous supprimer ce membre?</h2>

          <Button bsstyle="primary" onClick={this.onRemove} className='validate' bssize='large'>
            Supprimer
          </Button>
        </Modal>

        <Table.Provider
          className="pure-table pure-table-bordered"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
  onAdd(e) {
    if (this.getNameValidationState() === 'success' && this.getMailValidationState() === 'success'
      && this.getFamilyValidationState() === 'success') {
      e.preventDefault();

      const rows = cloneDeep(this.state.rows);

      rows.unshift({
        id: uuid.v4(),
        name: this.state.newName,
        family: this.state.newFamily,
        mail: this.state.newMail
      });

      this.setState({rows, addModal: false});
    }
  }

  confirmRemove(id) {
    this.setState({ idToRemove: id , removeModal: true});

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

export default Members;
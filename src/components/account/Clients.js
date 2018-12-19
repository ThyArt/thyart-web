import React, {Component} from 'react';

import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import uuid from 'uuid';

import '../../css/Clients.css'
import ReactLoading from "react-loading";
import {Button, Col, FormControl, FormGroup} from "react-bootstrap";
import Modal from "react-responsive-modal";
import {modifyUsernameIfNeeded} from "../../actions/actions";

class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [], // initial rows
      columns: this.getColumns() // initial columns
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

    onAddOpen = () => {
        this.setState({ addModal: true });
    };

    onAddClose = () => {
        this.setState({newAdd: ''});
        this.setState({ addModal: false });
    };

    checkAdd = () => {

            this.setState({ AddModal: false });

    };

  getColumns() {


    return [
      {
        property: 'name',
        header: {
          label: 'Nom'
        }
      },
      {
        property: 'mail',
        header: {
          label: 'Adresse Mail'
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
                  onClick={() => this.onRemove(rowData.id)} style={{ cursor: 'pointer', float: 'left'}}
                >
                <img src={require('../../static/cross.png')} alt="modify" height="30" width="auto" />
              </div>
                 <div
                   className="modify"
                   onClick={() => this.onModify(rowData.id)} style={{ cursor: 'pointer', float: 'right'}}
                 >
                <img src={require('../../static/pencil.svg')} alt="modify" height="30" width="auto" />
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
        <tbody>
        {this.props.isFetching ? (
            <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
        ) : (
            <Col sm={10}>
                {this.props.add}
                <button className='add' onClick={this.onAddOpen}>
                    <img src={require('../../static/pencil.svg')} alt="add" height="25" width="auto" />
                    <span className='add'>Ajouter</span>
                </button>
            </Col>
        )
        }

        <Modal open={this.state.addModal} onClose={this.onAddClose} center>
            <h2 className='title'>Ajout d'un utilisateur :</h2>
            <Col sm={6}>
                <h3 className="firstname">Nom :</h3>
            </Col>
            <Col sm={6}>
                <FormGroup className='input' >
                    <FormControl
                        type="firstname"
                       // value={}
                        placeholder="Entrer le nom de l'utilisateur"
                        //onChange={}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </Col>
            <Col sm={6}>
                <h3 className="name">Prénom :</h3>
            </Col>
            <Col sm={6}>
                <FormGroup className='input' >
                    <FormControl
                        type="name"
                        //value={}
                        placeholder="Entrer le prénom de l'utilisateur"
                        //onChange={}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </Col>
            <Col sm={6}>
                <h3 className="name">Mail :</h3>
            </Col>
            <Col sm={6}>
                <FormGroup className='input'>
                    <FormControl
                        type="mail"
                        //value={}
                        placeholder="Entrer le mail de l'utilisateur"
                        //onChange={}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </Col>
            <Button bsStyle="primary" onClick={this.onAddClose} className='validate' bsSize='large'>
                Valider
            </Button>
        </Modal>
        </tbody>
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
    e.preventDefault();

    const rows = cloneDeep(this.state.rows);

    rows.unshift({
      id: uuid.v4(),
      name: 'John Doe',
      mail: 'test@test.test'
    });

    this.setState({ rows });
  }
  onRemove(id) {
    const rows = cloneDeep(this.state.rows);
    const idx = findIndex(rows, { id });

    // this could go through flux etc.
    rows.splice(idx, 1);

    this.setState({ rows });
  }
}

export default Clients;
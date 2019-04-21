import React, {Component} from 'react';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import uuid from 'uuid';
import {Button, Col, FormControl, FormGroup} from "react-bootstrap";
import Modal from "react-responsive-modal";
import {Redirect} from 'react-router-dom';

import '../../css/Membres.css';

class Client extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [], // initial rows
            columns: this.getColumns(), // initial columns
            addModal: false,
            detailsModal: false,
            removeModal: false,
            clientRedirect: false,
            newName: '',
            newFamily: '',
            newMail: '',
            newAddress:'',
            newTelephone:'',
            currentClient: []
        };

        this.onAdd = this.onAdd.bind(this);
        this.openDetails = this.openDetails.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onAddOpen = () => {
        this.setState({ addModal: true });
    };

    onAddClose = () => {
        this.setState({ newName: '', addModal: false });
    };

    onRemoveClose = () => {
        this.setState({ newName: '', removeModal: false });
    };

    onDetailsClose = () => {
        this.setState({ detailsModal: false });
    };

    handleChangeMail = event => {
        this.setState({ newMail: event.target.value });
    };

    handleChangeAddress = event => {
        this.setState({ newAddress: event.target.value });
    };

    handleChangeTelephone = event => {
        this.setState({ newTelephone: event.target.value });
    };

    handleChangeName = event => {
        this.setState({ newName: event.target.value });
    };

    handleChangeFamily = event => {
        this.setState({ newFamily: event.target.value });
    };

    getNameValidationState() {
        let name = this.state.newName;
        if (name === '') return 'error';
        return 'success';
    };

    getFamilyValidationState() {
        let family = this.state.newFamily;
        if (family === '') return 'error';
        return 'success';
    };

    getMailValidationState() {
        let email = this.state.newMail;
        if (email === '') return 'error';
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            return 'success';
        } else {
            return 'error';
        }
    };

    getAddressValidationState() {
        let address = this.state.newAddress;
        if (address === '') return 'error';
        let re = /^.+$/;

        if (re.test(address)) {
            return 'success';
        } else {
            return 'error';
        }
    };

    getNumberValidationState() {
        let number = this.state.newTelephone;
        if (number === '') return 'error';
        let re = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

        if (re.test(number)) {
            return 'success';
        } else {
            return 'error';
        }
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
                header: {
                    label: 'Details'
                },
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
                                    className="open"
                                    onClick={() => this.openDetails(rowData)} style={{ cursor: 'pointer', float: 'left'}}
                                >
                                    <img src={require('../../static/external-link.svg')} alt="modify" height="30" width="auto" />
                                </div>
                            </div>)]
                }
            },
            {
                header: {
                    label: 'Supprimer'
                },
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
                                    onClick={() => this.confirmRemove(rowData.id)} style={{ cursor: 'pointer', float: 'left'}}
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
                { this.state.clientRedirect ? <Redirect to={{ pathname: "/client", state: {...this.state.currentClient} }}/> : null }

                <tbody>

                <Col sm={10}>
                    {this.props.add}
                    <button className='add' onClick={this.onAddOpen}>
                        <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" />
                        <span className='add'>Ajouter</span>
                    </button>
                </Col>


                <Modal open={this.state.addModal} onClose={this.onAddClose} center>
                    <h2 className='title'>Ajout d'une facturation :</h2>
                    <Col sm={6}>
                        <h3 className="firstname">Client :</h3>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className='input' validationState={this.getFamilyValidationState()}>
                            <FormControl
                                type="firstname"
                                value={this.props.newFamily}
                                placeholder="Entrer le nom du client"
                                onChange={this.handleChangeFamily}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <h3 className="name">Oeuvre :</h3>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className='input' validationState={this.getNameValidationState()}>
                            <FormControl
                                type="name"
                                value={this.props.newName}
                                placeholder="Entrer le nom de l'oeuvre"
                                onChange={this.handleChangeName}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <h3 className="name">Date :</h3>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className='input' validationState={this.getMailValidationState()}>
                            <FormControl
                                type="mail"
                                value={this.props.newMail}
                                placeholder="Entrer la date du jour"
                                onChange={this.handleChangeMail}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                        <Col sm={6}>
                        <h3 className="name">Adresse :</h3>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className='input' validationState={this.getAddressValidationState()}>
                            <FormControl
                                type="adresse"
                                value={this.props.newAddress}
                                placeholder="Entrer l'adresse du client"
                                onChange={this.handleChangeAddress}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <h3 className="name">Téléphone :</h3>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className='input' validationState={this.getNumberValidationState()}>
                            <FormControl
                                type="Phone number"
                                value={this.props.newTelephone}
                                placeholder="Entrer le numéro du client"
                                onChange={this.handleChangeTelephone}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Button bsStyle="primary" onClick={this.onAdd} className='validate' bsSize='large'>
                        Valider
                    </Button>
                </Modal>

                <Modal open={this.state.detailsModal} onClose={this.onDetailsClose} center>
                    <h2 className='title'>Détails du client</h2>
                    <Col sm={6} className="name">Nom :</Col>
                    <Col sm={6} className="name">{this.state.currentClient['family']}</Col>
                    <Col sm={6} className="name">Prénom :</Col>
                    <Col sm={6} className="name">{this.state.currentClient['name']}</Col>
                    <Col sm={6} className="name">Mail :</Col>
                    <Col sm={6} className="name">{this.state.currentClient['mail']}</Col>
                    <Col sm={6} className="name">Adresse :</Col>
                    <Col sm={6} className="name">{this.state.currentClient['address']}</Col>
                    <Col sm={6} className="name">Téléphone :</Col>
                    <Col sm={6} className="name">{this.state.currentClient['number']}</Col>
                    <Button bsStyle="primary" className='validate' bsSize='large' onClick={this.openInTab}>
                        Plus de détails
                    </Button>
                </Modal>

                <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
                    <h2 className='title'>Voulez-vous supprimer ce client?</h2>

                    <Button bsStyle="primary" onClick={this.onRemove} className='validate' bsSize='large'>
                        Supprimer
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
        if (this.getNameValidationState() === 'success' && this.getMailValidationState() === 'success'
            && this.getFamilyValidationState() === 'success' && this.getNumberValidationState() === 'success') {
            e.preventDefault();

            const rows = cloneDeep(this.state.rows);

            rows.unshift({
                id: uuid.v4(),
                name: this.state.newName,
                family: this.state.newFamily,
                mail: this.state.newMail,
                address: this.state.newAddress,
                number: this.state.newTelephone
            });

            this.setState({ rows, addModal: false, newName: '', newFamily: '', newMail: '', newAddress:'', newTelephone:'' });
        }
    };

    openDetails(rowData) {
        this.setState({ detailsModal: true, currentClient: rowData });
    };

    openInTab = () => {
        this.setState({ clientRedirect: true });
    };

    confirmRemove(id) {
        this.setState({ idToRemove: id , removeModal: true});
    };

    onRemove() {
        const rows = cloneDeep(this.state.rows);
        const id = this.state.idToRemove;
        const idx = findIndex(rows, { id });

        // this could go through flux etc.
        rows.splice(idx, 1);

        this.setState({ rows, removeModal: false });
    };
}

export default Client;
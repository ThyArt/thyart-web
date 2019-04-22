import React, {Component} from 'react';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import {Button, Col} from "react-bootstrap";
import Modal from "react-responsive-modal";
import {Redirect} from 'react-router-dom';

import '../../css/Membres.css';

class Billings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [], // initial rows
            columns: this.getColumns(), // initial columns
            removeModal: false,
            detailsRedirect: false,
            infos: false,
            currentClient: []
        };

        this.openNewBilling = this.openNewBilling.bind(this);
        this.openDetails = this.openDetails.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onRemoveClose = () => {
        this.setState({ newName: '', removeModal: false });
    };

    openDetails(rowData) {
        this.setState({ infos: rowData, detailsRedirect: true });
    };

    openNewBilling() {
        this.setState({ infos: false, detailsRedirect: true });
    }

    confirmRemove(id) {
        this.setState({ idToRemove: id , removeModal: true});
    };

    onRemove() {
        const rows = cloneDeep(this.state.rows);
        const id = this.state.idToRemove;
        const idx = findIndex(rows, { id });

        rows.splice(idx, 1);

        this.setState({ rows, removeModal: false });
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
                <tbody>

                { this.state.detailsRedirect ? <Redirect to={{ pathname: "/billing", state: { infos: this.state.infos} }}/> : null }

                <Col sm={10}>
                    {this.props.add}
                    <button className='add' onClick={this.openNewBilling}>
                        <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" />
                        <span className='add'>Ajouter</span>
                    </button>
                </Col>

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

}

export default Billings;
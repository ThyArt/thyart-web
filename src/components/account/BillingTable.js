import React, {Component} from 'react';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import {Button, Col} from "react-bootstrap";
import Modal from "react-responsive-modal";
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import '../../css/Membres.css';
import { deleteBilling, getArtWorksIfNeeded, setCurrentBilling } from "../../actions/actions";
import PropTypes from "prop-types";
import uuid from "uuid";

class BillingTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: this.getColumns(),
            removeModal: false,
            infos: {},
            rows: [],
            currentBilling: null,
        };

        this.openDetails = this.openDetails.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount(){

    }

    onRemoveClose = () => {
        this.setState({ newName: '', removeModal: false });
    };

    openDetails(rowData) {
        this.props.dispatch(setCurrentBilling(rowData.id));
        this.props.onClick();
    };


    confirmRemove(id) {
        this.setState({ idToRemove: id , removeModal: true});
    };

    onRemove() {
        this.setState({removeModal: false});
       this.props.dispatch(deleteBilling(this.state.idToRemove));
    };

    getColumns() {
        return [
            {
                property: 'name',
                header: {
                    label: 'Client'
                }
            },
            {
                property: 'name',
                header: {
                    label: 'Nom de l\'oeuvre'
                }
            },
            {
                property: 'mail',
                header: {
                    label: 'Mail du client'
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


        const columns = this.state.columns;
        const rows = this.props.billingTable;

        return (
            <div className="clients">
                <tbody>


                <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
                    <h2 className='title'>Voulez-vous supprimer cette facture?</h2>

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

BillingTable.propTypes = {
    billingTable: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        billingTable
    } = state;

    return {
        billingTable
    }
}

export default connect(
  mapStateToProps
)(BillingTable)
import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import { Button, DropdownButton, FormControl, FormGroup, Glyphicon, MenuItem } from "react-bootstrap";
import Modal from "react-responsive-modal";
import { connect } from 'react-redux';

import '../../css/Membres.css';
import { deleteBilling, setCurrentBilling, sortBillings } from "../../actions/actionsBillings";
import PropTypes from "prop-types";

class ClientTable extends Component {
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

    handleFilters = eventKey => {
        const filters = {
            '1': 'nameA',
            '2': 'nameZ',
            '3': 'artworkA',
            '4': 'artworkZ',
            '5': 'dateNew',
            '6': 'dateOld'
        };
        this.props.dispatch(sortBillings(filters[eventKey.toString()]));
    };

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

    formatDate = value => {
        const date = new Date(value);
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
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
                property: 'artworkName',
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
                property: 'date',
                header: {
                    label: 'Date de facturation'
                },
                cell: {
                    formatters: [
                        (value) => (<span>{ this.formatDate(value) }</span>)
                    ]
                }
            },
            {
                property: 'details',
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
        let rows;
        const columns = this.state.columns;
        if (this.props.billingTable)
            rows = this.props.billingTable;
        else
            rows = [];


        return (
          <div className="clients">
              <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
                  <h2 className='title'>Voulez-vous supprimer cette facture?</h2>

                  <Button bsStyle="primary" onClick={this.onRemove} className='validate' bsSize='large'>
                      Supprimer
                  </Button>
              </Modal>

              <FormGroup>

                  <FormControl type='text' value={this.state.search} onChange={this.onSearchChange}
                               placeholder='Enter text to search...' id='billingSearchBar'
                  />

                  <Button bsStyle='primary' bsSize='large' onClick={this.searchBillings}>Search</Button>

                  <DropdownButton bsSize='large' className='billingFilters'
                                  title={<span><Glyphicon glyph='glyphicon glyphicon-filter'/></span>}
                  >
                      <MenuItem eventKey={1} onSelect={this.handleFilters}>Clients A-Z</MenuItem>
                      <MenuItem eventKey={2} onSelect={this.handleFilters}>Clients Z-A</MenuItem>
                      <MenuItem eventKey={3} onSelect={this.handleFilters}>Oeuvres A-Z</MenuItem>
                      <MenuItem eventKey={4} onSelect={this.handleFilters}>Oeuvres Z-A</MenuItem>
                      <MenuItem eventKey={5} onSelect={this.handleFilters}>Date récents</MenuItem>
                      <MenuItem eventKey={6} onSelect={this.handleFilters}>Date anciens</MenuItem>
                  </DropdownButton>
              </FormGroup>

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

ClientTable.propTypes = {
    billings: PropTypes.array,
    billingTable: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        billings,
        billingTable
    } = state.billings;

    return {
        billings,
        billingTable
    }
}

export default connect(
  mapStateToProps
)(ClientTable)
import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import { Button, DropdownButton, FormControl, FormGroup, Glyphicon, MenuItem } from "react-bootstrap";
import Modal from "react-responsive-modal";
import { connect } from 'react-redux';

import '../../css/Membres.css';
import PropTypes from "prop-types";
import {
  eraseCustomerIfNeeded,
  getCustomerIfNeeded,
  getCustomersIfNeeded,
  sortCustomers
} from "../../actions/actionsCustomers";

class ClientTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      removeModal: false,
      infos: {},
      rows: [],
    };

    this.openDetails = this.openDetails.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount(){

  }

  handleFilters = eventKey => {
    const filters = {
      '1': 'firstNameA',
      '2': 'firstNameZ',
      '3': 'lastNameA',
      '4': 'lastNameZ',
      '5': 'mailA',
      '6': 'mailZ'
    };
    this.props.dispatch(this.props.dispatch(sortCustomers(filters[eventKey.toString()])));
  };

  onSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  searchClients = () => {
    this.props.dispatch(getCustomersIfNeeded(this.props.token, this.state.search))
  };

  onRemoveClose = () => {
    this.setState({ newName: '', removeModal: false });
  };

  openDetails(rowData) {
    this.props.dispatch(getCustomerIfNeeded(this.props.token, rowData.id));
  };

  confirmRemove(id) {
    this.setState({ idToRemove: id , removeModal: true});
  };

  onRemove() {
    this.setState({removeModal: false});
    this.props.dispatch(eraseCustomerIfNeeded(this.props.token, this.state.idToRemove));
  };

  getColumns() {
    return [
      {
        property: 'last_name',
        header: {
          label: 'Nom'
        }
      },
      {
        property: 'first_name',
        header: {
          label: 'Prénom'
        }
      },
      {
        property: 'email',
        header: {
          label: 'Mail du client'
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
    if (this.props.customers)
      rows = this.props.customers;
    else
      rows = [];


    return (
      <div className="clients">
        <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
          <h2 className='title'>Voulez-vous retirer ce client?</h2>

          <Button bsStyle="primary" onClick={this.onRemove} className='validate' bsSize='large'>
            Supprimer
          </Button>
        </Modal>

        <FormGroup>

          <FormControl type='text' value={this.state.search} onChange={this.onSearchChange}
                       placeholder='Entrer le texte à rechercher...' id='billingSearchBar'
          />

          <Button bsStyle='primary' bsSize='large' onClick={this.searchClients}>Rechercher</Button>

          <DropdownButton bsSize='large' className='clientFilters'
                          title={<span><Glyphicon glyph='glyphicon glyphicon-filter'/></span>}
          >
            <MenuItem eventKey={1} onSelect={this.handleFilters}>Noms A-Z</MenuItem>
            <MenuItem eventKey={2} onSelect={this.handleFilters}>Noms Z-A</MenuItem>
            <MenuItem eventKey={3} onSelect={this.handleFilters}>Prénom A-Z</MenuItem>
            <MenuItem eventKey={4} onSelect={this.handleFilters}>Prénom Z-A</MenuItem>
            <MenuItem eventKey={5} onSelect={this.handleFilters}>Mail A-Z</MenuItem>
            <MenuItem eventKey={6} onSelect={this.handleFilters}>Mail Z-A</MenuItem>
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
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  customers: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    modif,
    table,
    customers,
    dispatch
  } = state.customers;

  return {
    isFetching,
    msg,
    error,
    modif,
    table,
    customers,
    dispatch
  }
}

export default connect(
  mapStateToProps
)(ClientTable)
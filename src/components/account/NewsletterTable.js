import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import { Button, Col, DropdownButton, FormControl, DropdownItem, Row } from "react-bootstrap";
import Modal from "react-responsive-modal";
import { connect } from 'react-redux';

import '../../css/Membres.css';
import '../../css/Newsletter.css';

import {
  eraseBillingIfNeeded,
  getBillingIfNeeded,
  sortBillings
} from "../../actions/actionsBillings";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";


class NewsletterTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      removeModal: false,
      infos: {},
      rows: [],
      search: ''
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
    this.props.dispatch(this.props.dispatch(sortBillings(filters[eventKey.toString()])));
  };

  onSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  searchBillings = () => {
  };

  onRemoveClose = () => {
    this.setState({ newName: '', removeModal: false });
  };

  openDetails(rowData) {
    this.props.dispatch(getBillingIfNeeded(this.props.token, rowData.id));
  };


  confirmRemove(id) {
    this.setState({ idToRemove: id , removeModal: true});
  };

  onRemove() {
    this.setState({removeModal: false});
    this.props.dispatch(eraseBillingIfNeeded(this.props.token, this.state.idToRemove));
  };

  formatDate = value => {
    const date = new Date(value);
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
  };

  getColumns() {
    return [

      {
        property: 'date',
        header: {
          label: 'Date de la newsletter'
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
    
    ];
  }

  render() {
    let rows;
    const columns = this.state.columns;
    if (this.props.billings)
      rows = this.props.billings;
    else
      rows = [];

    return (
      <div className="clients">
        <Modal open={this.state.removeModal} onClose={this.onRemoveClose} center>
          <h2 className='title'>Voulez-vous supprimer cette facture?</h2>

          <Button bsstyle="primary" onClick={this.onRemove} className='validate' bssize='large'>
            Supprimer
          </Button>
        </Modal>
        <InputGroup className="mb-3">
          <FormControl
              type={'text'}
              value={this.state.search}
              onChange={this.onSearchChange}
              placeholder='Entrer le texte à rechercher...'
              id='newsletterSearchBar'
          />
          <InputGroup.Append>
            <Button id={'buttonRechercher'}
                    variant="outline-primary"
                    bsstyle='primary'
                    bssize='large' onClick={this.searchBillings}>Rechercher</Button>
            <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                bssize='large'
                id='buttonFilter' title={'Filtres'}>
              <DropdownItem eventKey={1} onSelect={this.handleFilters}>Clients A-Z</DropdownItem>
              <DropdownItem eventKey={2} onSelect={this.handleFilters}>Clients Z-A</DropdownItem>
              <DropdownItem eventKey={3} onSelect={this.handleFilters}>Oeuvres A-Z</DropdownItem>
              <DropdownItem eventKey={4} onSelect={this.handleFilters}>Oeuvres Z-A</DropdownItem>
              <DropdownItem eventKey={5} onSelect={this.handleFilters}>Date récents</DropdownItem>
              <DropdownItem eventKey={6} onSelect={this.handleFilters}>Date anciens</DropdownItem>
            </DropdownButton>
          </InputGroup.Append>
        </InputGroup>

          <Container fluid>
            <Row>
              <Col id={'colContainerTable'}>
                <Table.Provider className="pure-table pure-table-bordered" columns={columns}>
                  <Table.Header />
                  <Table.Body rows={rows} rowKey="id" />
                </Table.Provider>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

}

NewsletterTable.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  billings: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    modif,
    table,
    billings,
    dispatch
  } = state.billings;

  return {
    isFetching,
    msg,
    error,
    modif,
    table,
    billings,
    dispatch
  }
}

export default connect(
    mapStateToProps
)(NewsletterTable)
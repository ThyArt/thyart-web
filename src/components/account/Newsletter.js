import React, {Component} from 'react';

import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import uuid from 'uuid';

import '../../css/Membres.css'
import {Button, Col} from "react-bootstrap";


export class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [], // initial rows
      columns: this.getColumns(), // initial columns
      addModal: false,
      removeModal: false,
      date: '',
    };

  }

  onAddOpen = () => {
    this.setState({ addModal: true });
  };

  onAddClose = () => {
    this.setState({newName: '', addModal: false});
  };


  getColumns() {
    return [
      {
        property: 'date',
        header: {
          label: 'Date'
        }
      },
      {
        property: 'detail',
        header: {
          label: 'Détails'
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
                      className="detail"
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
          <Button bssize="lg" className='add' id='addNewsletterButton' onClick={this.onAddOpen}>
            <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" id='addMemberImage'/>
            <span id='addMemberText'>Nouvelle</span>
          </Button>
        </Col>




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

export default Newsletter;
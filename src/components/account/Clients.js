import React, {Component} from 'react';

import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import uuid from 'uuid';

import '../../css/Clients.css'

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
        <tr>
          <td><button type="button" className="pure-button" onClick={this.onAdd}>Ajouter un nouveau client</button></td>
        </tr>
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
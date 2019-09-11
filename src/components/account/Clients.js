import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

import "../../css/Membres.css";
import "../../css/Billing.css";

import ClientTable from "./ClientTable";
import Client from "./Client";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { getCustomersIfNeeded, openCreateCustomer } from "../../actions/actionsCustomers";

class Clients extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getCustomersIfNeeded(this.props.token));
  }

  onCreate = () => {
    this.props.dispatch(openCreateCustomer());
  };

  onReturn = () => {
    this.props.dispatch(getCustomersIfNeeded(this.props.token));
  };

  render() {
    return (
      <div>
        {
          this.props.isFetching ? (
            <ReactLoading type={"spin"} color={"black"} height={50} width={50}/>
          ) : (
            <Col sm={10}>
              {this.props.table ?
                <div>
                  <Button bssize="lg" className='clientMainButton' onClick={this.onCreate}>
                    <img src={require("../../static/add.svg")} alt="add" height="25" width="auto"
                         className='clientAddImage'/>
                    <span className='clientAddButton'>Ajouter</span>
                  </Button>
                  <ClientTable token={this.props.token}/>
                </div>
                :
                <div>
                  <Button bssize="lg" onClick={this.onReturn} className='clientMainButton'>
                    <span className='add'>Retour</span>
                  </Button>
                  <Client token={this.props.token}/>
                </div>
              }
            </Col>
          )
        }
      </div>
    );
  }
}

Clients.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    modif,
    table,
    dispatch
  } = state.customers;

  return {
    isFetching,
    msg,
    error,
    modif,
    table,
    dispatch
  };
}

export default connect(mapStateToProps)(Clients);
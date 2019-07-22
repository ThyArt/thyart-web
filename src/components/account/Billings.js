import React, {Component} from 'react';
import { Button, Col } from "react-bootstrap";

import '../../css/Membres.css';
import '../../css/Billing.css';
import BillingTable from "./BillingTable";
import Billing from "./Billing";
 import { getBillingsIfNeeded, openCreateBilling } from "../../actions/actionsBillings";
import ReactLoading from "./Clients";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNotificationError, createNotificationSuccess } from "../../containers/Account";
import { getArtworkByStateIfNeeded } from "../../actions/actionsArtwork";
import { getCustomersIfNeeded } from "../../actions/actionsCustomers";

class Billings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(getBillingsIfNeeded(this.props.token));
  }

  onCreate = () => {
    this.props.dispatch(openCreateBilling());
    this.props.dispatch(getArtworkByStateIfNeeded(this.props.token, 'exposed'));
    this.props.dispatch(getCustomersIfNeeded(this.props.token));
  };

  onReturn = () => {
    this.props.dispatch(getBillingsIfNeeded(this.props.token));
  };


  render() {
    return (
      <div>
        {
          this.props.isFetching ? (
            <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
          ) : (
            <Col sm={10}>
              {this.props.table ?
                <div>
                  <Button bssize="lg" className='clientMainButton' onClick={this.onCreate}>
                    <img src={require('../../static/add.svg')} alt="add" height="25" width="auto"
                         className='clientAddImage'/>
                    <span className='clientAddButton'>Ajouter</span>
                  </Button>
                  <BillingTable token={this.props.token}/>
                </div>
                :
                <div>
                  <Button bssize="lg" onClick={this.onReturn} className='billingMainButton'>
                    <span className='add'>Retour</span>
                  </Button>
                  <Billing token={this.props.token}/>
                </div>
              }
            </Col>
          )
        }
      </div>
    );
  }
}

Billings.propTypes = {
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
  } = state.billings;


  return {
    isFetching,
    msg,
    error,
    modif,
    table,
    dispatch
  }
}

export default connect(mapStateToProps)(Billings)
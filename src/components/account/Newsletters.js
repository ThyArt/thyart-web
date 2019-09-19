import React, {Component} from 'react';
import { Button, Col } from "react-bootstrap";

import '../../css/Membres.css';
import '../../css/Newsletter.css';
import NewsletterTable from "./NewsletterTable";
import Newsletter from "./Newsletter";
import ReactLoading from "./Clients";
import {getNewslettersIfNeeded, openCreateNewsletter} from "../../actions/actionsNewsletters";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomersIfNeeded } from "../../actions/actionsCustomers";

class Newsletters extends Component {
  /*constructor(props) {
      super(props);
    }*/

  componentDidMount(){
    this.props.dispatch(getNewslettersIfNeeded(this.props.token));
  }

  onCreate = () => {
    this.props.dispatch(openCreateNewsletter());
    this.props.dispatch(getCustomersIfNeeded(this.props.token));


  };

  onReturn = () => {
    this.props.dispatch(getNewslettersIfNeeded(this.props.token));
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
                        <NewsletterTable token={this.props.token}/>
                      </div>
                      :
                      <div>
                        <Button bssize="lg" onClick={this.onReturn} className='newsletterMainButton'>
                          <span className='add'>Retour</span>
                        </Button>
                        <Newsletter token={this.props.token}/>
                      </div>
                  }
                </Col>
            )
          }
        </div>
    );
  }
}

Newsletters.propTypes = {
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
  } = state.newsletters;


  return {
    isFetching,
    msg,
    error,
    modif,
    table,
    dispatch
  }
}

export default connect(mapStateToProps)(Newsletters)
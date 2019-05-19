import React, {Component} from 'react';
import { Button, Col } from "react-bootstrap";

import '../../css/Membres.css';
import '../../css/Billing.css';
import BillingTable from "./BillingTable";
import Billing from "./Billing";

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: true,
      modif: true,
      search: ''
    };

    this.onSwitch = this.onSwitch.bind(this);
  }

  onSwitch = () => {
    if (this.state.table)
      this.setState({ modif: true, table: false });
    else
      this.setState({ modif: true, table: true });
  };

  onSwitchNew = () => {
    if (this.state.table)
      this.setState({modif: false, table: false, });
    else
      this.setState({modif: false, table: true });
  };


  onSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  searchBillings = () => {
    console.log('Performing research with parameter: ' + this.state.search);
  };

  render() {
    return (
      <Col sm={10}>
        {this.state.table ?
          <div>
            <Button bsSize="lg" className='billingMainButton' onClick={this.onSwitch}>
              <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" className='billingAddBillImage'/>
              <span className='billingAddBillButton'>Ajouter</span>
            </Button>
            <BillingTable onClick={this.onSwitchNew}/>
          </div>
          :
          <div>
            <Button  bsSize="lg" onClick={this.onSwitch} className='billingMainButton'>
              <span className='add'>Retour</span>
            </Button>
            <Billing  modif={this.state.modif}  onClick={this.onSwitch}/>
          </div>
        }
      </Col>
    );
  }
}

export default Clients;
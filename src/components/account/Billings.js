import React, {Component} from 'react';
import { Button, Col } from "react-bootstrap";

import '../../css/Membres.css';
import '../../css/Billing.css';
import BillingTable from "./BillingTable";
import Billing from "./Billing";

class Billings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: true,
      modif: true,
      search: ''
    };
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

  render() {
    return (
      <Col sm={10}>
        {this.state.table ?
          <div>
            <Button bssize="lg" className='clientMainButton' onClick={this.onSwitch}>
              <img src={require('../../static/add.svg')} alt="add" height="25" width="auto" className='clientAddImage'/>
              <span className='clientAddButton'>Ajouter</span>
            </Button>
            <BillingTable onClick={this.onSwitchNew}/>
          </div>
          :
          <div>
            <Button  bssize="lg" onClick={this.onSwitch} className='billingMainButton'>
              <span className='add'>Retour</span>
            </Button>
            <Billing  modif={this.state.modif}  onClick={this.onSwitch}/>
          </div>
        }
      </Col>
    );
  }
}

export default Billings;
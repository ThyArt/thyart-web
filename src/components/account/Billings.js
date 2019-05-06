import React, {Component} from 'react';
import { Col } from "react-bootstrap";

import '../../css/Membres.css';
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
                        <button className='add' onClick={this.onSwitch}>
                            <img src={require('../../static/add.svg')} alt="add" height="25" width="auto"/>
                            <span className='add'>Ajouter</span>
                        </button>
                        <BillingTable onClick={this.onSwitchNew}/>
                    </div>
                    :
                    <div>
                        <button onClick={this.onSwitch}>
                            <span className='add'>Retour</span>
                        </button>
                        <Billing  modif={this.state.modif}  onClick={this.onSwitch}/>
                    </div>
                  }
              </Col>
        );

    }
}

export default Billings;
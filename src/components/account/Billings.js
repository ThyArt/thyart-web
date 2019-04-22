import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import {Button, Col} from "react-bootstrap";
import Modal from "react-responsive-modal";
import {Redirect} from 'react-router-dom';

import '../../css/Membres.css';
import { deleteBilling, getArtWorksIfNeeded } from "../../actions/actions";
import PropTypes from "prop-types";
import BillingTable from "./BillingTable";
import Billing from "./Billing";

class Billings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: true
        };

        this.onSwitch = this.onSwitch.bind(this);
    }

    onSwitch = () => {
        if (this.state.table)
            this.setState({ table: false });
        else
            this.setState({ table: true });
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
                    <BillingTable onClick={this.onSwitch}/>
                </div>
                :
                <div>
                    <button onClick={this.onSwitch}>
                        <span className='add'>Retour</span>
                    </button>
                    <Billing modif={true} onClick={this.onSwitch}/>
                </div>
              }

          </Col>
        );

    }
}

export default Billings;
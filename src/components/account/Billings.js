import React, {Component} from 'react';
import { Button, Col, DropdownButton, Form, FormControl, FormGroup, Glyphicon, MenuItem } from "react-bootstrap";

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

    handleFilters = eventKey => {
        const filters = {
          '1': 'nameA',
          '2': 'nameZ',
          '3': 'artworkA',
          '4': 'artworkZ',
          '5': 'dateNew',
          '6': 'dateOld'
        };
        // this.props.dispatch(sortBillings(filters[eventKey.toString()]));
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
                    <FormGroup>
                        <button className='add' onClick={this.onSwitch}>
                            <img src={require('../../static/add.svg')} alt="add" height="25" width="auto"/>
                            <span className='add'>Ajouter</span>
                        </button>

                        <FormControl type='text' value={this.state.search} onChange={this.onSearchChange}
                                     placeholder='Enter text to search...' id='billingSearchBar'
                        />

                        <Button bsStyle='primary' bsSize='large' onClick={this.searchBillings}>Search</Button>

                        <DropdownButton bsSize='large' className='billingFilters'
                                        title={<span><Glyphicon glyph='glyphicon glyphicon-filter'/></span>}
                        >
                            <MenuItem eventKey={1} onSelect={this.handleFilters}>Clients A-Z</MenuItem>
                            <MenuItem eventKey={2} onSelect={this.handleFilters}>Clients Z-A</MenuItem>
                            <MenuItem eventKey={3} onSelect={this.handleFilters}>Oeuvres A-Z</MenuItem>
                            <MenuItem eventKey={4} onSelect={this.handleFilters}>Oeuvres Z-A</MenuItem>
                            <MenuItem eventKey={5} onSelect={this.handleFilters}>Date récents</MenuItem>
                            <MenuItem eventKey={6} onSelect={this.handleFilters}>Date anciens</MenuItem>
                        </DropdownButton>
                    </FormGroup>

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
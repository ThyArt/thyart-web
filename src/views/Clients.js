import React, { useState, useEffect } from 'react';
import { GetCustomers as CustomerRequest } from 'http/Customer';
import GridContainer from 'components/Grid/GridContainer';
import Paper from "@material-ui/core/Paper";
import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";
import { map } from "lodash";

import ClientDetails from "./ClientDetails";
import Cookies from 'universal-cookie';

export default function Clients() {
    const cookie = new Cookies();
    var token = cookie.get('accessToken');
    const [{ data, error }, execute] = CustomerRequest.hook();
    const [table, setTable] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(0);
    const [rowsName, setRowsName] = useState([]);
    const [rowsKey, setRowsKey] = useState([]);
    
    if (data) {
        // console.log(data);
        //setClients(data);
    }

    useEffect(() => {
        setRowsName([
            'Email',
            'Prénom',
            'Nom de famille'
        ]);
        setRowsKey([
            'email',
            'first_name',
            'last_name'
        ]);
        setClients([{
            id: 1,
            email: 'test@test.test',
            phone:'0663422073',
            first_name: 'teste',
            last_name: 'test',
            country: 'test',
            city: 'test',
            address: 'test'
        }]);
        CustomerRequest.execute(execute, token);
    }, []);

    var content;

    if (table) {
        content = <div>
            <Button type="button" color="primary" onClick={() => {
                    setTable(false);
                    setIsNew(true);
                }}
            >
                Créer un client
            </Button>
            <Table  header={rowsName} rows={clients} keys={rowsKey} onRowClick={(id) => {
                setSelected(id);
                setIsNew(false);
                setTable(false);    
            }}/>
        </div>
    }
    else
        content = <ClientDetails isNew={isNew} clientId={selected} returnFunction={() => { setTable(true); }} />

    return (
        <div>
            <GridContainer>
                {content}
            </GridContainer>
       </div>
    );
}
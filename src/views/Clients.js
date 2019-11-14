import React, { useState, useEffect } from 'react';
import { GetCustomers as CustomerRequest } from 'http/Customer';
import GridContainer from 'components/Grid/GridContainer';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "components/CustomButtons/Button";
import { map } from "lodash";

import ClientDetails from "./ClientDetails";
import Cookies from 'universal-cookie';

export default function Clients() {
    const cookie = new Cookies();
    var token = cookie.get('accessToken');
    var [{ data, error }, execute] = CustomerRequest.hook();
    const [table, setTable] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [rowsName, setRowsName] = useState([]);
    const [rowsKey, setRowsKey] = useState([]);
    const [receivedData, setReceivedData] = useState(false);
    const [key, setKey] = useState(Math.random());

    // console.log(token)
    var content;

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

            CustomerRequest.execute(execute, token.access_token);
    }, []);
    
    useEffect(() => {
        if (data)
            setClients(data.data);
        setKey(Math.random());
    }, [data]);

    if (table) {
        content = <div>
            <Button type="button" color="primary" onClick={() => {
                setTable(false);
                setIsNew(true);
                setSelected(-1);
            }}
            >
                Créer un client
            </Button>
            <Table header={rowsName} rows={clients} key={key} keys={rowsKey} onRowClick={(id) => {
                setSelected(id);
                setIsNew(false);
                setTable(false);    
            }}/>
        </div>
    }
    else
        content = <ClientDetails isNew={isNew} clientId={selected} returnFunction={() => {
                CustomerRequest.execute(execute, token.access_token);
                setTable(true);
                setReceivedData(false);
                }
            } 
        />

    return (
        <div>
            <GridContainer>
                {content}
            </GridContainer>
        </div>
    );
}
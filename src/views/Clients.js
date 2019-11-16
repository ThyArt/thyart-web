import React, { useState, useEffect } from 'react';
import { GetCustomers as CustomerRequest } from 'http/Customer';
import { DeleteCustomer } from 'http/Customer';
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
    const [table, setTable] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [rowsName] = useState([
        'Email',
        'Prénom',
        'Nom de famille'
    ]);
    const [rowsKey, setRowsKey] = useState([
        'email',
        'first_name',
        'last_name'
    ]);
    const [key, setKey] = useState(Math.random());
    var [{ data, loading }, refresh] = CustomerRequest(token.access_token);
    var dataRequest = data;
    var [{ response }, execute] = DeleteCustomer.hook(token.access_token);
    var responseDelete = response;

    var content;
    
    useEffect(() => {
        refresh(token.access_token);
    }, []);

    useEffect(() => {

        if (dataRequest)
        {
            setClients(dataRequest.data);
        }
        setKey(Math.random());
    }, [dataRequest]);
    
    useEffect(() => {
        if (responseDelete)
        {
            refresh(token.access_token);
        }
    }, [responseDelete]);
    
    if (table && loading === false) {
        content = <div>
            <Button type="button" color="primary" onClick={() => {
                setTable(false);
                setIsNew(true);
                setSelected(-1);
            }}
            >
                Créer un client
            </Button>
            <Table header={rowsName} rows={clients} key={key} keys={rowsKey} onDeleteClick={(id) => {
                DeleteCustomer.execute(execute, id);
            }}
            onRowClick={(id) => {
                setSelected(id);
                setIsNew(false);
                setTable(false);    
            }}/>
        </div>
    }
    else if (loading === false)
        content = <ClientDetails isNew={isNew} clientId={selected} returnFunction={() => {
                refresh(token.access_token);
                setTable(true);
                }
            } 
        />
    else
        content = <div></div>

    return (
        <div>
            <GridContainer>
                {content}
            </GridContainer>
        </div>
    );
}
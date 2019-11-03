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
    const [{ data, error }, execute] = CustomerRequest.hook();
    const [table, setTable] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(0);
    const [rowsName, setRowsName] = useState([
        { key: 'email', name: 'Email' },
        { key: 'first_name', name: 'Prénom' },
        { key: 'last_name', name: 'Nom de famille' }
    ]);

    if (data) {
        console.log(data);
        setClients(data);
    }

    useEffect(() => { CustomerRequest.execute(execute, token) }, []);

    var content;

    if (table) {
        content =
            <Paper>
                <Button type="button" color="primary" onClick={() => {
                    setTable(false);
                    setIsNew(true);
                }}
                >
                    Créer un client
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            {map(rowsName, (name, index) => (
                                <TableCell key={index} align="right">
                                    {name.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {map(clients, (row) => (
                            <TableRow key={row.id}>
                                {map(rowsName, (name, index) => (
                                    <TableCell
                                        key={index}
                                        align="right"
                                        onClick={() => {
                                            setSelected(row.id);
                                            setIsNew(false);
                                            setTable(false);
                                        }
                                        }>
                                        {row[name.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
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
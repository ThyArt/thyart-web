import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button";
import ClientForm from "./ClientForm";
import { GetCustomer as CustomerRequest } from 'http/Customer';
import Cookies from 'universal-cookie';
import { map } from 'lodash';

function clientInfos(fields, client) {
    return (
        <Grid container>
            <Grid item>
                <List >
                    {
                        map(fields, field => (
                            <ListItem key={field.key} alignItems="flex-start">
                                <ListItemText primary={field.name + ': '} />
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <List>
                    {
                        map(fields, field => (
                            <ListItem key={field.key} alignItems="flex-start">
                                <ListItemText primary={client[field.key]} />
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
}

export default function ClientDetails(props) {
    const { isNew, clientId, returnFunction } = props;
    const [modif, setModif] = useState(isNew);
    const [client, setClient] = useState({
        id: 0,
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        country: '',
        city: '',
        address: ''
    });
    const fields = [
        { name: 'Email', key: 'email' },
        { name: 'Téléphone', key: 'phone' },
        { name: 'Prénom', key: 'first_name' },
        { name: 'Nom de famille', key: 'last_name' },
        { name: 'Pays', key: 'country' },
        { name: 'Ville', key: 'city' },
        { name: 'Adresse', key: 'address' }
    ];
    const cookie = new Cookies();
    var token = cookie.get('accessToken');
    var data;
    if (!isNew)
        [{ data }] = CustomerRequest(token.access_token, clientId);

    useEffect(() => {
        if (!isNew && data)
            setClient(data.data);
    }, [data, isNew]);

    var content, button, returnButton;

    returnButton =
        <Button type="button" color="primary" onClick={returnFunction}>
            Retour
        </Button>

    if (modif) {
        content =
            <ClientForm
                client={client}
                returnFunction={() => { returnFunction() }}
                isNew={isNew}
            />
        if (!isNew) {
            button = <Button type="button" color="primary" onClick={() => {
                setModif(false);
            }}>
                Annuler modifications
            </Button>
        }
    }
    else if (!isNew) {
        content = clientInfos(fields, client);
        button = <Button type="button" color="primary" onClick={() => {
            setModif(true);
        }}>
            Modifier
        </Button>
    }
    else {
        content = clientInfos(
            fields,
            {
                id: 1,
                email: '',
                phone: '',
                first_name: '',
                last_name: '',
                country: '',
                city: '',
                address: ''
            });
        button = null;
    }

    return (
        <div>
            {returnButton}
            {button}
            {content}
        </div>
    );
}
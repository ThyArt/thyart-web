import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useEffect, useState, u} from "react";
import Button from "components/CustomButtons/Button";
import ClientForm from "./ClientForm";
import {makeStyles} from "@material-ui/styles";
import { GetCustomer as CustomerRequest } from 'http/Customer';
import Cookies from 'universal-cookie';

function clientInfos(client) {
    return (
        <Grid container>
            <Grid item>
                <List >
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Email: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Téléphone: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Prénom: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Nom de famille: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Pays: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Ville: " />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Adresse: " />
                    </ListItem>
                </List>
            </Grid>
            <Grid item>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.email} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.phone} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.first_name} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.last_name} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.country} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.city} />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={client.address} />
                    </ListItem>

                </List>
            </Grid>
        </Grid>
    );
}

export default function ClientDetails(props) {
    const {isNew, clientId, returnFunction} = props;
    const [modif, setModif] = useState(isNew);
    const [client, setClient] = useState({
        id: 0,
        email:'',
        phone:'',
        first_name:'',
        last_name:'',
        country:'',
        city:'',
        address:''
    });
    const [{ data, error }, execute] = CustomerRequest.hook(clientId);
    const [receivedData, setReceivedData] = useState(false);

    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    if (data && !receivedData)
    {
        setReceivedData(true);
        setClient(data.data);
    }

    useEffect(() => {
        if (!isNew)
        {
            CustomerRequest.execute(
                execute, 
                token.access_token
            )
        }
    }, []);

    var content, button, returnButton;

    returnButton =
        <Button type="button" color="primary" onClick={returnFunction}>
        Retour
        </Button>

    if (modif) {
        content = 
        <ClientForm
            client={client}
            returnFunction={()=>{returnFunction()}} 
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
    else if (!isNew)
    {
        content = clientInfos(client);
        button = <Button type="button" color="primary" onClick={() => {
            setModif(true);
        }}>
            Modifier
        </Button>
    }
    else
    {
        content = clientInfos({
            id: 1,
            email:'',
            phone:'',
            first_name:'',
            last_name:'',
            country:'',
            city:'',
            address:''
        });
        button = null;
    }

    return (
        <div>
            { returnButton }
            { button }
            { content }
        </div>
    );
}
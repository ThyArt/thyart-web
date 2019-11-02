import List from "@material-ui/core/List";
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
        <div>
            <List >
                <ListItem>
                    <ListItemText primary="Email: " />
                    <ListItemText primary={client.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Téléphone: " />
                    <ListItemText primary={client.phone} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Prénom: " />
                    <ListItemText primary={client.first_name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Nom de famille: " />
                    <ListItemText primary={client.last_name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Pays: " />
                    <ListItemText primary={client.country} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Ville: " />
                    <ListItemText primary={client.city} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Adresse: " />
                    <ListItemText primary={client.address} />
                </ListItem>
            </List>
        </div>
    );
}

export default function ClientDetails(props) {
    const {isNew, clientId, returnFunction} = props;
    const [modif, setModif] = useState(isNew);
    const [client, setClient] = useState({});
    const [{ data, error }, execute] = CustomerRequest.hook(clientId);
    
    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    useEffect(() => {
        if (!isNew)
        {
        CustomerRequest.execute(
            execute, 
            token
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
            returnFunction={returnFunction} 
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
            email:'tuc.pd@noob.fr',
            phone:'0765567434',
            first_name:'lollle',
            last_name:'test',
            country:'france',
            city:'lyon',
            address:'coyotes'
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
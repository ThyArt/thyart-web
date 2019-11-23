import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button";
import billingForm from "./billingForm";
import { GetBilling as BillingRequest } from 'http/Billings';
import { GetArtwork as ArtworkRequest } from 'http/Artworks';
import Cookies from 'universal-cookie';
import { map } from 'lodash';

function billingInfos(fields, billing) {
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
                                <ListItemText primary={billing[field.key]} />
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
}

export default function billingDetails(props) {
    const { isNew, billingId, artworkId, returnFunction } = props;
    const [modif, setModif] = useState(isNew);
    const [billing, setbilling] = useState({
        id: 0,
        artworkId: 0,
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        country: '',
        city: '',
        address: '',
        price: '',
        artworkName: ''
    });
    const fields = [
        { name: 'Email', key: 'email' },
        { name: 'Téléphone', key: 'phone' },
        { name: 'Prénom', key: 'first_name' },
        { name: 'Nom de famille', key: 'last_name' },
        { name: 'Pays', key: 'country' },
        { name: 'Ville', key: 'city' },
        { name: 'Adresse', key: 'address' },
        { name: "Prix de l'oeuvre", key: 'price' },
        { name: "Nom de l'oeuvre", key: 'artwork_name' }
    ];
    const cookie = new Cookies();
    var token = cookie.get('accessToken');
    var dataBilling;
    if (!isNew)
    {
        [{ dataBilling }] = BillingRequest(token.access_token, billingId);
        [{ dataArtwork }] = ArtworkRequest(token.access_token, artworkId);
    }

    useEffect(() => {
        if (!isNew && dataBilling && dataArtwork)
        {
            dataBilling.dataBilling.artwork_name = dataArtwork.name;
            dataBilling.dataBilling.price = dataArtwork.price;
            setbilling(dataBilling.dataBilling);
        }
    }, [dataBilling, dataArtwork, isNew]);

    var content, button, returnButton;

    returnButton =
        <Button type="button" color="primary" onClick={returnFunction}>
            Retour
        </Button>

    if (modif) {
        content =
            <billingForm
                billing={billing}
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
        content = billingInfos(fields, billing);
        button = <Button type="button" color="primary" onClick={() => {
            setModif(true);
        }}>
            Modifier
        </Button>
    }
    else {
        content = billingInfos(
            fields,
            {
                id: 1,
                artworkId: 0,
                email: '',
                phone: '',
                first_name: '',
                last_name: '',
                country: '',
                city: '',
                address: '',
                price: '',
                artworkName: ''
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
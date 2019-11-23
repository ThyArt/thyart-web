import React, { useState, useEffect } from "react";
import Form from "../components/Form/Form";
import TextField from "../components/Form/TextField";
import { GetExposedArtworks as ArtworkRequest } from 'http/Artworks';
import { CreateBilling as BillingCreate } from 'http/Billing';
import { ModifyBilling as BillingModify } from 'http/Billing';
import Cookies from 'universal-cookie';
import { validateEmail, validateNumber, validateString } from "../utils/validators"
import _ from 'lodash';
import { map } from 'lodash';


export default function billingForm(props) {
    let { billing, isNew, returnFunction } = props;

    const [billingId] = useState({ value: billing.id });
    const [email, setEmail] = useState({ value: billing.email, error: false });
    const [number, setNumber] = useState({ value: billing.phone, error: false });
    const [firstname, setFirstname] = useState({ value: billing.first_name, error: false });
    const [lastname, setLastname] = useState({ value: billing.last_name, error: false });
    const [country, setCountry] = useState({ value: billing.country, error: false });
    const [city, setCity] = useState({ value: billing.city, error: false });
    const [address, setAddress] = useState({ value: billing.address, error: false });
    const [artworkId, setArtworkId] = useState({ value: billing.artworkId, error: false });
    const [artworks, setArtworks] = useState([]);
    const [title, setTitle] = useState('');
    const [label, setLabel] = useState('');

    var [{ data, error }, execute] = BillingCreate.hook();
    var [{ data: dataArtworks, error: errorArtworks }, refresh] = ArtworkRequest();

    useEffect(() => {
        if (!isNew) {
            setTitle('Modification billing');
            setLabel('Modifier');
        }
        else {
            setTitle('Création billing');
            setLabel('Créer');
        }
    }, [isNew]);

    useEffect(() => {

    }, [dataArtworks]);

    if (!isNew)
        [{ data, error }, execute] = BillingModify.hook(billingId.value);

    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    const formDisabled =
        undefined !==
        _.find(
            [email, firstname, lastname, number, country, city, address, artworkId],
            state => state.error || !validateString(state.value)
        );

    if (data || error) {
        returnFunction();
    }

    const onSubmit = event => {
        event.preventDefault();

        if (!isNew)
            BillingModify.execute(execute,
                token.access_token,
                firstname.value,
                lastname.value,
                email.value,
                number.value,
                address.value,
                city.value,
                country.value,
                artworkId.value);
        else
            BillingCreate.execute(execute,
                token.access_token,
                firstname.value,
                lastname.value,
                email.value,
                number.value,
                address.value,
                city.value,
                country.value,
                artworkId.value);
    };

    const validateArtwork = id => {
        if (id != '-1')
            return true;
        else
            return false;
    }

    const onChange = (e, setFunc, validateFunc) =>
        setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

    return (
        <Form
            title={title}
            submitLabel={label}
            onSubmit={onSubmit}
            disabled={formDisabled}
        >
            <Form.Body>
                <TextField error={email.error} id="email" label="Adresse email" name="email" autoComplete="email" autoFocus required value={email.value} onChange={e => onChange(e, setEmail, validateEmail)} />
                <TextField error={number.error} id="phone" label="Téléphone" name="phone" value={number.value} onChange={e => onChange(e, setNumber, validateNumber)} required />
                <TextField error={firstname.error} id="firstname" label="Prénom" name="firstname" value={firstname.value} onChange={e => onChange(e, setFirstname, validateString)} required />
                <TextField error={lastname.error} id="lastname" label="Nom de famille" name="lastname" value={lastname.value} onChange={e => onChange(e, setLastname, validateString)} required />
                <TextField error={country.error} id="country" label="Pays" name="country" value={country.value} onChange={e => onChange(e, setCountry, validateString)} required />
                <TextField error={city.error} id="city" label="Ville" name="city" value={city.value} onChange={e => onChange(e, setCity, validateString)} required />
                <TextField error={address.error} id="address" label="Adresse" name="address" value={address.value} onChange={e => onChange(e, setAddress, validateString)} required />
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Oeuvre d'art
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={artworkId.value}
                        onChange={e => onChange(e, setArtworkId, validateArtwork)}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        {
                            map(artworks, artwork => (
                                <MenuItem value={artwork.id}>{artwork.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Form.Body>
        </Form>
    );
}
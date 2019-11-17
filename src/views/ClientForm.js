import React, {useState, useEffect} from "react";
import Form from "../components/Form/Form";
import TextField from "../components/Form/TextField";
import { CreateCustomer as CustomerCreate } from 'http/Customer';
import { ModifyCustomer as CustomerModify } from 'http/Customer';
import Cookies from 'universal-cookie';
import { validateEmail, validateNumber, validateString } from "../utils/validators"
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

export default function ClientForm(props) {
    let {client, isNew, returnFunction} = props;

    const [clientId] = useState({ value: client.id});
    const [email, setEmail] = useState({ value: client.email, error: false });
    const [number, setNumber] = useState({ value: client.phone, error: false });
    const [firstname, setFirstname] = useState({ value: client.first_name, error: false });
    const [lastname, setLastname] = useState({ value: client.last_name, error: false });
    const [country, setCountry] = useState({ value: client.country, error: false });
    const [city, setCity] = useState({ value: client.city, error: false });
    const [address, setAddress] = useState({ value: client.address, error: false });

    var [{ data, error }, execute] = CustomerCreate.hook();
    if (!isNew)
        [{ data, error }, execute] = CustomerModify.hook(clientId.value);

    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    const formDisabled =
     undefined !==
    _.find(
      [email, firstname, lastname, number, country, city, address],
      state => state.error || !validateString(state.value)
    );

    if (data || error) {
        returnFunction();
    }

    const onSubmit = event => {
        event.preventDefault();

        if (!isNew)
            CustomerModify.execute(execute, token.access_token, firstname.value, lastname.value, email.value, number.value, address.value, city.value, country.value);
        else
            CustomerCreate.execute(execute, token.access_token, firstname.value, lastname.value, email.value, number.value, address.value, city.value, country.value);
    };

    const onChange = (e, setFunc, validateFunc) =>
        setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });


    return (
        <Form
            title={'Client'}
            submitLabel={'Client'}
            onSubmit={onSubmit}
            disabled={formDisabled}
        >
            <Form.Body>
                <TextField
                    id="email"
                    label="Addresse email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    required
                    value={email.value}
                    onChange={e => onChange(e, setEmail, validateEmail)}
                />
                <TextField id="phone" label="Téléphone" name="phone" value={number.value} onChange={e => onChange(e, setNumber, validateNumber)} required />
                <TextField id="firstname" label="Prénom" name="firstname" value={firstname.value} onChange={e => onChange(e, setFirstname, validateString)} required />
                <TextField id="lastname" label="Nom de famille" name="lastname" value={lastname.value} onChange={e => onChange(e, setLastname, validateString)} required />
                <TextField id="country" label="Pays" name="country" value={country.value} onChange={e => onChange(e, setCountry, validateString)} required />
                <TextField id="city" label="Ville" name="city" value={city.value} onChange={e => onChange(e, setCity, validateString)} required />
                <TextField id="address" label="Adresse" name="address" value={address.value} onChange={e => onChange(e, setAddress, validateString)} required />
            </Form.Body>
        </Form>
    );
}
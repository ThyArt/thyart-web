import React, {useState, useEffect} from "react";
import Form from "../components/Form/Form";
import TextField from "../components/Form/TextField";
import { CreateCustomer as CustomerCreate } from 'http/Customer';
import { ModifyCustomer as CustomerModify } from 'http/Customer';
import Cookies from 'universal-cookie';
import { validateEmail, validateNumber, validateString } from "../utils/validators"
import _ from 'lodash';

export default function ClientForm(props) {
    let {client, isNew, returnFunction} = props;

    const [clientId, setClientId] = useState({ value: client.id});
    const [email, setEmail] = useState({ value: '', error: false });
    const [number, setNumber] = useState({ value: '', error: false });
    const [firstname, setFirstname] = useState({ value: '', error: false });
    const [lastname, setLastname] = useState({ value: '', error: false });
    const [country, setCountry] = useState({ value: '', error: false });
    const [city, setCity] = useState({ value: '', error: false });
    const [address, setAddress] = useState({ value: '', error: false });
    const [{ dataModify, errorModify }, executeModify] = CustomerModify.hook(clientId);
    const [{ dataCreate, errorCreate }, executeCreate] = CustomerCreate.hook();

    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    const formDisabled =
    undefined !==
    _.find(
      [email, firstname, lastname, number, country, city, address],
      state => state.error || !validateString(state.value)
    );

    useEffect(() => {
        if (!isNew)
        {
            setEmail(client.email);
            setNumber(client.number);
            setFirstname(client.firstname);
            setLastname(client.lastname);
            setLastname(client.country);
            setLastname(client.city);
            setLastname(client.address);
        }
    }, []);

    if (dataModify || errorModify || dataCreate || errorCreate) {
        console.log('return')
        returnFunction();            
    }

    const onSubmit = event => {
        event.preventDefault();

        if (!isNew)
            CustomerModify.execute(executeModify, token, firstname, lastname, email, number, address, city, country);
        else
            CustomerCreate.execute(executeCreate, token, firstname, lastname, email, number, address, city, country);
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
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    required
                    value={email.value}
                    onChange={e => onChange(e, setEmail, validateEmail)}

                />
                <TextField id="phone" label="Téléphone" name="phone" value={number.value} autoFocus
                           onChange={e => onChange(e, setNumber, validateNumber)}
                           required />
                <TextField id="firstname" label="Prénom" name="firstname" value={firstname.value} onChange={e => onChange(e, setFirstname, validateString)} autoFocus required />
                <TextField id="lastname" label="Nom de famille" name="lastname" value={lastname.value} onChange={e => onChange(e, setLastname, validateString)} autoFocus required />
                <TextField id="country" label="Pays" name="country" value={country.value} onChange={e => onChange(e, setCountry, validateString)} autoFocus required />
                <TextField id="city" label="Ville" name="city" value={city.value} onChange={e => onChange(e, setCity, validateString)} autoFocus required />
                <TextField id="address" label="Adresse" name="address" value={address.value} onChange={e => onChange(e, setAddress, validateString)} autoFocus required />
            </Form.Body>
        </Form>
    );
}
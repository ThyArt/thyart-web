import React, {useState} from "react";
import Form from "../components/Form/Form";
import TextField from "../components/Form/TextField";
import { CreateCustomer as CustomerCreate } from 'http/Customer';
import { ModifyCustomer as CustomerModify } from 'http/Customer';
import Cookies from 'universal-cookie';
import { validateEmail, validateNumber } from "../utils/validators"

export default function ClientForm(props) {
    let {client, isNew} = props;

    const [clientId, setClientId] = useState({ value: client.id});
    const [email, setEmail] = useState({ value: client.email, error: false });
    const [number, setNumber] = useState({ value: client.phone, error: false });
    const [firstname, setFirstname] = useState({ value: client.first_name, error: false });
    const [lastname, setLastname] = useState({ value: client.last_name, error: false });
    const [country, setCountry] = useState({ value: client.country, error: false });
    const [city, setCity] = useState({ value: client.city, error: false });
    const [address, setAddress] = useState({ value: client.address, error: false });
    const [{ dataModify, errorModify }, executeModify] = CustomerModify.hook(clientId, firstname, lastname, email, number, address, city, country);
    const [{ dataCreate, errorCreate }, executeCreate] = CustomerCreate.hook(firstname, lastname, email, number, address, city, country);

    const cookie = new Cookies();
    var token = cookie.get('accessToken');

    const onSubmit = event => {
        if (!isNew)
            CustomerModify.execute(executeModify, token);
        else
            CustomerCreate.execute(executeCreate, token);
    };

    const onChange = (e, setFunc, validateFunc) =>
        setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

    return (
        <Form title={'Client'} submitLabel={'Client'}>
            <Form.Body
                onSubmit={onSubmit}
                disabled={!email.value || !number.value || email.error || number.error
                || !firstname.value || !lastname.value || !country.value || !city.value
                || !address.value}
            >
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
                <TextField id="firstname" label="Prénom" name="firstname" value={firstname.value} autoFocus required />
                <TextField id="lastname" label="Nom de famille" name="lastname" value={lastname.value} autoFocus required />
                <TextField id="country" label="Pays" name="country" value={country.value} autoFocus required />
                <TextField id="city" label="Ville" name="city" value={city.value} autoFocus required />
                <TextField id="address" label="Adresse" name="address" value={address.value} autoFocus required />
            </Form.Body>
        </Form>
    );
}
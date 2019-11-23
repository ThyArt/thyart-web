import React, { useState, useEffect } from 'react';
import { CreateCustomer as CustomerCreate, ModifyCustomer as CustomerModify } from 'http/Customer';

import Cookies from 'universal-cookie';
import _ from 'lodash';
import { validateEmail, validateNumber, validateString } from 'utils/validators';
import TextField from 'components/Form/TextField';
import Form from 'components/Form/Form';

export default function ClientForm(props) {
  const { client, isNew, returnFunction } = props;

  const [clientId] = useState({ value: client.id });
  const [email, setEmail] = useState({ value: client.email, error: false });
  const [number, setNumber] = useState({ value: client.phone, error: false });
  const [firstname, setFirstname] = useState({ value: client.first_name, error: false });
  const [lastname, setLastname] = useState({ value: client.last_name, error: false });
  const [country, setCountry] = useState({ value: client.country, error: false });
  const [city, setCity] = useState({ value: client.city, error: false });
  const [address, setAddress] = useState({ value: client.address, error: false });
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');

  let [{ data, error }, execute] = CustomerCreate.hook();

  useEffect(() => {
    if (!isNew) {
      setTitle('Modification client');
      setLabel('Modifier');
    } else {
      setTitle('Création client');
      setLabel('Créer');
    }
  }, [isNew]);

  if (!isNew) [{ data, error }, execute] = CustomerModify.hook(clientId.value);

  const cookie = new Cookies();
  const token = cookie.get('accessToken');

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
      CustomerModify.execute(
        execute,
        token.access_token,
        firstname.value,
        lastname.value,
        email.value,
        number.value,
        address.value,
        city.value,
        country.value
      );
    else
      CustomerCreate.execute(
        execute,
        token.access_token,
        firstname.value,
        lastname.value,
        email.value,
        number.value,
        address.value,
        city.value,
        country.value
      );
  };

  const onChange = (e, setFunc, validateFunc) =>
    setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

  return (
    <Form title={title} submitLabel={label} onSubmit={onSubmit} disabled={formDisabled}>
      <Form.Body>
        <TextField
          error={email.error}
          id="email"
          label="Adresse email"
          name="email"
          autoComplete="email"
          autoFocus
          required
          value={email.value}
          onChange={e => onChange(e, setEmail, validateEmail)}
        />
        <TextField
          error={number.error}
          id="phone"
          label="Téléphone"
          name="phone"
          value={number.value}
          onChange={e => onChange(e, setNumber, validateNumber)}
          required
        />
        <TextField
          error={firstname.error}
          id="firstname"
          label="Prénom"
          name="firstname"
          value={firstname.value}
          onChange={e => onChange(e, setFirstname, validateString)}
          required
        />
        <TextField
          error={lastname.error}
          id="lastname"
          label="Nom de famille"
          name="lastname"
          value={lastname.value}
          onChange={e => onChange(e, setLastname, validateString)}
          required
        />
        <TextField
          error={country.error}
          id="country"
          label="Pays"
          name="country"
          value={country.value}
          onChange={e => onChange(e, setCountry, validateString)}
          required
        />
        <TextField
          error={city.error}
          id="city"
          label="Ville"
          name="city"
          value={city.value}
          onChange={e => onChange(e, setCity, validateString)}
          required
        />
        <TextField
          error={address.error}
          id="address"
          label="Adresse"
          name="address"
          value={address.value}
          onChange={e => onChange(e, setAddress, validateString)}
          required
        />
        />
      </Form.Body>
    </Form>
  );
}

import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import TextField from '../components/Form/TextField';
import Select from '../components/Select/Select';
import { FetchExposedArtworks as ArtworkRequest } from 'http/Billings';
import { CreateBilling as BillingCreate } from 'http/Billings';
import { ModifyBilling as BillingModify } from 'http/Billings';
import Cookies from 'universal-cookie';
import { validateEmail, validateNumber, validateString } from '../utils/validators';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function BillingForm(props) {
  let { client, artwork, billingId, isNew, returnFunction } = props;

  const [email, setEmail] = useState({ value: client.email, error: false });
  const [number, setNumber] = useState({ value: client.phone, error: false });
  const [firstname, setFirstname] = useState({ value: client.first_name, error: false });
  const [lastname, setLastname] = useState({ value: client.last_name, error: false });
  const [country, setCountry] = useState({ value: client.country, error: false });
  const [city, setCity] = useState({ value: client.city, error: false });
  const [address, setAddress] = useState({ value: client.address, error: false });
  const [artworkId, setArtworkId] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');

  var [{ data, error }, execute] = BillingCreate.hook();
  var [{ data: dataArtworks }, refreshArtworks] = ArtworkRequest();

  useEffect(() => {
    refreshArtworks();
  }, [refreshArtworks]);

  useEffect(() => {
    if (!isNew) {
      setTitle('Modification facture');
      setLabel('Modifier');
    } else {
      setTitle('Création facture');
      setLabel('Créer');
    }
  }, [isNew]);

  useEffect(() => {
    if (dataArtworks) {
      setArtworks(dataArtworks.data);
    }
  }, [dataArtworks]);

  if (!isNew) [{ data, error }, execute] = BillingModify.hook(billingId);

  const cookie = new Cookies();
  var token = cookie.get('accessToken');

  const formDisabled =
    undefined !==
    _.find(
      [email, firstname, lastname, number, country, city, address],
      state => state.error || !validateString(state.value)
    );

  const noArtwork = artworkId === '';

  if (data || error) {
    returnFunction();
  }

  const onSubmit = event => {
    event.preventDefault();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    if (!isNew)
      BillingModify.execute(
        execute,
        token.access_token,
        firstname.value,
        lastname.value,
        email.value,
        number.value,
        address.value,
        city.value,
        country.value,
        artworkId
      );
    else {
      if (artworkId === '') setArtworkId(artwork.id);
      BillingCreate.execute(
        execute,
        token.access_token,
        firstname.value,
        lastname.value,
        email.value,
        number.value,
        address.value,
        city.value,
        country.value,
        today,
        artworkId
      );
    }
  };

  const onChange = (e, setFunc, validateFunc) =>
    setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

  return (
    <Form
      title={title}
      submitLabel={label}
      onSubmit={onSubmit}
      disabled={formDisabled || noArtwork}
    >
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
        {artworks.length === 0 ? (
          <Select
            rows={[{id: '', name: ''}]}
            onSelect={selected => {
              if (selected && selected.length > 0) setArtworkId(selected[0]);
            }}
            multiple={false}
            labelName="Aucune oeuvre disponible"
          />
        ) : (
          <Select
            rows={artworks}
            onSelect={selected => {
              if (selected && selected.length > 0) setArtworkId(selected[0]);
            }}
            multiple={false}
            labelName="Oeuvre concernée"
          />
        )}
      </Form.Body>
    </Form>
  );
}

BillingForm.propTypes = {
  client: PropTypes.object,
  artwork: PropTypes.object,
  billingId: PropTypes.number,
  isNew: PropTypes.bool,
  returnFunction: PropTypes.func
};

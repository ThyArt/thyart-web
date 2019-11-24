import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useEffect, useState } from 'react';
import Button from 'components/CustomButtons/Button';
import BillingForm from './BillingForm';
import { GetBilling as BillingRequest } from 'http/Billings';
import Cookies from 'universal-cookie';
import { map } from 'lodash';
import PropTypes from 'prop-types';

function billingInfos(clientFields, artworkFields, client, artwork) {
  return (
    <Grid container>
      <Grid item>
        <List>
          {map(clientFields, field => (
            <ListItem key={field.key} alignItems="flex-start">
              <ListItemText primary={field.name + ': '} />
            </ListItem>
          ))}
          {map(artworkFields, field => (
            <ListItem key={field.key} alignItems="flex-start">
              <ListItemText primary={field.name + ': '} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <List>
          {map(clientFields, field => (
            <ListItem key={field.key} alignItems="flex-start">
              <ListItemText primary={client[field.key]} />
            </ListItem>
          ))}
          {map(artworkFields, field => (
            <ListItem key={field.key} alignItems="flex-start">
              <ListItemText primary={artwork[field.key]} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default function BillingDetails(props) {
  const { isNew, returnFunction } = props;
  const [modif, setModif] = useState(isNew);
  const [billingId, setBillingId] = useState(props.billingId);
  const cookie = new Cookies();
  var token = cookie.get('accessToken');
  let dataBilling;
  if (!isNew) {
    [{ data: dataBilling }] = BillingRequest(token.access_token, billingId);
  }
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
  const [artwork, setArtwork] = useState({
    id: '',
    name: '',
    price: '',
    ref: ''
  });
  const clientFields = [
    { name: 'Email', key: 'email' },
    { name: 'Téléphone', key: 'phone' },
    { name: 'Prénom', key: 'first_name' },
    { name: 'Nom de famille', key: 'last_name' },
    { name: 'Pays', key: 'country' },
    { name: 'Ville', key: 'city' },
    { name: 'Adresse', key: 'address' }
  ];
  const artworkFields = [
    { name: "Nom de l'oeuvre", key: 'name' },
    { name: "Prix de l'oeuvre", key: 'price' },
    { name: "Référence de l'oeuvre", key: 'ref' }
  ];

  useEffect(() => {
    if (!isNew && dataBilling) {
      setClient(dataBilling.data.customer);
      setArtwork(dataBilling.data.artwork);
      setBillingId(dataBilling.data.id);
    }
  }, [dataBilling, isNew]);

  var content, button, returnButton;

  returnButton = (
    <Button type="button" color="primary" onClick={returnFunction}>
      Retour
    </Button>
  );

  if (modif) {
    content = (
      <BillingForm
        client={client}
        artwork={artwork}
        billingId={billingId}
        returnFunction={() => {
          returnFunction();
        }}
        isNew={isNew}
      />
    );
    if (!isNew) {
      button = (
        <Button
          type="button"
          color="primary"
          onClick={() => {
            setModif(false);
          }}
        >
          Annuler modifications
        </Button>
      );
    }
  } else if (!isNew) {
    content = billingInfos(clientFields, artworkFields, client, artwork);
    button = <div></div>;
  }

  return (
    <div>
      {returnButton}
      {button}
      {content}
    </div>
  );
}

BillingDetails.propTypes = {
  isNew: PropTypes.bool,
  returnFunction: PropTypes.func
};

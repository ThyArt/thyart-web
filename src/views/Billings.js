import React, { useState, useEffect } from 'react';
import { GetBillings as BillingsRequest } from 'http/Billings';
import { GetCustomers as ClientsRequest } from 'http/Customer';
import { FetchArtworks as ArtworksRequest } from 'http/Billings';
import { DeleteBillings } from 'http/Billings';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Button from 'components/CustomButtons/Button';
import BillingDetails from './BillingDetails';
import Cookies from 'universal-cookie';
import { map } from 'lodash';
import Searchbar from 'components/SearchBar/Searchbar';

export default function Billings() {
  const cookie = new Cookies();
  var token = cookie.get('accessToken');
  const [table, setTable] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [billings, setBillings] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState(-1);
  const [searchInput, setSearchinput] = useState('');
  const [rowsName] = useState(['Date de la facture', 'Oeuvre', 'Nom du client']);
  const [rowsKey] = useState(['id', 'date', 'artwork', 'name']);
  const [key, setKey] = useState(Math.random());
  var [{ data: dataBilling, loading: loadingBilling }, refreshBillings] = BillingsRequest(
    token.access_token
  );
  var [{ data: dataArtwork, loading: loadingArtwork }, refreshArtworks] = ArtworksRequest(
    token.access_token
  );
  var [{ data: dataClient, loading: loadingClient }, refreshClients] = ClientsRequest(
    token.access_token
  );
  var [{ response: responseDelete }, execute] = DeleteBillings.hook(token.access_token);
  var content;

  useEffect(() => {
    refreshBillings(token.access_token);
    refreshArtworks(token.access_token);
    refreshClients(token.access_token);
  }, [refreshBillings, refreshArtworks, refreshClients, token.access_token]);

  const checkRegexArtwork = (array, regex) => {
    return regex.test(array['name'].toUpperCase());
  };

  const checkRegexClient = (array, regex) => {
    return (
      regex.test(array['first_name'].toUpperCase()) || regex.test(array['last_name'].toUpperCase())
    );
  };

  useEffect(() => {
    const regex = new RegExp(searchInput.toUpperCase());
    if (dataClient && dataBilling && dataArtwork) {
      setClients(dataClient.data);
      setArtworks(dataArtwork.data);
      var filteredBillings = [];
      map(dataBilling.data, value => {
        var filteredArtworks = artworks.filter(function(artwork) {
          return artwork.id === value.artwork_id;
        });
        var filteredCustomers = clients.filter(function(client) {
          return client.id === value.customer_id;
        });
        var filteredBilling = {};
        filteredBilling.id = value.id;
        filteredBilling.date = value.date;
        if (filteredArtworks.length > 0) filteredBilling.artwork = filteredArtworks[0].name;
        if (filteredCustomers.length > 0)
          filteredBilling.name =
            filteredCustomers[0].first_name + ' ' + filteredCustomers[0].last_name;
        if (
          searchInput === '' ||
          (filteredArtworks.length > 0 && checkRegexArtwork(filteredArtworks[0], regex)) ||
          (filteredCustomers.length > 0 && checkRegexClient(filteredCustomers[0], regex))
        )
          filteredBillings.push(filteredBilling);
      });
      setBillings(filteredBillings);
    }
    setKey(Math.random());
  }, [dataClient, artworks, clients, dataBilling, dataArtwork, rowsKey, searchInput]);

  useEffect(() => {
    if (responseDelete) {
      refreshBillings(token.access_token);
      refreshArtworks(token.access_token);
      refreshClients(token.access_token);
    }
  }, [responseDelete, refreshBillings, refreshArtworks, refreshClients, token.access_token]);

  const onSearch = input => {
    setSearchinput(input);
  };

  if (table && !loadingBilling && !loadingArtwork && !loadingClient) {
    content = (
      <div>
        <Button
          type="button"
          color="primary"
          onClick={() => {
            setTable(false);
            setIsNew(true);
            setSelectedBilling(-1);
          }}
        >
          Créer un Billing
        </Button>
        <Searchbar onInputChange={onSearch} />
        <Table
          header={rowsName}
          rows={billings}
          key={key}
          onDeleteClick={id => {
            DeleteBillings.execute(execute, id);
          }}
          onRowClick={id => {
            setSelectedBilling(id);
            setIsNew(false);
            setTable(false);
          }}
        />
      </div>
    );
  } else if (!loadingBilling && !loadingArtwork && !loadingClient)
    content = (
      <BillingDetails
        isNew={isNew}
        billingId={selectedBilling}
        returnFunction={() => {
          refreshBillings(token.access_token);
          refreshArtworks(token.access_token);
          refreshClients(token.access_token);
          setTable(true);
        }}
      />
    );
  else content = <div></div>;

  return (
    <div>
      <GridContainer>{content}</GridContainer>
    </div>
  );
}

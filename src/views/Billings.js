import React, { useState, useEffect } from 'react';
import { GetBillingss as BillingsRequest } from 'http/Billings';
import { GetCustomers as CustomersRequest } from 'http/Customer';
import { GetExposedArtworks as ArtworksRequest } from 'http/Artworks';
import { DeleteBillings } from 'http/Billings';
import GridContainer from 'components/Grid/GridContainer';
import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";

import BillingDetails from "./BillingDetails";
import Cookies from 'universal-cookie';

export default function Billings() {
    const cookie = new Cookies();
    var token = cookie.get('accessToken');
    const [table, setTable] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const [billings, setBillings] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedBilling, setSelectedBilling] = useState(-1);
    const [selectedArtwork, setSelectedArtwork] = useState(-1);
    const [rowsName] = useState([
        'Date de la facture',
        'Oeuvre',
        'Nom du client'
    ]);
    const [rowsKey] = useState([
        'id',
        'artwork',
        'first_name',
        'name'
    ]);
    const [key, setKey] = useState(Math.random());
    var [{ data: dataBilling, loading: loadingBilling }, refreshBillings] = BillingsRequest(token.access_token);
    var [{ data: dataArtwork, loading: loadingArtwork }, refreshArtworks] = ArtworksRequest(token.access_token);
    var [{ data: dataClient, loading: loadingClient }, refreshClients] = ClientsRequest(token.access_token);
    var [{ response: responseDelete }, execute] = DeleteBillings.hook(token.access_token);
    var content;

    useEffect(() => {
        refreshBillings(token.access_token);
        refreshArtworks(token.access_token);
        refreshClients(token.access_token);
    }, [refreshBillings, refreshArtworks, refreshClients, token.access_token]);

    useEffect(() => {
        if (dataClient && dataBilling && dataArtwork) {
            var filteredBillings = [];
            for (var value of dataRequest.data) {
                var filteredArtworks = artworks.filter(function (artwork) {
                    return artwork.artwork_id === value.artwork_id;
                });
                var filteredCustomers = customers.filter(function (customer) {
                    return customer.id === value.customer_id;
                });
                var filteredBilling = {};
                if (filteredArtworks.length > 0)
                    filteredBilling.artwork = filteredArtworks[0].name;
                if (filteredCustomers.length > 0)
                    filteredBilling.name = filteredCustomers[0].first_name + " " + filteredCustomers[0].last_name;
                for (var key of rowsKey)
                    filteredBilling[key] = value[key];
                filteredBillings.push(filteredBilling)
            }
            setBillings(filteredBillings);
        }
        setKey(Math.random());
    }, [dataClient, dataBilling, dataArtwork, rowsKey]);

    useEffect(() => {
        if (responseDelete) {
            refreshBillings(token.access_token);
            refreshArtworks(token.access_token);
            refreshClients(token.access_token);
        }
    }, [responseDelete, refreshBillings, refreshArtworks, refreshClients, token.access_token]);

    if (table && loading === false) {
        content = <div>
            <Button type="button" color="primary" onClick={() => {
                setTable(false);
                setIsNew(true);
                setBillingSelected(-1);
                setArtworkSelected(-1);
            }}
            >
                Créer un Billing
            </Button>
            <Table header={rowsName} rows={billings} key={key} onDeleteClick={(id) => {
                DeleteBillings.execute(execute, id);
            }}
                onRowClick={(id) => {
                    setSelectedBilling(id);
                    setSelectedArtwork(artwork_id);
                    setIsNew(false);
                    setTable(false);
                }} />
        </div>
    }
    else if (loading === false)
        content = <BillingDetails
            isNew={isNew}
            BillingId={selectedBilling}
            artworkId={selectedArtwork}
            returnFunction={() => {
                refreshBillings(token.access_token);
                refreshArtworks(token.access_token);
                refreshClients(token.access_token);
                setTable(true);
            }
            }
        />
    else
        content = <div></div>

    return (
        <div>
            <GridContainer>
                {content}
            </GridContainer>
        </div>
    );
}
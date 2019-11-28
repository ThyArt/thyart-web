import React, { useState, useEffect } from 'react';
import { GetCustomers as CustomerRequest, DeleteCustomer } from 'http/Customer';

import Table from 'components/Table/Table';
import Button from 'components/CustomButtons/Button';

import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core';
import ClientDetails from './ClientDetails';

const useStyles = makeStyles(() => ({
  topDiv: {
    display: 'flex'
  }
}));

export default function Clients() {
  const classes = useStyles();
  const cookie = new Cookies();
  const token = cookie.get('accessToken');
  const [table, setTable] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [rowsName] = useState(['Email', 'Prénom', 'Nom de famille']);
  const [rowsKey] = useState(['id', 'email', 'first_name', 'last_name']);
  const [key, setKey] = useState(Math.random());
  const [{ data, loading }, refresh] = CustomerRequest(token.access_token);
  const dataRequest = data;
  const [{ response }, execute] = DeleteCustomer.hook(token.access_token);
  const responseDelete = response;
  let content;

  useEffect(() => {
    refresh(token.access_token);
  }, [refresh, token.access_token]);

  useEffect(() => {
    if (dataRequest) {
      const filteredData = [];
      for (const value of dataRequest.data) {
        const filteredValue = {};
        for (const key of rowsKey) filteredValue[key] = value[key];
        filteredData.push(filteredValue);
      }
      setClients(filteredData);
    }
    setKey(Math.random());
  }, [dataRequest, rowsKey]);

  useEffect(() => {
    if (responseDelete) {
      refresh(token.access_token);
    }
  }, [responseDelete, refresh, token.access_token]);

  if (table && loading === false) {
    content = (
      <div>
        <div className={classes.topDiv}>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              setTable(false);
              setIsNew(true);
              setSelected(-1);
            }}
          >
            Créer un client
          </Button>
        </div>
        <Table
          header={rowsName}
          rows={clients}
          key={key}
          onDeleteClick={id => {
            DeleteCustomer.execute(execute, id);
          }}
          onRowClick={id => {
            setSelected(id);
            setIsNew(false);
            setTable(false);
          }}
        />
      </div>
    );
  } else if (loading === false)
    content = (
      <ClientDetails
        isNew={isNew}
        clientId={selected}
        returnFunction={() => {
          refresh(token.access_token);
          setTable(true);
        }}
      />
    );
  else content = <div />;

  return <div>{content}</div>;
}

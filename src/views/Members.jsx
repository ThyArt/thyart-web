import React, { Fragment, useState, useEffect } from 'react';
import Table from 'components/Table/Table';
import Switch from '@material-ui/core/Switch';
import { GetCurrentMembers } from 'http/Members';
import { each } from 'lodash';

export default function Members() {
  const [{ data: getData, loading: getLoading }] = GetCurrentMembers();
  const [myData, setMyData] = useState([]);
  const [upToDate, setUpToDate] = useState(false);
  const [key, setKey] = useState(Math.random());

  const header = ["Nom d'utilisateur", "Prénom", "Nom de Famille", "Adresse mail", "Permissions des membres"];

  const roleSwitch = (id, role) => {
    const isAdmin = (role === 'admin');
    return (
      <Fragment>
        Membre
        <Switch id={"checkbox#" + id} checked={isAdmin} onChange={() => changeMemberRole(id)} color="primary"/>
        Galeriste
      </Fragment>
    );
  };

  const changeMemberRole = id => {
    // API call to change member role with id
    console.log('patch ' + id);
    setUpToDate(false);
  };

  const deleteMember = id => {
    // API call to delete member with id
    console.log('delete ' + id);
    setUpToDate(false);
  };

  useEffect(() => {
    const formatResult = async () => {
      let tmp = [];
      each(getData['data'], obj => {
        tmp.push({
          id: obj['id'],
          username: obj['name'],
          firstname: obj['firstname'],
          lastname: obj['lastname'],
          email: obj['email'],
          role: roleSwitch(obj['id'], obj['role']),
        });
      });
      setMyData(tmp);
      setUpToDate(true);
      setKey(Math.random());
    };

    if (getData && !upToDate) {
      formatResult().then(() => console.log(myData, upToDate));
    }
  }, [upToDate, getData, myData]);

  return (
    <Fragment>
      <Table header={header} rows={myData} onDeleteClick={deleteMember} key={key}/>
    </Fragment>
  );
};

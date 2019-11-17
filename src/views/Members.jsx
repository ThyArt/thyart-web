import React, { Fragment, useState, useEffect } from 'react';
import { each, map } from 'lodash';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from 'components/Form/TextField';
import Table from 'components/Table/Table';
import Button from "components/CustomButtons/Button";
import SnackBarWrapper from 'components/SnackBarWrapper/SnackBarWrapper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { GetCurrentMembers, UpdateRole, CreateMember } from 'http/Members';

export default function Members() {
  const [{ data: currentData }, refresh] = GetCurrentMembers();
  const [{ error: errorUpdate }, executeUpdate] = UpdateRole.hook();
  const [{ error: errorCreate }, executeCreate] = CreateMember.hook();
  const [snackbar, setSnackbar] = useState({ open: false, closedByButton: false });
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const header = ["Nom d'utilisateur", "Prénom", "Nom de Famille", "Adresse mail", "Permissions des membres"];
  const modalFields = [
    {content: "Nom d'utilisateur du nouveau membre", label: "Nom d'utilisateur", type: "text", var: userName, handle: setUserName},
    {content: "Nom de famille du nouveau membre", label: "Nom de famille", type: "text", var: userLastName, handle: setUserLastName},
    {content: "Prénom du nouveau membre", label: "Prénom", type: "text", var: userFirstName, handle: setUserFirstName},
    {content: "Email du nouveau membre", label: "Email", type: "email", var: userEmail, handle: setUserEmail},
    {content: "Mot de passe du nouveau membre", label: "Mot de passe", type: "password", var: userPassword, handle: setUserPassword},
  ];

  if ((errorUpdate || errorCreate) && !snackbar.closedByButton && !snackbar.open)
    setSnackbar({ open: true, closedByButton: false });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, closedByButton: true });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserPassword("");
    setUserEmail("");
    setUserFirstName("");
    setUserLastName("");
    setUserName("");
  };

  const roleSwitch = (id, role) => {
    if (role === 'admin') return (<Fragment>(C'est vous !)</Fragment>);
    const isAdmin = (role === 'admin' || role === 'gallerist');
    return (
      <Fragment>
        Membre
        <Switch id={"checkbox#" + id} checked={isAdmin} onChange={() => changeMemberRole(id, isAdmin)} color="primary"/>
        Galeriste
      </Fragment>
    );
  };

  const formatResult = () => {
    let tmp = [];
    each(currentData['data'], obj => {
      tmp.push({
        id: obj['id'],
        username: obj['name'],
        firstname: obj['firstname'],
        lastname: obj['lastname'],
        email: obj['email'],
        role: roleSwitch(obj['id'], obj['role']),
      });
    });
    return (tmp);
  };

  const changeMemberRole = (id, isAdmin) => {
    const role = (isAdmin ? 'member' : 'gallerist');
    UpdateRole.execute(executeUpdate, id, role);
    refresh();
  };

  const createMember = () => {
    CreateMember.execute(executeCreate, userEmail, userFirstName, userLastName, userPassword, userName);
    setOpenModal(false);
    refresh();
  };

  return (
    <Fragment>
      <Button type="button" color="primary" onClick={() => setOpenModal(true)}>
        Créer un membre
      </Button>

      { currentData ?
        <Table header={header} rows={formatResult()}/>
        : null }

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Créer un nouveau membre</DialogTitle>
        <DialogContent>
          <GridContainer spacing={3}>
            { map(modalFields, (fields, it) => { return (
              <Fragment key={'field#' + it}>
                <GridItem xs={6}>
                  <DialogContentText style={{marginTop: '10%'}}>
                    {fields['content']}
                  </DialogContentText>
                </GridItem>
                <GridItem xs={6}>
                  <TextField
                    label={fields['label']}
                    type={fields['type']}
                    value={fields['var']}
                    onChange={event => fields['handle'](event.target.value)}
                  />
                </GridItem>
              </Fragment>
            );})}
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="transparent">
            Annuler
          </Button>
          <Button onClick={createMember} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackBarWrapper
          variant="error"
          message="Erreur, l'action n'a pas pu être exécutée."
          onClose={handleCloseSnackbar}
        />
      </Snackbar>
    </Fragment>
  );
};

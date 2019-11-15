import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { map } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  modal: {
    textAlign: 'center',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  modalText: {
    padding: theme.spacing(2),
    textAlign: 'center',
    text: 'white'
  }
}));

export default function Profile() {
  const classes = useStyles();
  const [
    {
      open: modalOpen,
      title: modalTitle,
      stateName: modalStateName,
      dialogText: modalDialogText,
      textType: modalTextType
    },
    setModal
  ] = useState({
    open: false,
    title: undefined,
    stateName: undefined,
    dialogText: undefined,
    textType: undefined
  });

  const closeModal = () =>
    setModal({
      open: false,
      title: undefined,
      stateName: undefined,
      dialogText: undefined,
      textType: undefined
    });

  const fields = [
    {
      title: 'Prénom',
      stateName: 'firstname',
      dialogText: 'Veuillez entrer votre prénom',
      textType: 'text'
    },
    {
      title: 'Nom',
      stateName: 'lastname',
      dialogText: "Veuillez entrer votre nom d'usage",
      textType: 'text'
    },
    {
      title: 'Email',
      stateName: 'email',
      dialogText: 'Veuillez entrer votre email',
      textType: 'email'
    },
    {
      title: 'Mot de Passe',
      stateName: 'password',
      dialogText: 'Veuillez entrer votre mot de passe',
      textType: 'password'
    }
  ];

  return (
    <Fragment>
      <h1> Vos informations : </h1>
      {map(fields, field => (
        <Grid container spacing={3} key={field.stateName}>
          <Grid item md={3} sm={5} xs={8}>
            <Paper className={classes.paper}>{field.title}</Paper>
          </Grid>
          <Grid item md={1} sm={3} xs={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setModal({ open: true, ...field });
              }}
            >
              <EditIcon />
            </Button>
            <Dialog open={modalOpen} onClose={closeModal} aria-labelledby="form-dialog">
              <DialogTitle>{modalTitle}</DialogTitle>
              <DialogContent>
                <DialogContentText>{modalDialogText}</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id={modalStateName}
                  label={modalStateName}
                  type={modalTextType}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal} color="primary">
                  Annulez
                </Button>
                <Button onClick={closeModal} color="primary">
                  Enregistrer
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
}

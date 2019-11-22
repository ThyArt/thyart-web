import React, { Fragment, useState, useEffect } from 'react';
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
import { GetCurrentData, UpdateNewData } from 'http/Profile';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarWrapper from 'components/SnackBarWrapper/SnackBarWrapper';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [{ data: getData }, refresh] = GetCurrentData();
  const [{ data: updateData, error: updateError }, executeUpdate] = UpdateNewData.hook();
  const [snackbar, setSnackbar] = useState({ open: false, closedByButton: false });
  const [{
    open: modalOpen,
    title: modalTitle,
    dialogText: modalDialogText,
    textType: modalTextType,
    stateName: modalStateName,
    var: modalVar,
    handler: modalHandler
  }, setModal] = useState({
    open: false,
    title: '',
    dialogText: '',
    textType: '',
    stateName: '',
    var: undefined,
    handler: undefined
  });

  if ((updateError) && !snackbar.closedByButton && !snackbar.open)
    setSnackbar({ open: true, closedByButton: false });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, closedByButton: true });
  };

  useEffect(() => {
    refresh();
    resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getData) {
      closeModal();
    }
  }, [getData]);

  useEffect(() => {
    if (updateData) {
      refresh();
      resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData]);

  const resetFields = () => {
    if (getData) {
      setEmail(getData['email']);
      setFirstName(getData['firstname']);
      setLastName(getData['lastname']);
    }
  };

  const closeModal = () =>
    setModal({
      open: false,
      title: '',
      dialogText: '',
      textType: '',
      stateName: '',
      var: undefined,
      handler: undefined
    });

  const onSubmit = event => {
    event.preventDefault();
    UpdateNewData.execute(executeUpdate, firstName, lastName, email, password);
    refresh();
    resetFields();
    closeModal();
  };

  const fields = [
    {
      title: 'Prénom',
      dialogText: 'Veuillez entrer votre prénom',
      textType: 'text',
      stateName: 'firstname',
      var: firstName,
      handler: setFirstName
    },
    {
      title: 'Nom',
      dialogText: "Veuillez entrer votre nom d'usage",
      textType: 'text',
      stateName: 'lastname',
      var: lastName,
      handler: setLastName
    },
    {
      title: 'Email',
      dialogText: 'Veuillez entrer votre email',
      textType: 'email',
      stateName: 'email',
      var: email,
      handler: setEmail
    },
    {
      title: 'Mot de Passe',
      dialogText: 'Veuillez entrer votre mot de passe',
      textType: 'password',
      stateName: 'password',
      password: password,
      handler: setPassword
    }
  ];

  return (
    <Fragment>
      <h1> Vos informations : </h1>

      {map(fields, (field, it) => (
        <Grid container spacing={3} key={"Grid#" + it}>
          <Grid item md={3} sm={5} xs={8}>
            {(field.textType === "password") ?
              <Paper className={classes.paper}>********</Paper> :
              <Paper className={classes.paper}>{(getData) ? (getData.data[field.stateName]) : ('')}</Paper>
            }
          </Grid>
          <Grid item md={1} sm={3} xs={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setModal({ open: true, ...field });
              }}
            >
              <EditIcon/>
            </Button>
          </Grid>
        </Grid>
      ))}

      <Dialog open={modalOpen} onClose={closeModal} aria-labelledby="form-dialog">
        <DialogTitle>{modalTitle || "Chargement..."}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalDialogText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={modalStateName + modalVar}
            label={modalTitle}
            type={modalTextType}
            fullWidth
            onChange={event => {modalHandler(event.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Annulez
          </Button>
          <Button onClick={onSubmit} color="primary">
            Enregistrer
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
}

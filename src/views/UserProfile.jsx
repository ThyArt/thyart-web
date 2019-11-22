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
import { GetCurrentData, UpdateNewData } from 'http/Profile';
import { validateEmail, validatePassword, validateString } from 'utils/validators';

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
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [firstName, setFirstName] = useState({ value: '', error: false });
  const [lastName, setLastName] = useState({ value: '', error: false });


  const onChange = (e, setFunc, validateFunc) =>
    setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

  const [{ data: getData, loading: getLoading }] = GetCurrentData();
  const [
    { data: updateData, loading: updateLoading, error: updateError },
    execute
  ] = UpdateNewData();
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

  const onSubmit = event => {
    event.preventDefault();
    execute({
      data: {
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        password: password.value
      }
    });

      setModal({
        open: false,
        title: undefined,
        stateName: undefined,
        dialogText: undefined,
        textType: undefined
      });
  };
  const fields = [
    {
      title: 'Prénom',
      stateName: 'firstname',
      dialogText: 'Veuillez entrer votre prénom',
      textType: 'text',
      onChange: e => onChange(e, setFirstName, validateString)
    },
    {
      title: 'Nom',
      stateName: 'lastname',
      dialogText: "Veuillez entrer votre nom d'usage",
      textType: 'text',
      onChange: e => onChange(e, setLastName, validateString)
    },
    {
      title: 'Email',
      stateName: 'email',
      dialogText: 'Veuillez entrer votre email',
      textType: 'email',
      onChange: e => onChange(e, setEmail, validateEmail)
    },
    {
      title: 'Mot de Passe',
      stateName: 'password',
      dialogText: 'Veuillez entrer votre mot de passe',
      textType: 'password',
      onChange: e => onChange(e, setPassword, validatePassword)
    }
  ];

  return (
    <Fragment>
      <h1> Vos informations : </h1>
      {map(fields, field => (
        <Grid container spacing={3} key={field.stateName}>
          <Grid item md={3} sm={5} xs={8}>
            {(field.stateName === "password") ?
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
                <Button onClick={onSubmit} color="primary">
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

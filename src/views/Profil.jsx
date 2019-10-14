import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { inheritInnerComments } from '@babel/types';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
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
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  modalText: {
    padding: theme.spacing(2),
    textAlign: 'center',
    text: "white"
  },

}));

export default function Profile() {
  const classes = useStyles();
  const [openFirstname, setOpenFirstname] = React.useState(false);
  const [openName, setOpenName] = React.useState(false);
  const [openMail, setOpenMail] = React.useState(false);
  const [openPwd, setOpenPwd] = React.useState(false);


  /*const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };*/

  return (
    <div>
      <h1> Vos informations : </h1>
      <Grid container spacing={3}>
        <Grid item md={3} sm={5} xs={8}>
          <!--TODO: get le prenom a la place du paper avec axios-->
          <Paper className={classes.paper}>Prenom</Paper>
        </Grid>
        <Grid item  md={1} sm={3} xs={4}>
          <Button variant="outlined" color="primary" onClick={() => {setOpenFirstname(true)}}>
            <EditIcon/>
          </Button>
          <Dialog open={openFirstname} onClose={() => {setOpenFirstname(false)}} aria-labelledby="form-dialog-prenom">
            <DialogTitle id="form-dialog-prenom">Prénom</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Veuillez entrer votre prénom
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="firstname"
                label="Prénom"
                type="firstname"
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={() => {setOpenFirstname(false)}} color="primary">
                Annulez
              </Button>
              <!--TODO: set le prenom enregistré avec axios-->
              <Button onClick={() => {setOpenFirstname(false)}}  color="primary">
                Enregistrer
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

      <!--TODO: effectuer les TODO pour les autres grid + mapper si possible-->

      <Grid container spacing={3}>
        <Grid item md={3} sm={5} xs={8}>
          <Paper className={classes.paper}>Nom</Paper>
        </Grid>
        <Grid item  md={1} sm={3} xs={4}>
          <Button variant="outlined" color="primary" onClick={() => {setOpenName(true)}} >
            <EditIcon/>
          </Button>
          <Dialog open={openName} onClose={() => {setOpenName(false)}}  aria-labelledby="form-dialog-nom">
            <DialogTitle id="form-dialog-nom">Nom</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Veuillez entrer votre nom
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nom"
                type="Name"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {setOpenName(false)}}  color="primary">
                Annulez
              </Button>
              <Button onClick={() => {setOpenName(false)}}  color="primary">
                Enregistrer
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid><Grid container spacing={3}>
      <Grid item md={3} sm={5} xs={8}>
        <Paper className={classes.paper}>Email</Paper>
      </Grid>
      <Grid item  md={1} sm={3} xs={4}>
        <Button variant="outlined" color="primary" onClick={() => {setOpenMail(true)}}>
          <EditIcon/>
        </Button>
        <Dialog open={openMail} onClose={() => {setOpenMail(false)}} aria-labelledby="form-dialog-mail">
          <DialogTitle id="form-dialog-mail">Email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer votre adresse mail
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="mail"
              label="Email"
              type="mail"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenMail(false)}} color="primary">
              Annulez
            </Button>
            <Button onClick={() => {setOpenMail(false)}} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid><Grid container spacing={3}>
      <Grid item md={3} sm={5} xs={8}>
        <Paper className={classes.paper}>Mot de passe</Paper>
      </Grid>
      <Grid item  md={1} sm={3} xs={4}>
        <Button variant="outlined" color="primary" onClick={() => {setOpenPwd(true)}}>
          <EditIcon/>
        </Button>
        <Dialog open={openPwd} onClose={() => {setOpenPwd(false)}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Mot de passe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer votre nouveau mot de passe
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenPwd(false)}}  color="primary">
              Annulez
            </Button>
            <Button onClick={() => {setOpenPwd(false)}}  color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
    </div>
  );
}
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { each } from 'lodash';
import { GetANewsletters, GetAllClients, CreateNewsletter } from 'http/Newsletters';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Select from 'components/Select/Select';
import Button from 'components/CustomButtons/Button';
import SnackBarWrapper from 'components/SnackBarWrapper/SnackBarWrapper';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  topRightButton: {
    position: 'absolute',
    right: '10px'
  },
  select: {
    width: '100%'
  }
}));

function NewsletterForm({id}) {
  const classes = useStyles();
  const [{ data: getNewsletter }] = GetANewsletters(id ? id : 0);
  const [{ data: getClients }] = GetAllClients();
  const [{ data: responseCreate, error: errorCreate }, createNewsletter] = CreateNewsletter.hook();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, closedByButton: false });

  if ((errorCreate) && !snackbar.closedByButton && !snackbar.open)
    setSnackbar({ open: true, closedByButton: false });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, closedByButton: true });
  };

  const parseData = () => {
    if (getNewsletter && getNewsletter.data) {
      setSubject(getNewsletter.data.subject);
      setDescription(getNewsletter.data.description);
    }
    if (getClients && getClients.data) {
      const tmp = [];
      each(getClients.data, client => {
        tmp.push({
          id: client.id,
          name: client.first_name + " " + client.last_name + " \"" + client.email + "\""
        });
      });
      setClients(tmp);
    }
  };

  useEffect(() => {
    if (getNewsletter || getClients) {
      parseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewsletter, getClients]);

  useEffect(() => {
    if (responseCreate) {
      window.location.href = '/dashboard/newsletters';
    }
  }, [responseCreate]);

  const onClickSend = () => {
    CreateNewsletter.execute(createNewsletter, subject, description, selectedClients.join(','));
  };

  return (
    <Fragment>
      <Button type="button" color="primary" onClick={onClickSend} startIcon={<SendIcon/>} className={classes.topRightButton}>
        Envoyer la newsletter
      </Button>

      <GridContainer spacing={3}>
        <GridItem xs={12}>
          <Select rows={clients} multiple={true} onSelect={ids => setSelectedClients(ids)} className={classes.select}/>
        </GridItem>
        <GridItem xs={12}>
          <TextField
            label={"Objet"}
            variant="outlined"
            margin="normal"
            fullWidth
            type={"text"}
            value={subject}
            onChange={event => setSubject(event.target.value)}
          />
        </GridItem>
        <GridItem xs={12}>
          <TextField
            label={"Contenu de la newsletter"}
            variant="outlined"
            margin="normal"
            fullWidth
            type={"text"}
            value={description}
            onChange={event => setDescription(event.target.value)}
            multiline
          />
        </GridItem>
      </GridContainer>

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

NewsletterForm.propTypes = {
  id: PropTypes.number
};

export default NewsletterForm;

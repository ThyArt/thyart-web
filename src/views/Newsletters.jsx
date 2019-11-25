import React, { Fragment, useEffect, useState } from 'react';
import Button from 'components/CustomButtons/Button';
import Table from 'components/Table/Table';
import SnackBarWrapper from 'components/SnackBarWrapper/SnackBarWrapper';
import Searchbar from 'components/SearchBar/Searchbar';
import NewsletterForm from 'views/NewsletterForm';
import Snackbar from '@material-ui/core/Snackbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { GetAllNewsletters, DeleteNewsletter } from 'http/Newsletters';
import { each } from 'lodash';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  topDiv: {
    display: 'flex'
  }
}));

function Newsletters() {
  const classes = useStyles();
  const [{ data: getNewsletters }, refresh] = GetAllNewsletters();
  const [{ data: responseDelete, error: errorDelete }, deleteNewsletter] = DeleteNewsletter.hook();
  const [key, setKey] = useState(Math.random());
  const [newsletters, setNewsletters] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, closedByButton: false });
  const [showForm, setShowForm] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [id, setId] = useState('');

  const header = ['Sujet de la newsletter', 'Description', 'Nombre de clients'];

  if ((errorDelete) && !snackbar.closedByButton && !snackbar.open)
    setSnackbar({ open: true, closedByButton: false });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, closedByButton: true });
  };

  useEffect(() => {
    if (responseDelete) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDelete]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNewsletters(getNewsletters);
    setKey(Math.random());
  }, [getNewsletters, searchInput]);

  const checkRegex = (array, regex) => {
    return (
      regex.test(array.id) ||
      regex.test(array.subject) ||
      regex.test(array.description)
    );
  };

  const formatResult = () => {
    if (!newsletters) return [];
    let tmp = [];
    each(newsletters['data'], newsletter => {
      if (searchInput) {
        const regex = new RegExp(searchInput, 'i');
        if (checkRegex(newsletter, regex)) {
          tmp.push({
            id: newsletter.id,
            subject: newsletter.subject,
            description: newsletter.description,
            clientsNumber: newsletter.customer_list.length
          });
        }
      } else {
        tmp.push({
          id: newsletter.id,
          subject: newsletter.subject,
          description: newsletter.description,
          clientsNumber: newsletter.customer_list.length
        });
      }
    });
    return tmp;
  };

  const handleCreateNewsletter = () => {
    setShowForm(true);
    setId(0);
  };

  const handleDeleteNewsletter = (id) => {
    DeleteNewsletter.execute(deleteNewsletter, id);
  };

  const handleClickNewsletter = (id) => {
    setId(id);
    setShowForm(true);
  };

  const handleClickReturn = () => {
    setShowForm(false);
  };

  return (
    <Fragment>
      {
        showForm ?
          (
            <Fragment>
              <Button type="button" color="primary" onClick={handleClickReturn} startIcon={<ArrowBackIcon/>}>
                Revenir à la liste
              </Button>

              { id ? <NewsletterForm id={id}/> : <NewsletterForm/> }
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.topDiv}>
                <Button type="button" color="primary" onClick={handleCreateNewsletter}>
                  Créer une newsletter
                </Button>
                <Searchbar onInputChange={input => setSearchInput(input)} />
              </div>

              { getNewsletters
                ? <Table
                  header={header}
                  key={key}
                  rows={formatResult()}
                  onDeleteClick={handleDeleteNewsletter}
                  onRowClick={handleClickNewsletter}
                />
                : null
              }
            </Fragment>
          )
      }

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

export default Newsletters;

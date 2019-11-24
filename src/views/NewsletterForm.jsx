import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GetANewsletters } from 'http/Newsletters';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import TextField from 'components/Form/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  leftText: {
  }
}));

function NewsletterForm({id, editable}) {
  const classes = useStyles();
  const [{ data: getNewsletter }, refresh] = GetANewsletters(id);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [clients, setClients] = useState([]);

  if (!editable) {
    editable = false;
  }

  const parseData = () => {
    if (getNewsletter && getNewsletter.data) {
      setSubject(getNewsletter.data.subject);
      setDescription(getNewsletter.data.description);
      setClients(getNewsletter.data.customer_list);
    }
  };

  useEffect(() => {
    if (getNewsletter) {
      parseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewsletter]);

  return (
    <Fragment>
      <GridContainer spacing={3}>
        <GridItem xs={3}>
          <p className={classes.leftText}>Objet :</p>
        </GridItem>
        <GridItem xs={9}>
          <TextField
            label={"Objet"}
            type={"text"}
            disabled
            value={subject}
            onChange={event => setSubject(event.target.value)}
          />
        </GridItem>
      </GridContainer>
    </Fragment>
  );
}

NewsletterForm.propTypes = {
  id: PropTypes.number.isRequired,
  editable: PropTypes.bool
};


export default NewsletterForm;

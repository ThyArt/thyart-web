import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textContainer: {
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '2%'
  },
  text: {
    fontSize: '22px'
  }
}));

function LandingFooter() {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.textContainer}>
        <p className={classes.text}>
          Une question ? Contactez-nous à{' '}
          <a href="mailto:contact@thyart.fr">contact@thyart.fr</a>
        </p>
        <p>
          &copy; {1900 + new Date().getYear()} <span className={classes.a}>Thyart</span>
        </p>
      </div>
    </Fragment>
  );
}

export default LandingFooter;

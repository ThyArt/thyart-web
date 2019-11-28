/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
        <p className={classes.left}>
          {'Un problème ? Contactez-nous à '}
          <a href="mailto:contact@thyart.fr">contact@thyart.fr</a>
        </p>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()} <span className={classes.a}>Thyart</span>
          </span>
        </p>
    </footer>
  );
}

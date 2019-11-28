import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  dividerFullWidth: {
    margin: `5px 5px 0 ${theme.spacing(2)}px`
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`
  }
}));

export default function SubheaderDividers(props) {
  const classes = useStyles();
  const { entreprise } = props;
  const { projet } = props;
  const { role } = props;
  const { identifiant } = props;
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText primary={'Entreprise'} secondary={entreprise} />
      </ListItem>
      <Divider className={classes.dividerFullWidth} />
      <ListItem>
        <ListItemText primary={'Projet'} secondary={projet} />
      </ListItem>
      <Divider className={classes.dividerFullWidth} />
      <ListItem>
        <ListItemText primary={'Rôle'} secondary={role} />
      </ListItem>
      <Divider className={classes.dividerFullWidth} />
      <ListItem>
        <ListItemText primary={'Identifiant'} secondary={identifiant} />
      </ListItem>
    </List>
  );
}

SubheaderDividers.propTypes = {
  entreprise: PropTypes.string.isRequired,
  projet: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  identifiant: PropTypes.string.isRequired
};

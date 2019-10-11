import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SubmitButton({ label, disabled }) {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

SubmitButton.prototype = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.boolean
};

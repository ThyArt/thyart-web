import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SubmitButton({ label }) {
  const classes = useStyles();

  return (
    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
      {label}
    </Button>
  );
}

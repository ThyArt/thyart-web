import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Thyart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'components/Form/Form';
import TextField from 'components/Form/TextField';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Form title={'Sign Up'} submitLabel={'Sign Up'}>
        <Form.Body>
          <TextField id="username" label="Username" name="username" autoFocus required />
          <TextField id="firstname" label="First name" name="firstname" autoFocus required />
          <TextField id="lastname" label="First name" name="lastname" autoFocus required />
          <TextField
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
          />
          <TextField
            name="password-confirm"
            label="Password confirmation"
            type="password-confirm"
            id="password-confirm"
            autoComplete="current-password-confirm"
            required
          />
        </Form.Body>
        <Form.Footer>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Form.Footer>
      </Form>
    </Grid>
  );
}

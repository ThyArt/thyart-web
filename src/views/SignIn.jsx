import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'components/Form/Form';
import TextField from 'components/Form/TextField';
import CheckBox from 'components/Form/CheckBox';
import Link from 'components/Link/Link';

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

export default function SignIn() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Form title={'Sign In'} submitLabel={'Sign In'}>
        <Form.Body>
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
          <CheckBox label={'Remember me'} value={'remember'} />
        </Form.Body>
        <Form.Footer>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Form.Footer>
      </Form>
    </Grid>
  );
}

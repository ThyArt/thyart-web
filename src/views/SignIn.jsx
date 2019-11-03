import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'components/Form/Form';
import TextField from 'components/Form/TextField';
import CheckBox from 'components/Form/CheckBox';
import Link from 'components/Link/Link';
import { SignIn as SignInRequest } from 'http/Oauth';
import { validateEmail, validatePassword } from 'utils/validators';
import SnackBarWrapper from '../components/SnackBarWrapper/SnackBarWrapper';
import Copyright from 'components/Copyright/Copyright';
import { generateCookie } from 'http/Cookie';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [{ data, error }, execute] = SignInRequest.hook();
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, closedByButton: false });

  if (error && !snackbar.closedByButton && !snackbar.open)
    setSnackbar({ open: true, closedByButton: false });

  if (data) {
    generateCookie(data, rememberMe);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, closedByButton: true });
  };

  const onSubmit = event => {
    event.preventDefault();
    SignInRequest.execute(execute, email.value, password.value);

    setSnackbar({ open: false, closedByButton: false });
  };

  const onChange = (e, setFunc, validateFunc) =>
    setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Form
          className={classes.paper}
          title={'Sign In'}
          submitLabel={'Sign In'}
          onSubmit={onSubmit}
          disabled={!email.value || !password.value || email.error || password.error}
        >
          <Form.Header>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Form.Header>
          <Form.Body>
            <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              required
              onChange={e => onChange(e, setEmail, validateEmail)}
              {...email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={e => onChange(e, setPassword, validatePassword)}
              {...password}
            />
            <CheckBox
              label={'Remember me'}
              value={'remember'}
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
          </Form.Body>
          <Form.Footer>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackBarWrapper
          variant="error"
          message="Unable to connect. Please verify your email and your password"
          onClose={handleClose}
        />
      </Snackbar>
    </Grid>
  );
}

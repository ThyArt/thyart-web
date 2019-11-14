import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'components/Form/Form';
import TextField from 'components/Form/TextField';
import Copyright from 'components/Copyright/Copyright';
import CheckBox from 'components/Form/CheckBox';
import { validateEmail, validatePassword, validateString } from 'utils/validators';
import { SignIn as SignInRequest, SignUp as SignUpRequest } from 'http/Oauth';
import { generateCookie } from 'http/Cookie';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarWrapper from 'components/SnackBarWrapper/SnackBarWrapper';
import { withRouter } from 'react-router-dom';

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

const SignUp = function SignUp({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: false });
  const [firstName, setFirstName] = useState({ value: '', error: false });
  const [lastName, setLastName] = useState({ value: '', error: false });
  const [username, setUsername] = useState({ value: '', error: false });
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: null, closedByButton: false });

  const [
    { data: signInData, error: signInError, loading: signInLoading },
    signInExecute
  ] = SignInRequest.hook();
  const [{ data: signUpData, error: signUpError }, signUpExecute] = SignUpRequest();

  const onChange = (e, setFunc, validateFunc) =>
    setFunc({ value: e.target.value, error: !validateFunc(e.target.value) });

  const formDisabled =
    undefined !==
    _.find(
      [email, password, passwordConfirm, firstName, lastName, username],
      state => state.error || !validateString(state.value)
    );

  const onSubmit = event => {
    event.preventDefault();
    signUpExecute({
      data: {
        email: email.value,
        password: password.value,
        password_confirm: passwordConfirm.value,
        name: username.value,
        lastname: lastName.value,
        firstname: firstName.value
      }
    });

    setSnackbar({ open: false, message: null, closedByButton: false });
  };

  if ((signUpError || signInError) && !snackbar.closedByButton && !snackbar.open) {
    setSnackbar({
      open: true,
      message: 'Error while Signing up. Make sure your Email address is not already used.',
      closedByButton: false
    });
  }

  if (signUpData && !signInData && !signInError && !signInLoading) {
    SignInRequest.execute(signInExecute, email.value, password.value);
    setSnackbar({ open: false, message: null, closedByButton: false });
  }

  if (signInData) {
    generateCookie(signInData, rememberMe);
    history.push('/dashboard');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, closedByButton: true });
  };

  const fields = [
    {
      label: 'Username',
      id: 'username',
      onChange: e => onChange(e, setUsername, validateString),
      ...username
    },
    {
      label: 'First name',
      id: 'first_name',
      onChange: e => onChange(e, setFirstName, validateString),
      ...firstName
    },
    {
      label: 'Last name',
      id: 'last_name',
      onChange: e => onChange(e, setLastName, validateString),
      ...lastName
    },
    {
      label: 'Email Address',
      id: 'email',
      autoComplete: 'email',
      onChange: e => onChange(e, setEmail, validateEmail),
      ...email
    },
    {
      label: 'Password',
      id: 'password',
      type: 'password',
      autoComplete: 'password',
      onChange: e => onChange(e, setPassword, validatePassword),
      ...password
    },
    {
      label: 'Password',
      id: 'password_confirm',
      type: 'password',
      autoComplete: 'password',
      onChange: e => onChange(e, setPasswordConfirm, validatePassword),
      ...passwordConfirm
    }
  ];

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Form
          className={classes.paper}
          title={'Sign Up'}
          submitLabel={'Sign Up'}
          disabled={formDisabled}
          onSubmit={onSubmit}
        >
          <Form.Header>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Form.Header>
          <Form.Body>
            {_.map(fields, field => (
              <TextField key={field.id} name={field.id} {...field} autoFocus required />
            ))}
            <CheckBox
              label={'Remember me'}
              value={'remember'}
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
          </Form.Body>
          <Form.Footer>
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
        <SnackBarWrapper variant="error" message={snackbar.message} onClose={handleClose} />
      </Snackbar>
    </Grid>
  );
};

export default withRouter(SignUp);

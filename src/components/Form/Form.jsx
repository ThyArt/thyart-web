import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SubmitButton from './SubmitButton';
import findByType from 'utils/findByType';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  footer: {}
}));

const useBodyStyles = makeStyles(theme => ({
  body: {}
}));

const useFooterStyles = makeStyles(theme => ({
  footer: {}
}));

const Body = ({ children }) => {
  const classes = useBodyStyles();

  return <div className={classes.body}>{children}</div>;
};

const Footer = ({ children }) => {
  const classes = useFooterStyles();

  return <div className={classes.footer}>{children}</div>;
};

function Form({ title, children, submitLabel, onSubmit, disabled }) {
  const classes = useStyles();

  const body = findByType(children, Body);
  const bodyProps = body ? body.props : null;

  const footer = findByType(children, Footer);
  const footerProps = footer ? footer.props : null;

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form noValidate className={classes.form} onSubmit={onSubmit}>
          <Body {...bodyProps} />
          <SubmitButton label={submitLabel} disabled={disabled} />
          <Footer {...footerProps} />
        </form>
      </div>
    </Grid>
  );
}

Body.prototype = {
  children: PropTypes.element
};

Footer.prototype = {
  children: PropTypes.element
};

Form.prototype = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.function,
  disabled: PropTypes.boolean
};

Form.Body = Body;
Form.Footer = Footer;

export default Form;

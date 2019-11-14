import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SubmitButton from './SubmitButton';
import findByType from 'utils/findByType';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

const useBodyStyles = makeStyles(theme => ({
  body: {}
}));

const useFooterStyles = makeStyles(theme => ({
  footer: {}
}));

const useHeaderStyles = makeStyles(theme => ({
  header: {}
}));

const Body = ({ children }) => {
  const classes = useBodyStyles();

  return <div className={classes.body}>{children}</div>;
};

const Footer = ({ children }) => {
  const classes = useFooterStyles();

  return <div className={classes.footer}>{children}</div>;
};

const Header = ({ children }) => {
  const classes = useHeaderStyles();

  return <div className={classes.header}>{children}</div>;
};

function Form({ title, children, submitLabel, onSubmit, disabled, className }) {
  const classes = useStyles();

  const body = findByType(children, Body);
  const bodyProps = body ? body.props : null;

  const footer = findByType(children, Footer);
  const footerProps = footer ? footer.props : null;

  const header = findByType(children, Header);
  const headerProps = header ? header.props : null;

  return (
    <div className={className}>
      <Header {...headerProps} />
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form noValidate className={classes.form} onSubmit={onSubmit}>
        <Body {...bodyProps} />
        <SubmitButton label={submitLabel} disabled={disabled} />
        <Footer {...footerProps} />
      </form>
    </div>
  );
}

Body.prototype = {
  children: PropTypes.element
};

Footer.prototype = {
  children: PropTypes.element
};

Header.prototype = {
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
Form.Header = Header;

export default Form;

import React from 'react';
import { TextField as BaseTextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function TextField({ id, label, name, autoComplete, autoFocus, required }) {
  return (
    <BaseTextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
    />
  );
}

TextField.prototype = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.boolean,
  required: PropTypes.boolean
};

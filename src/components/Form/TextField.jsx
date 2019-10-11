import React from 'react';
import { TextField as BaseTextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function TextField({
  id,
  label,
  name,
  autoComplete,
  autoFocus,
  required,
  onChange,
  value,
  error,
  type
}) {
  return (
    <BaseTextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onChange={onChange}
      value={value}
      error={error}
    />
  );
}

TextField.prototype = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.boolean,
  required: PropTypes.boolean,
  onChange: PropTypes.function,
  value: PropTypes.string,
  error: PropTypes.boolean,
  type: PropTypes.string
};

import React from 'react';
import { TextField as BaseTextField } from '@material-ui/core';

export default function TextField({ id, label, name, autoComplete, autofocus, required }) {
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
      autoFocus={autofocus}
    />
  );
}

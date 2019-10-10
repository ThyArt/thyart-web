import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox({ value, label }) {
  return <FormControlLabel control={<Checkbox value={value} color="primary" />} label={label} />;
}

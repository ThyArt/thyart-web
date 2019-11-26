import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

export default function CheckBox({ value, label, checked, onChange }) {
  return (
    <FormControlLabel
      control={<Checkbox value={value} color="primary" checked={checked} onChange={onChange} />}
      label={label}
    />
  );
}

CheckBox.prototype = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.boolean,
  onChange: PropTypes.function
};

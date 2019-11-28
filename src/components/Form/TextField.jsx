import React from 'react';
import { MenuItem, TextField as BaseTextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { map } from 'lodash';
export default function TextField({ items = [], select = false, ...rest }) {
  return (
    <BaseTextField variant="outlined" margin="normal" fullWidth select={select} {...rest}>
      {select
        ? map(items, ({ key, value }) => (
            <MenuItem key={value} value={value}>
              {key}
            </MenuItem>
          ))
        : null}
    </BaseTextField>
  );
}

TextField.prototype = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.boolean,
  required: PropTypes.boolean,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.boolean,
  type: PropTypes.string,
  select: PropTypes.boolean,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string,
      value: PropTypes.string
    })
  )
};

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MSelect from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));

function Select({ rows, onSelect, multiple, labelName }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  if (!multiple) {
    multiple = false;
  }
  if (!onSelect) {
    onSelect = function(id) {};
  }
  if (!labelName) {
    labelName = 'Séléctionnez';
  }

  const handleChange = async event => {
    if (Array.isArray(event.target.value)) {
      setSelected(event.target.value);
    } else {
      setSelected([event.target.value]);
    }
  };

  const findByID = id => {
    const found = rows.find(elem => elem.id === id);
    return found.name;
  };

  useEffect(() => {
    onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel>{labelName}</InputLabel>
        <MSelect
          multiple={multiple}
          value={selected}
          onChange={handleChange}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={findByID(value)} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {rows.map(row => (
            <MenuItem key={row.id} value={row.id}>
              {row.name}
            </MenuItem>
          ))}
        </MSelect>
      </FormControl>
    </Fragment>
  );
}

Select.propTypes = {
  rows: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  multiple: PropTypes.bool,
  labelName: PropTypes.string
};

export default Select;
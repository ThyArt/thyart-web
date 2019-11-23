import React, { Fragment, useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.dark, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.dark, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    width: theme.spacing(7),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function Searchbar({onInputChange}) {
  const classes = useStyles();
  const [input, setInput] = useState('');

  if (!onInputChange) {
    onInputChange = function(txt) {};
  }

  const handleChange = event => {
    setInput(event.target.value);
  };

  const clearInput = () => {
    setInput('');
  };

  useEffect(() => {
    onInputChange(input);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <Fragment>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={input}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={clearInput}>
                <ClearIcon/>
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </Fragment>
  );
}

Searchbar.propTypes = {
  onInputChange: PropTypes.func
};


export default Searchbar;

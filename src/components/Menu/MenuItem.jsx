import React from 'react';
import { MenuItem as BaseMenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

function MenuItem({ text, onClick }) {
  return <BaseMenuItem onClick={onClick}>{text}</BaseMenuItem>;
}

MenuItem.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default MenuItem;

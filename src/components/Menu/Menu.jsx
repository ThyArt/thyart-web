import React from 'react';
import { Menu as BaseMenu } from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { map } from 'lodash';

function Menu({ className, anchorEl, id, onClose, items }) {
  return (
    <BaseMenu
      anchorEl={anchorEl}
      className={className}
      open={Boolean(anchorEl)}
      keepMounted
      id={id}
      onClose={onClose}
    >
      {map(items, ({ text, onClick }) => (
        <MenuItem
          key={text}
          text={text}
          onClick={() => {
            onClick();
          }}
        />
      ))}
    </BaseMenu>
  );
}

Menu.propTypes = {
  className: PropTypes.string,
  anchorEl: PropTypes.object,
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      text: PropTypes.string,
      onClick: PropTypes.func
    })
  )
};

export default Menu;

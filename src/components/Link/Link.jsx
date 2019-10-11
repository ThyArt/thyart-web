import React from 'react';
import { Link as BaseReactLink } from 'react-router-dom';
import { Link as BaseMaterialLink } from '@material-ui/core';
import PropTypes from 'prop-types';

const forwardedLink = React.forwardRef((props, ref) => <BaseReactLink innerRef={ref} {...props} />);

export default function Link({ color, variant, underline, className, to, children }) {
  return (
    <BaseMaterialLink
      component={forwardedLink}
      color={color}
      variant={variant}
      underline={underline}
      className={className}
      to={to}
    >
      {children}
    </BaseMaterialLink>
  );
}

Link.prototype = {
  children: PropTypes.element,
  color: PropTypes.string,
  variant: PropTypes.string,
  underline: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};

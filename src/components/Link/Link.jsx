import React from 'react';
import { Link as BaseReactLink } from 'react-router-dom';
import { Link as BaseMaterialLink } from '@material-ui/core';

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

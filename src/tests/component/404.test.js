import React from 'react';
import NotFound from '../../containers/404';
import { shallow } from 'enzyme/build';

it('renders without crashing', () => {
  shallow(<NotFound />);
});
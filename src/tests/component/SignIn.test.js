import React from 'react';
import { shallow } from 'enzyme/build';
import SignIn from '../../containers/SignIn'

it('renders without crashing', () => {
  shallow(<SignIn />);
});
import React from 'react';
import { shallow } from 'enzyme/build';
import LandingPage from '../../containers/LandingPage'

it('renders without crashing', () => {
  shallow(<LandingPage />);
});
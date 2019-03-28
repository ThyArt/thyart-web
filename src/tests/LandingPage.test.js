import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../containers/LandingPage'

it('renders without crashing', () => {
  shallow(<LandingPage />);
});
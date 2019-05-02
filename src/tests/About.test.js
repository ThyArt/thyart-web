import React from 'react';
import About from '../containers/About';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<About />);
});
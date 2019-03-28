import React from 'react';
import Carousel from '../components/Carousel';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Carousel />);
});
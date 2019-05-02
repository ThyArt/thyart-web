import React from 'react';
import Header from '../components/Header';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Header/>);
});
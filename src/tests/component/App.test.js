import React from 'react';
import App from '../../App';
import { shallow } from 'enzyme/build';

it('renders without crashing', () => {
  shallow(<App />);
});
import React from 'react';
import { shallow } from 'enzyme';
import Services from "../containers/Services";

it('renders without crashing', () => {
  shallow(<Services />);
});
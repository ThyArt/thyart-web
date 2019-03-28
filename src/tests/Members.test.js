import React from 'react';
import { shallow } from 'enzyme';
import {Members} from "../components/account/Members";

it('renders without crashing', () => {
  shallow(<Members />);
});
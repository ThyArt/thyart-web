import React from 'react';
import { shallow } from 'enzyme';
import {Scheduler} from "../components/account/Scheduler";

it('renders without crashing', () => {
  shallow(<Scheduler />);
});
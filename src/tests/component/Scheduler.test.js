import React from 'react';
import { shallow } from 'enzyme/build';
import {Scheduler} from "../../components/account/Scheduler";

it('renders without crashing', () => {
  shallow(<Scheduler />);
});
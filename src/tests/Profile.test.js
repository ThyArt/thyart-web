import React from 'react';
import { shallow } from 'enzyme';
import {Profile} from "../components/account/Profile";

const props = {
  dispatch: jest.fn(),
  isLogged: true,
  isFetching: false
};

it('renders without crashing', () => {
  shallow(<Profile {...props}/>);
});
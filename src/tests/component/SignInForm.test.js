import React from 'react';
import { shallow } from 'enzyme/build';
import {SignInForm} from "../../components/SignInForm";

const props = {
  dispatch: jest.fn()
};

it('renders without crashing', () => {
  shallow(<SignInForm {...props}/>);
});
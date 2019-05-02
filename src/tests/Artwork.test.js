import React from 'react';
import { shallow } from 'enzyme';
import {Artwork} from "../components/account/Artwork";

const props = {
  dispatch: jest.fn(),
  isLogged: true,
  isFetching: false
};

it('renders without crashing', () => {
  shallow(<Artwork {...props}/>);
});
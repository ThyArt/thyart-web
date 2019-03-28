import React from 'react';
import { Account } from '../containers/Account';
import { shallow } from 'enzyme';

const props = {
  dispatch: jest.fn(),
    isLogged: true
};

it('renders without crashing', () => {
  shallow(<Account {...props} />);
});
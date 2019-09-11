import React from "react";
import { shallow } from "enzyme/build";
import { Members } from "../../components/account/Members";

const props = {
  dispatch: jest.fn(),
  isFetching: false
};

it("renders without crashing", () => {
  shallow(<Members {...props} />);
});
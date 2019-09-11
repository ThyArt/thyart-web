import React from "react";
import { shallow } from "enzyme/build";
import { SignUpForm } from "../../components/SignUpForm";

const props = {
  dispatch: jest.fn()
};

it("renders without crashing", () => {
  shallow(<SignUpForm {...props}/>);
});
import React from "react";
import { shallow } from "enzyme/build";
import SignUp from "../../containers/SignUp";

describe("<SignUp />", () => {
  it("renders without crashing", () => {
    shallow(<SignUp/>);
  });
});
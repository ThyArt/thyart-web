import React from "react";
import { shallow } from "enzyme/build";
import Contact from "../../containers/Contact";

it("renders without crashing", () => {
  shallow(<Contact/>);
});
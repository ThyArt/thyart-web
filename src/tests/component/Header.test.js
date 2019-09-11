import React from "react";
import Header from "../../components/Header";
import { shallow } from "enzyme/build";

it("renders without crashing", () => {
  shallow(<Header/>);
});
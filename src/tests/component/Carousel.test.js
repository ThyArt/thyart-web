import React from "react";
import Carousel from "../../components/Carousel";
import { shallow } from "enzyme/build";

it("renders without crashing", () => {
  shallow(<Carousel/>);
});
import React from "react";
import {render} from "@testing-library/react";
import Button from "./button";

describe("test Button component", () => {
  it("should render the correct default button", function () {
    const wrapper = render(<Button>React</Button>);
    const element = wrapper.getByText("React");
    expect(element).toBeInTheDocument(); //是否在文档中
    expect(element.tagName).toEqual('BUTTON'); //判断是否为 Button
    expect(element).toHaveClass('genshin-btn genshin-btn-default');// 判断 element 上是否包含类名
  });
  it("should render the correct component based on different props", function () {

  });
  it("should render a link when btnType equals link and href is provided", function () {

  });
  it("should render disabled button when disabled set to true", function () {

  });
});

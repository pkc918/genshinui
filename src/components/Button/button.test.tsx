import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Button, {ButtonProps} from "./button";

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "genshin"
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button component", () => {
  it("should render the correct default button", function () {
    const wrapper = render(<Button {...defaultProps}>React</Button>);
    const element = wrapper.getByText("React") as HTMLButtonElement;
    expect(element).toBeInTheDocument(); //是否在文档中
    expect(element.tagName).toEqual("BUTTON"); //判断是否为 Button
    expect(element).toHaveClass("genshin-btn genshin-btn-default");// 判断 element 上是否包含类名
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element); // 调用element点击事件
    expect(defaultProps.onClick).toHaveBeenCalled(); // toBeUndefined判断值为 undefined toHaveBeenCalled 事件被调用
  });
  it("should render the correct component based on different props", function () {
    const wrapper = render(<Button {...testProps} >React</Button>);
    const element = wrapper.getByText("React") as HTMLButtonElement;
    expect(element).toBeInTheDocument(); //是否在文档中
    expect(element).toHaveClass("genshin genshin-btn-primary genshin-btn-lg");
  });
  it("should render a link when btnType equals link and href is provided", function () {
    const wrapper = render(<Button btnType="link" hrefLink="http://pkc.com">React</Button>);
    const element = wrapper.getByText("React") as HTMLAreaElement;
    expect(element).toBeInTheDocument(); //是否在文档中
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("genshin-btn genshin-btn-link");
  });
  it("should render disabled button when disabled set to true", function () {
    const wrapper = render(<Button {...disabledProps} >React</Button>);
    const element = wrapper.getByText("React") as HTMLButtonElement;
    expect(element).toBeInTheDocument(); //是否在文档中
    expect(element.disabled).toBeTruthy(); //断言为 真值
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});

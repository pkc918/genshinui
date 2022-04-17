import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test"
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical" // 垂直
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        pkc
      </MenuItem>
      <SubMenu title="hahaha">
        <MenuItem>hahaha1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
    .genshin-submenu{
      display: none;
    }
    .genshin-submenu.menu-opend{
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", function () {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("genshin-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", function () {
    const thirdItem = wrapper.getByText("pkc");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode when mode is set to vertical", function () {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("hahaha1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("hahaha");
    fireEvent.mouseEnter(dropdownElement);
    // 这里有所不同，直接使用了 await
    await (() => {
      expect(wrapper.queryByText("hahaha1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("hahaha1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    await (() => {
      expect(wrapper.queryByText("hahaha1")).not.toBeVisible();
    });
  });
});

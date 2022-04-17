import React, {useContext, FunctionComponentElement, useState} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";
import {MenuItemProps} from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {index, children, title, className} = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical"
  });

  // 点击切换展示隐藏
  const handleClick = (e: React.MouseEvent) => {
    console.log(111);
    e.preventDefault();
    setOpen(!menuOpen);
  };

  // 当是横向导航栏，下拉框变成鼠标移动显示，离开隐藏，纵向，点击切换
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents = context.mode === "vertical" ? {
    onClick: handleClick
  } : {};
  const hoverEvents = context.mode !== "vertical" ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false);
    }
  } : {};

  // 判断 子组件只能有 menuitem
  const renderChildren = () => {
    const subMenuClasses = classNames("genshin-submenu", {
      "menu-opened": menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error("Warning: SubMenu's children is only MenuItem component");
      }
    });
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    );
  };


  return (
    <li
      key={index}
      className={classes}
      onMouseEnter={hoverEvents.onMouseEnter}
      onMouseLeave={hoverEvents.onMouseLeave}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

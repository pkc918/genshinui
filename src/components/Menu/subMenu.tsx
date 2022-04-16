import React, {useContext, FunctionComponentElement, useState} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";
import {MenuItemProps} from "./menuItem";

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {index, children, title, className} = props;
  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index
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
    const childrenComponent = React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return childElement;
      } else {
        console.error("Warning: SubMenu's children is only MenuItem component");
      }
    });
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    );
  };


  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

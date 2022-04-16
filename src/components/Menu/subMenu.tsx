import React, {useContext, FunctionComponentElement} from "react";
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
  const context = useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index
  });
  // 判断 子组件只能有 menuitem
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return childElement;
      } else {
        console.error("Warning: SubMenu's children is only MenuItem component");
      }
    });
    return (
      <ul className="genshin-submenu">
        {childrenComponent}
      </ul>
    );
  };
  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

import React, {createContext, useState} from "react";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";

// 组件的展示方向
type MenuMode = "horizontal" | "vertical"
type SelectCallback = (selectedIndex: string) => void;

// MenuProps
export interface MenuProps {
  defaultIndex?: string; // 默认选中的item
  className?: string; // 类名
  mode?: MenuMode; // 展示方向
  style?: React.CSSProperties; // 样式
  onSelect?: (selectedIndex: string) => void; // select 方法
}

// 使用 useContext 作为组件间的传值
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({index: "0"});

const Menu: React.FC<MenuProps> = (props) => {
  const {className, mode, style, children, defaultIndex, onSelect} = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("genshin-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical"
  });
  // onSelect 的回调函数
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // Context 需要传递出去的参数
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode: mode
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: `${index}`
        });
      } else {
        console.error("Warning: Menu's children is only MenuItem component");
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal"
};

export default Menu;

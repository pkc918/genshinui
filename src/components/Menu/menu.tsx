import React from "react";
import classNames from "classnames";

// 组件的展示方向
type MenuMode = "horizontal" | "vertical"

export interface MenuProps {
  defaultIndex?: number; // 默认选中的item
  className?: string; // 类名
  mode?: MenuMode; // 展示方向
  style?: React.CSSProperties; // 样式
  onSelect?: (selectedIndex: number) => void; // select 方法
}

const Menu: React.FC<MenuProps> = (props) => {
  const {className, mode, style, children, defaultIndex} = props;
  const classes = classNames("genshin-menu", className, {
    "menu-vertical": mode === "vertical"
  });

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}

export default Menu;

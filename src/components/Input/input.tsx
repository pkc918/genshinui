import React, {ChangeEvent, InputHTMLAttributes, ReactElement} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon";

type InputSize = "lg" | "sm" | "md";

// Omit<类型, 属性> 忽略类型种的属性值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean; // 禁用
  size?: InputSize; // 大小
  icon?: IconProp; // 图标
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // 输入事件
}

const Input: React.FC<InputProps> = (props) => {
  // 取除各种属性
  const {disabled, size, style, icon, prepend, append, children, className, ...restProps} = props;
  // 根据属性添加不同的 className
  const classes = classNames("genshin-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend
  });
  // 处理 value 属性
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    // 根据属性判断添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className={"genshin-input-group-prepend"}>{prepend}</div>}
      {icon && <div className={"icon-wrapper"}><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        className={"genshin-input-inner"}
        disabled={disabled}
        {...restProps}
      />
      {append && <div className={"genshin-input-group-append"}>{append}</div>}
    </div>
  );
};

export default Input;

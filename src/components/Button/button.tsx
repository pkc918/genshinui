import React from "react";
import classNames from "classnames";

// 创建枚举
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link"
}

// 创建 props 接口
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  hrefLink?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    hrefLink
  } = props;

  const classes = classNames("btn", {
    [`genshin-btn-${btnType}`]: btnType,
    [`genshin-btn-${size}`]: size,
    "disabled": (btnType === ButtonType.Link) && disabled
  });
  if (btnType === ButtonType.Link && hrefLink) {
    return (
      <a className={classes} href={hrefLink}>
        {children}
      </a>
    );
  }else {
    return (
      <button
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
};

// 默认 props
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;

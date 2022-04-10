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

// 拿到所有 Button 属性
// & 合并
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// Partial 将所有参数设置为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;


const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    hrefLink,
    ...restProps
  } = props;

  const classes = classNames("genshin-btn", className, {
    [`genshin-btn-${btnType}`]: btnType,
    [`genshin-btn-${size}`]: size,
    "disabled": (btnType === ButtonType.Link) && disabled
  });
  if (btnType === ButtonType.Link && hrefLink) {
    return (
      <a
        className={classes}
        href={hrefLink}
        {...restProps}

      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
};

// 默认 props
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
};

export default Button;

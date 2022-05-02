import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  percent: number; // 百分比
  strokeHeight?: number; // 高度
  showText?: boolean; // 里面文字
  styles?: React.CSSProperties; // 自定义样式
  theme?: ThemeProps; // 主题样式
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme
  } = props;
  return (
    <div className="genshin-progress-bar" style={styles}>
      <div className="genshin-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`genshin-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
}

export default Progress;

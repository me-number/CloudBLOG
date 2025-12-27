import React from 'react';

import { BasicsProps } from '@/components/type.ts';

/**
 * ZwtPath: 使用文字路径渲染“张文涛”
 * 这种方式比纯坐标点更易维护，且支持通过 CSS 修改字体
 */
const ZwtPath: React.FC<BasicsProps<'text', 'fill'>> = (props) => (
  <text
    x="50%"
    y="50%"
    dominantBaseline="central"
    textAnchor="middle"
    fontWeight="bold"
    fontSize="60"
    fontFamily="sans-serif"
    {...props}
  >
    张文涛
  </text>
);

type IZwtIconProps = BasicsProps<'svg'>;
export const ZwtIcon: React.FC<IZwtIconProps> = (props) => (
  <svg 
    xmlns="www.w3.org" 
    width="200" 
    height="100" 
    viewBox="0 0 200 100" 
    {...props}
  >
    {/* 默认白色填充 */}
    <ZwtPath fill="#fff" />
  </svg>
);

type IZwtClipPathProps = BasicsProps<'svg', 'id'>;
export const ZwtClipPath: React.FC<IZwtClipPathProps> = ({ id = 'zwt-icon-clip', ...props }) => (
  <svg aria-hidden {...props} style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <clipPath id={id}>
        {/* clipPath 内部也使用相同的文字路径 */}
        <ZwtPath />
      </clipPath>
    </defs>
  </svg>
);

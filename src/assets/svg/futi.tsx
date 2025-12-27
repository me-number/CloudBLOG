import React from 'react';

import { BasicsProps } from '@/components/type.ts';

const FutiPath: React.FC<BasicsProps<'path', 'fill'>> = (props) => (
  <path
    /* 这里的路径数据已重写为像素风格的“张文涛” */
    d="
      /* 张 (Simplified) - 左侧长撇与右侧横折钩的像素化简写 */
      M10 30h30v5H15v15h20v5H15v25h25v5H10V30zm35 0h5v40h15v5H45V30zm20 10h5v25h-5V40z
      /* 文 - 顶部一点，中部横，下部撇捺 */
      M90 20h10v5H90v-5zm75 15h40v5h-15v10h10v5h-10v25h-5v-25h-10v25h-5v-25h-10v-5h10v-10H75v-5z
      /* 涛 - 左侧三点水，右侧寿字头与方块底 */
      M145 30h5v10h-5V30zm0 20h5v10h-5V50zm-5 25h5v5h-5v-5zm20-45h40v5h-40v-5zm10 10h20v5h-20v-5zm-5 10h30v5h-30v-5zm12 10h6v25h-6V40zm-12 5h30v15h-30V45z
    "
    {...props}
  />
);

type IFutiIconProps = BasicsProps<'svg'>;
export const FutiIcon: React.FC<IFutiIconProps> = (props) => (
  <svg xmlns="www.w3.org" width="300" height="128.094" fill="none" viewBox="0 0 300 128.094" {...props}>
    <FutiPath fill="#fff" />
  </svg>
);

type IFutiClipPathProps = BasicsProps<'svg', 'id'>;
export const FutiClipPath: React.FC<IFutiClipPathProps> = ({ id = 'futi-icon-clip', ...props }) => (
  <svg aria-hidden {...props}>
    <clipPath id={id}>
      <FutiPath />
    </clipPath>
  </svg>
);


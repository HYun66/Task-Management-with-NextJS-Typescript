import { extendVariants } from '@heroui/system';
import { themePaddingOptions } from 'common/themeOptions';
import React, { ElementType } from 'react';

export type BoxProps = {
  children: React.ReactNode;
  component?: ElementType;
  className?: string;
  id?: string;
  onClick?: () => void;
};

const BoxComponent: React.FC<BoxProps> = ({ children, className = '', id, onClick, component: Component = 'div' }) => {
  return (
    <Component className={className} data-testid={id} id={id} onClick={onClick}>
      {children}
    </Component>
  );
};

export default extendVariants(BoxComponent, {
  variants: {
    display: {
      none: 'hidden',
      block: 'block',
      inline: 'inline',
      flex: 'flex',
      flexInline: 'inline-flex',
      grid: 'grid',
      contents: 'contents',
    },
    justifyContent: {
      start: 'flex justify-start',
      center: 'flex justify-center',
      end: 'flex justify-end',
      between: 'flex justify-between',
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    flex: {
      1: 'flex flex-1',
      auto: 'flex flex-auto',
      initial: 'flex flex-initial',
      none: 'flex flex-none',
      '1/2': 'flex flex-[40%]',
    },
    flexDirection: {
      row: 'flex flex-row',
      column: 'flex flex-col',
      rowReverse: 'flex flex-row-reverse',
      columnReverse: 'flex flex-col-reverse',
    },
    padding: themePaddingOptions,
  },
});

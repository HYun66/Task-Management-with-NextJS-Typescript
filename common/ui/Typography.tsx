import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type TypographyProps = {
  id: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
};

export const Typography: React.FC<TypographyProps> = ({ id, variant = 'body', children, className = '' }) => {
  const baseClasses = 'text-foreground';
  const variantClasses = {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-medium',
    body: 'text-base',
    caption: 'text-sm text-foreground-500',
  };

  const Tag = variant.startsWith('h') ? variant : 'p';

  return (
    <Tag className={twMerge(clsx(baseClasses, variantClasses[variant], className))} data-testid={id} id={id}>
      {children}
    </Tag>
  );
};

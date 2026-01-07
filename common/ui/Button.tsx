import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps, PressEvent } from '@heroui/button';

export type ButtonProps = HeroButtonProps & {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isFullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  onPress,
  disabled = false,
  type = 'button',
  className = '',
  isFullWidth,
  ...rest
}) => {
  const handlePress = (pressEvent: PressEvent): void => {
    // @todo add logic to send analytics event on press

    if (onPress) {
      onPress(pressEvent);
    }
  };

  return (
    <HeroButton
      className={className}
      data-testid={id}
      fullWidth={isFullWidth}
      id={id}
      isDisabled={disabled}
      type={type}
      onPress={handlePress}
      {...rest}
    >
      {children}
    </HeroButton>
  );
};

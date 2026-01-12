import React from 'react';
import { Switch as HeroSwitch, SwitchProps as HeroSwitchProps } from '@heroui/switch';

export type SwitchProps = Omit<HeroSwitchProps, 'onValueChange'> & {
  id: string;
  className?: string;
  onChange?: (value: boolean) => void;
};

export const Switch: React.FC<SwitchProps> = ({ id, className = '', onChange, isSelected, ...rest }) => {
  const handleValueChange = (value: boolean): void => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <HeroSwitch
      id={id}
      data-testid={id}
      className={className}
      isSelected={isSelected}
      onValueChange={handleValueChange}
      {...rest}
    />
  );
};

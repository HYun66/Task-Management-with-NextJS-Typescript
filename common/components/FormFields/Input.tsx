import React, { forwardRef, ReactElement } from 'react';
import { Input as NextInput, InputProps } from '@heroui/input';
import { useField } from 'formik';

export type InputProperties = InputProps & {
  id: string;
  name: string;
  placeholder: string;
  label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProperties>(
  ({ name, id, labelPlacement = 'outside', placeholder, ...rest }, reference): ReactElement => {
    const [{ onChange: handleChange, value }, { error, touched }] = useField<string>(name);

    return (
      <NextInput
        aria-label={rest.label}
        aria-labelledby={`${id}-label`}
        data-testid={id}
        domRef={reference}
        errorMessage={touched && error !== undefined ? error : undefined}
        id={id}
        isInvalid={touched && error !== undefined}
        labelPlacement={labelPlacement}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

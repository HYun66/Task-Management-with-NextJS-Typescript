import React, { forwardRef, ReactElement } from 'react';
import { Textarea as NextTextarea, TextAreaProps } from '@heroui/input';
import { useField } from 'formik';

export type TextareaProperties = TextAreaProps & {
  id: string;
  name: string;
  placeholder: string;
  label: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProperties>(
  ({ name, id, labelPlacement = 'outside', placeholder, ...rest }, reference): ReactElement => {
    const [{ onChange: handleChange, value }, { error, touched }] = useField<string>(name);

    return (
      <NextTextarea
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

Textarea.displayName = 'Textarea';

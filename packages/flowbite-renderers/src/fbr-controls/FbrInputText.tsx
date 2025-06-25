/*
  The MIT License

  Copyright (c) 2024

  Simplified Flowbite implementation of a JSON Forms text input cell.
  Replaces previous MUI-based renderer.
*/
import React from 'react';
import { CellProps, WithClassname } from '@jsonforms/core';
import { TextInput, Label } from 'flowbite-react';
import merge from 'lodash/merge';
import { useDebouncedChange, useFocus, WithInputProps } from '../util';

interface FbrTextInputProps {
  placeholder?: string;
}

const eventToValue = (ev: React.ChangeEvent<HTMLInputElement>) =>
  ev.target.value === '' ? undefined : ev.target.value;

export const FbrInputText = React.memo(function FbrInputText(
  props: CellProps & WithClassname & FbrTextInputProps & WithInputProps
) {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    data,
    config,
    className,
    id,
    enabled,
    uischema,
    isValid,
    path,
    handleChange,
    schema,
    label,
    placeholder,
  } = props;

  const maxLength = schema?.maxLength;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const [inputText, onChange] = useDebouncedChange(
    handleChange,
    '',
    data,
    path,
    eventToValue,
    300,
    true,
    focused
  );

  return (
    <div className={className}>
      {label && <Label htmlFor={id} value={label} />}
      <TextInput
        id={id}
        disabled={!enabled}
        type={
          appliedUiSchemaOptions.format === 'password' ? 'password' : 'text'
        }
        value={inputText ?? ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        required={!!schema?.required}
        maxLength={maxLength}
        color={isValid ? undefined : 'failure'}
      />
    </div>
  );
});

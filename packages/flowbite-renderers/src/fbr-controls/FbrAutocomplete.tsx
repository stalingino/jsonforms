/*
  The MIT License

  Copyright (c) 2017-2020 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React, { ReactNode } from 'react';
import {
  ControlProps,
  EnumCellProps,
  EnumOption,
  isDescriptionHidden,
  WithClassname,
} from '@jsonforms/core';
import { Label, TextInput, HelperText } from 'flowbite-react';
import merge from 'lodash/merge';
import { useFocus } from '../util/focus';

interface WithOptionLabel {
  getOptionLabel?(option: EnumOption): string;
  renderOption?(option: EnumOption, state: unknown): ReactNode;
}

export const FbrAutocomplete = (
  props: ControlProps & EnumCellProps & WithClassname & WithOptionLabel
) => {
  const {
    description,
    errors,
    visible,
    required,
    label,
    data,
    className,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    options,
    config,
    getOptionLabel,
    isValid,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const [inputValue, setInputValue] = React.useState(data ?? '');
  const [focused, onFocus, onBlur] = useFocus();

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const firstHelperText = showDescription
    ? description
    : !isValid
      ? errors
      : null;
  const secondHelperText = showDescription && !isValid ? errors : null;

  if (!visible) {
    return null;
  }

  const datalistId = `${id}-list`;

  return (
    <div className={className}>
      {label && <Label htmlFor={id} value={label} />}
      <TextInput
        list={datalistId}
        id={id}
        disabled={!enabled}
        value={inputValue}
        onChange={(ev) => {
          setInputValue(ev.target.value);
          const match = options?.find(
            (o) =>
              (getOptionLabel ? getOptionLabel(o) : o.label) === ev.target.value
          );
          handleChange(path, match ? match.value : ev.target.value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        color={isValid ? undefined : 'failure'}
      />
      <datalist id={datalistId}>
        {options?.map((o) => (
          <option
            key={o.value}
            value={getOptionLabel ? getOptionLabel(o) : o.label}
          />
        ))}
      </datalist>
      {firstHelperText && (
        <HelperText color={isValid ? undefined : 'failure'}>
          {firstHelperText}
        </HelperText>
      )}
      {secondHelperText && (
        <HelperText color={isValid ? undefined : 'failure'}>
          {secondHelperText}
        </HelperText>
      )}
    </div>
  );
};

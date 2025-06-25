/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
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
import React from 'react';
import { EnumCellProps, WithClassname } from '@jsonforms/core';
import { Label, Select } from 'flowbite-react';
import merge from 'lodash/merge';
import { useFocus, WithInputProps } from '../util';

export const FbrSelect = React.memo(function FbrSelect(
  props: EnumCellProps & WithClassname & WithInputProps
) {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    data,
    path,
    handleChange,
    options,
    schema,
    config,
    uischema,
    className,
    id,
    enabled,
    isValid,
    label,
  } = props;

  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <div className={className}>
      {label && <Label htmlFor={id} value={label} />}
      <Select
        id={id}
        value={data ?? ''}
        disabled={!enabled}
        onChange={(ev) =>
          handleChange(
            path,
            ev.target.value === '' ? undefined : ev.target.value
          )
        }
        onFocus={onFocus}
        onBlur={onBlur}
        color={isValid ? undefined : 'failure'}
        required={!!schema?.required}
      >
        {!schema?.default && !schema?.required && <option value=''>—</option>}
        {options?.map((opt) => (
          <option key={opt.value ?? ''} value={opt.value ?? ''}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
});

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
import { CellProps, WithClassname } from '@jsonforms/core';
import { Checkbox, Label } from 'flowbite-react';
import merge from 'lodash/merge';
import { useFocus, WithInputProps } from '../util';

export const FbrCheckbox = React.memo(function FbrCheckbox(
  props: CellProps & WithClassname & WithInputProps
) {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    data,
    path,
    handleChange,
    config,
    uischema,
    className,
    id,
    enabled,
    isValid,
    label,
  } = props;

  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const checked = data === true;

  return (
    <div className={className} onFocus={onFocus} onBlur={onBlur}>
      <Label htmlFor={id} className='mr-2'>
        {label}
      </Label>
      <Checkbox
        id={id}
        checked={checked}
        disabled={!enabled}
        onChange={(ev) => handleChange(path, ev.target.checked)}
        color={isValid ? undefined : 'failure'}
      />
    </div>
  );
});

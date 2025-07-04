import React, { ReactNode } from 'react';
import {
  ControlProps,
  EnumCellProps,
  EnumOption,
  isDescriptionHidden,
  WithClassname,
} from '@jsonforms/core';

import {
  Autocomplete,
  AutocompleteRenderOptionState,
  FilterOptionsState,
  FormHelperText,
  TextField,
} from '@mui/material';
import merge from 'lodash/merge';
import { useFocus } from '../util/focus';

export interface WithOptionLabel {
  getOptionLabel?(option: EnumOption): string;
  renderOption?(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: EnumOption,
    state: AutocompleteRenderOptionState
  ): ReactNode;
  filterOptions?(
    options: EnumOption[],
    state: FilterOptionsState<EnumOption>
  ): EnumOption[];
}

export const MuiAutocomplete = (
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
    renderOption,
    filterOptions,
    isValid,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const [inputValue, setInputValue] = React.useState(data ?? '');
  const [focused, onFocus, onBlur] = useFocus();

  const findOption = options.find((o) => o.value === data) ?? null;

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const firstFormHelperText = showDescription
    ? description
    : !isValid
      ? errors
      : null;
  const secondFormHelperText = showDescription && !isValid ? errors : null;

  if (!visible) {
    return null;
  }

  return (
    <>
      <Autocomplete
        className={className}
        id={id}
        disabled={!enabled}
        value={findOption}
        onChange={(_event: any, newValue: EnumOption | null) => {
          handleChange(path, newValue?.value);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        autoHighlight
        autoComplete
        fullWidth
        options={options}
        getOptionLabel={getOptionLabel || ((option) => option?.label)}
        freeSolo={false}
        renderInput={(params) => {
          return (
            <TextField
              label={label}
              type='text'
              inputProps={params.inputProps}
              inputRef={params.InputProps.ref}
              autoFocus={appliedUiSchemaOptions.focus}
              disabled={!enabled}
              {...params}
              id={id}
              required={
                required && !appliedUiSchemaOptions.hideRequiredAsterisk
              }
              error={!isValid}
              fullWidth={!appliedUiSchemaOptions.trim}
              InputLabelProps={data ? { shrink: true } : undefined}
              onFocus={onFocus}
              onBlur={onBlur}
              focused={focused}
            />
          );
        }}
        renderOption={renderOption}
        filterOptions={filterOptions}
      />
      <FormHelperText error={!isValid && !showDescription}>
        {firstFormHelperText}
      </FormHelperText>
      <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
    </>
  );
};

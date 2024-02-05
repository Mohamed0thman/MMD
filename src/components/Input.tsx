import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import { useController } from 'react-hook-form';

import { Theme, useRestyleTheme } from '../style/theme';

import { Box, StyledText } from '.';
import { TextField } from './TextField';

type InputVariants = VariantProps<Theme, 'inputVariants'>;
type InputVariant = InputVariants['variant'];
type InputValue = string | null;
type InputProps = TextInputProps & {
  label: string;
  inputVariant?: InputVariant;
  radioListData?: string[];
  onChange?: (value?: InputValue) => void;
  error?: string;
};

const variant = createVariant<Theme, 'inputVariants'>({
  themeKey: 'inputVariants',
  defaults: {
    paddingVertical: 'xs',
    paddingHorizontal: 's',
    gap: 'xs',
  },
});

const InputContainer = createRestyleComponent<
  InputVariants & React.ComponentProps<typeof Box>,
  Theme
>([variant], Box);

const Input = forwardRef(function Input(
  {
    inputVariant,
    label,
    onChange,
    value,
    error,
    radioListData,
    ...inputProps
  }: InputProps,
  _ref,
) {
  const { colors } = useRestyleTheme();

  return (
    <Box gap="xs" marginBottom="l">
      <TextField
        label={label}
        onChangeText={onChange}
        placeholderTextColor={colors.gray700}
        value={value}
        {...inputProps}
      />
      <StyledText
        marginHorizontal="m"
        variant="headingS"
        color="error"
        fontWeight="500">
        {error || ' '}
      </StyledText>
    </Box>
  );
});

type ControlledInput = InputProps & {
  fieldName: string;
};

const ControlledInput = ({ fieldName, ...inputProps }: ControlledInput) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name: fieldName,
  });

  return (
    <Input
      {...inputProps}
      {...field}
      error={errors[fieldName]?.message?.toString()}
    />
  );
};

export { Input, ControlledInput };

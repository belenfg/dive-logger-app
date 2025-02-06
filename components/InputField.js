import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  style,
  ...props
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

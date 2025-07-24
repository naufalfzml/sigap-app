import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

const Textarea = React.forwardRef<TextInput, TextInputProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      multiline
      className={`h-24 w-full rounded-md border border-gray-300 bg-white p-3 text-base align-text-top ${className}`}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
});

export { Textarea };
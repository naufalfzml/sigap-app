import React from 'react';
import { TextInput, TextInputProps } from 'react-native';


const Input = React.forwardRef<TextInput, TextInputProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={`h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-base text-sigap-dark ${className}`}
      placeholderTextColor="#9CA3AF" // Corresponde a placeholder:text-muted-foreground
      {...props}
    />
  );
});

export { Input };
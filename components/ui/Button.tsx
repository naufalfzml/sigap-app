import React from "react";
import { Pressable, Text, PressableProps, View } from "react-native";

const viewVariants = {
  default: "bg-sigap-blue",
  outline: "border border-sigap-blue bg-transparent",
  ghost: "bg-transparent",
};

const textVariants = {
  default: "text-white",
  outline: "text-sigap-blue",
  ghost: "text-sigap-blue",
};

interface ButtonProps extends PressableProps {
  variant?: keyof typeof viewVariants;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ variant = "default", className, textClassName, children, ...props }, ref) => {
    return (
      <Pressable
        className={`py-3 px-4 rounded-md flex-row items-center justify-center ${viewVariants[variant]} ${className}`}
        {...props}
      >
        <Text className={`font-semibold text-sm ${textVariants[variant]} ${textClassName}`}>
          {children}
        </Text>
      </Pressable>
    );
  }
);

export { Button };
import React from 'react';
import { Text, View } from 'react-native';

const variants = {
  default: "bg-black",
  destructive: "bg-red-600",
  outline: "bg-transparent border border-gray-300",
};

const textVariants = {
  default: "text-white",
  destructive: "text-white",
  outline: "text-black",
}

interface BadgeProps {
  variant?: keyof typeof variants;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const Badge = ({ variant = "default", className, textClassName, children }: BadgeProps) => {
  return (
    <View className={`py-0.5 px-2.5 rounded-lg inline-flex items-center ${variants[variant]} ${className}`}>
      {typeof children === 'string' ? (
        <Text className={`text-xs font-semibold ${textVariants[variant]} ${textClassName}`}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

export { Badge };

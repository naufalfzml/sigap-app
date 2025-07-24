import React from 'react';
import { View, ViewProps } from 'react-native'; // Impor ViewProps

// Definisikan tipe untuk props
interface CardProps extends ViewProps { // Mewarisi semua props dari View
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <View className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`} {...props}>
      {children}
    </View>
  );
};

export { Card };
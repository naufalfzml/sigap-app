import React from 'react';
import { View, Text, Image, ImageProps } from 'react-native';

const Avatar = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <View className={`h-10 w-10 rounded-full overflow-hidden relative justify-center items-center ${className}`}>
    {children}
  </View>
);

const AvatarImage = ({ className, ...props }: ImageProps) => (
  <Image className={`h-full w-full ${className}`} {...props} />
);

const AvatarFallback = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <View className={`h-full w-full bg-gray-200 justify-center items-center ${className}`}>
    <Text className="text-gray-600 font-semibold">{children}</Text>
  </View>
);

export { Avatar, AvatarImage, AvatarFallback };
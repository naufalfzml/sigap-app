import React from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Star } from 'lucide-react-native';

export default function UserStats() {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center space-x-3">
        <Avatar className="h-12 w-12 border-2 border-sigap-lightblue">
          <AvatarFallback className="bg-sigap-lightteal">
            <Text className="text-sigap-dark font-semibold">JD</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-sigap-dark font-semibold text-lg">John Doe</Text>
          <Badge className="bg-sigap-blue mt-1" textClassName="text-white text-xs">
            <View className="flex-row items-center">
              <Trophy size={12} color="white" className="mr-1" />
              <Text className="text-white text-xs">Pahlawan Kota</Text>
            </View>
          </Badge>
        </View>
      </View>

      <View className="flex-row items-center space-x-3">
        <View className="items-end">
          <View className="flex-row items-center space-x-1">
            <Star size={16} color="#297DD4" fill="#297DD4" />
            <Text className="text-sigap-blue font-bold">2,450</Text>
          </View>
          <Text className="text-sigap-dark text-xs">Poin</Text>
        </View>

        <View className="w-8 h-8 bg-sigap-lightteal rounded-lg items-center justify-center">
          <Image source={require('@/assets/images/logo-sigap.webp')} className="w-4 h-3" resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}
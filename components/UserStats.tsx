import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Star, Trophy } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function UserStats() {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center space-x-3">
        <Avatar className="h-12 w-12 border-2 border-sigap-lightblue">
          <AvatarFallback className="bg-sigap-lightteal">
            <Text className="text-sigap-dark font-semibold">OG</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-sigap-dark font-semibold text-lg mx-2">Opal Ganteng</Text>
          <Badge className="bg-sigap-blue px-2.5 mt-1 mx-2" textClassName="text-white text-xs">
            <View className="flex-row items-center">
              <Trophy size={11} color="white" className="" />
              <Text className="text-white text-xs font-bold">  Pahlawan Kota</Text>
            </View>
          </Badge>
        </View>
      </View>

      <View className="flex-row items-center space-x-3">
        <View className="items-end">
          <View className="flex-row items-center space-x-1 mb-2">
            <Star size={16} color="#297DD4" fill="#297DD4" />
            <Text className="text-sigap-blue font-bold ml-1.5 mr-4">2,450</Text>
          </View>
          <Text className="text-sigap-dark text-xs ml-1.5 mr-4">Poin</Text>
        </View>

        <View className="w-12 h-12 bg-sigap-teal rounded-xl items-center justify-center">
          <Image source={require('@/assets/images/sigap-no-bg.png')} className="w-10 h-10 mr-1.5" resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}
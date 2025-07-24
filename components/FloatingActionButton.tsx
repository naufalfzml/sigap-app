import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { ButtonFloating } from './ui/ButtonFloating';

export default function FloatingActionButton() {
  const router = useRouter();

  return (
    <View className="absolute bottom-6 right-6">
      <ButtonFloating
        className="bg-sigap-blue rounded-full w-14 h-14"
        onPress={() => router.push('/lapor')}
      >
        <Plus size={24} color="white" />
      </ButtonFloating>
    </View>
  );
}
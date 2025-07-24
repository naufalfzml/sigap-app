import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function FloatingActionButton() {
  const router = useRouter();

  return (
    <View className="absolute bottom-6 right-6">
      <Button
        className="bg-sigap-blue rounded-full w-14 h-14"
        onPress={() => router.push('/lapor')}
      >
        <Plus size={24} color="white" />
      </Button>
    </View>
  );
}
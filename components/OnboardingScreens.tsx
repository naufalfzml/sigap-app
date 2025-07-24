import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Camera, Brain, Shield, Award, Users, Zap, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const onboardingData = [
  {
    id: 1,
    title: "Lihat Masalah? Jadilah Bagian dari Solusi",
    description: "Laporkan kerusakan, sampah, atau gangguan di sekitar Anda dengan mudah.",
    illustration: (
      <View className="relative w-full h-48 bg-sigap-lightteal/30 rounded-2xl items-center justify-center">
        <View className="flex-row items-center space-x-6">
          <View className="items-center">
            <View className="w-16 h-16 bg-sigap-blue rounded-full items-center justify-center shadow-lg">
              <Users size={32} color="white" />
            </View>
          </View>
          <ArrowRight size={32} color="#297DD4" />
          <View className="items-center">
            <View className="w-16 h-16 bg-red-500 rounded-lg items-center justify-center shadow-lg">
              <Zap size={32} color="white" />
            </View>
          </View>
        </View>
      </View>
    ),
  },
  // Ilustrasi untuk langkah 2 & 3 disederhanakan agar kompatibel dengan native
  {
    id: 2,
    title: "Diproses Cerdas, Diawasi Transparan",
    description: "AI kami mendelegasikan laporan Anda. Setiap langkahnya tercatat di Blockchain.",
    illustration: (
        <View className="relative w-full h-48 bg-sigap-lightteal/30 rounded-2xl items-center justify-center flex-row space-x-4">
            <Brain size={48} color="purple" />
            <ArrowRight size={32} color="#297DD4" />
            <Shield size={48} color="green" />
        </View>
    ),
  },
  {
    id: 3,
    title: "Dapatkan Poin, Raih Penghargaan",
    description: "Setiap laporan valid akan mendapatkan poin. Kontribusi Anda berharga.",
    illustration: (
        <View className="relative w-full h-48 bg-sigap-lightteal/30 rounded-2xl items-center justify-center flex-row space-x-4">
            <Users size={48} color="#297DD4" />
            <ArrowRight size={32} color="#297DD4" />
            <Award size={48} color="gold" />
        </View>
    ),
  },
];


export default function OnboardingScreens() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.replace('/auth');
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  const currentData = onboardingData[currentScreen];

  return (
    <LinearGradient colors={['#7ed9f8', '#4db1ec']} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-between items-center p-6">
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-10 bg-white/20 rounded-xl items-center justify-center shadow-lg">
              <Image source={require('@/assets/images/logo-sigap.webp')} className="w-6 h-5" resizeMode="contain" />
            </View>
            <Text className="text-white font-bold text-lg">SIGAP</Text>
          </View>
          <Pressable onPress={handleSkip}>
            <Text className="text-white font-medium">Lewati</Text>
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <Card className="p-8 w-full">
            <View className="mb-8">{currentData.illustration}</View>
            <View className="mb-8 items-center">
              <Text className="text-sigap-dark text-xl font-bold mb-4 text-center">{currentData.title}</Text>
              <Text className="text-gray-600 text-sm text-center">{currentData.description}</Text>
            </View>

            <View className="flex-row justify-center space-x-3 mb-8">
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  className={`h-3 rounded-full ${index === currentScreen ? 'w-8 bg-sigap-blue' : 'w-3 bg-sigap-lightteal'}`}
                />
              ))}
            </View>
            
            <Button onPress={handleNext}>
                <Text className="text-white font-semibold">
                    {currentScreen === onboardingData.length - 1 ? "Mulai Sekarang" : "Lanjut"}
                </Text>
                {currentScreen === onboardingData.length - 1 ? <ArrowRight color="white" className="ml-2" /> : <ChevronRight color="white" className="ml-2" />}
            </Button>
          </Card>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
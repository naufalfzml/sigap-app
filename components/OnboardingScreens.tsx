import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Award, Brain, Camera, ChevronRight, File, ServerCrash, Shield, Users, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './ui/StarBackground';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
  container: {
    width: 44,  
    height: 44,         
    borderRadius: 32,   
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardContent: {
    minHeight: 460, 
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Ubah dari 'space-around' ke 'center'
    width: '100%',
    paddingHorizontal: 20, // Tambahkan padding horizontal
    gap: 40, // Tambahkan gap untuk jarak antar elemen
  },
  userSection: {
    alignItems: 'center',
    flex: 1, // Tambahkan flex untuk distribusi ruang yang merata
  },
  userProfile: {
    position: 'relative',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#297dd4',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: '#eab308',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  userTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#297dd4',
    marginTop: 8,
    textAlign: 'center', // Pastikan text juga center
  },
  pointsSection: {
    alignItems: 'center',
    flex: 1, // Tambahkan flex untuk distribusi ruang yang merata
  },
  pointsContainer: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Pastikan text center
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#d97706',
    marginTop: 4,
    textAlign: 'center', // Pastikan text center
  },
  rewardsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
    justifyContent: 'center', // Pastikan rewards juga center
  },
  rewardItem: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Pastikan icon text center
  },
});

const onboardingData = [
  {
    id: 1,
    title: "Lihat Masalah? Jadilah Bagian dari Solusi",
    description: "Laporkan kerusakan, sampah, atau gangguan di sekitar Anda dengan mudah. Suara Anda kini menjadi langkah pertama.",
    illustration: (
      <View className="relative w-full bg-sigap-lightteal rounded-2xl items-center justify-center px-4" style={styles.illustrationContainer}>
        <View className="flex-row items-center justify-between w-full max-w-xs">
          {/* User Section */}
          <View className="items-center" style={{ width: 80 }}>
            <View className="w-16 h-16 bg-sigap-blue rounded-full items-center justify-center shadow-lg mb-3">
              <Users size={28} color="white" />
            </View>
            <View className="w-14 h-12 bg-sigap-blue rounded-xl items-center justify-center shadow-lg">
              <Camera size={24} color="white" />
            </View>
          </View>

          {/* Arrow */}
          <View className="items-center justify-center mx-4">
            <ArrowRight size={28} color="#297DD4" />
          </View>

          {/* Problem Report */}
          <View className="items-center" style={{ width: 80 }}>
            <View className="w-16 h-16 bg-red-500 rounded-2xl items-center justify-center shadow-lg">
              <ServerCrash size={28} color="white" />
            </View>
            <Text className="text-xs text-gray-600 text-center mt-2 font-medium">Laporan</Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    id: 2,
    title: "Diproses Cerdas, Diawasi Transparan",
    description: "AI kami secara otomatis mendelegasikan laporan Anda. Setiap langkahnya tercatat permanen di Blockchain, memastikan tidak ada lagi laporan yang hilang tanpa jejak.",
    illustration: (
      <View className="relative w-full bg-blue-200 rounded-2xl items-center justify-center px-2" style={styles.illustrationContainer}>
        <View className="flex-row items-center justify-between w-full">
          {/* Step 1: Report */}
          <View className="items-center" style={{ width: 60 }}>
            <View className="w-12 h-12 bg-sigap-blue rounded-xl items-center justify-center shadow-lg mb-2">
              <File size={20} color="white" />
            </View>
            <Text className="text-xs font-semibold text-gray-700 text-center">Laporan</Text>
          </View>

          {/* Step 2: AI Processing */}
          <View className="items-center" style={{ width: 60 }}>
            <AnimatedLinearGradient
              colors={['#8b5cf6', '#ec4899']}
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 1 }}   
              style={[styles.container, { width: 48, height: 48, marginBottom: 8 }]} 
            >
              <Brain size={20} color="white" />
            </AnimatedLinearGradient>
            <Text className="text-xs font-semibold text-purple-500 text-center">AI</Text>
          </View>

          {/* Step 3: Blockchain */}
          <View className="items-center" style={{ width: 60 }}>
            <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center shadow-lg mb-2">
              <Shield size={20} color="white" />
            </View>
            <Text className="text-xs font-semibold text-green-500 text-center">Blockchain</Text>
          </View>
          
          {/* Step 4: Department */}
          <View className="items-center" style={{ width: 60 }}>
            <View className="w-12 h-12 bg-orange-500 rounded-xl items-center justify-center shadow-lg mb-2">
              <Zap size={20} color="white" />
            </View>
            <Text className="text-xs font-semibold text-orange-500 text-center">Dinas</Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    id: 3,
    title: "Dapatkan Poin, Raih Penghargaan",
    description: "Setiap laporan valid yang Anda buat akan mendapatkan poin yang bisa ditukar. Kontribusi Anda nyata dan berharga.",
    illustration: (
      <View style={styles.illustrationContainer}>
        <LinearGradient
          colors={['#d8f6f9', '#4db1ec4d']}
          style={styles.illustration}
        >
          <StarBackground count={50} />
          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* User Profile */}
            <View style={styles.userSection}>
              <View style={styles.userProfile}>
                <View style={styles.avatarContainer}>
                  <Users size={36} color={'white'}></Users>
                </View>
                {/* Badge */}
                <View style={styles.badge}>
                  <Award size={18} color={'white'} />
                </View>
              </View>
              <Text style={styles.userTitle}>Pahlawan Kota</Text>
            </View>

            {/* Points Display */}
            <View style={styles.pointsSection}>
              <LinearGradient
                colors={['#fbbf24', '#f97316']}
                style={styles.pointsContainer}
              >
                <Text style={styles.pointsText}>2,450</Text>
              </LinearGradient>
              <Text style={styles.pointsLabel}>Poin</Text>

              {/* Rewards */}
              <View style={styles.rewardsContainer}>
                <View style={[styles.rewardItem, { backgroundColor: '#10b981' }]}>
                  <Text style={styles.rewardIcon}>$</Text>
                </View>
                <View style={[styles.rewardItem, { backgroundColor: '#3b82f6' }]}>
                  <Text style={styles.rewardIcon}>🎁</Text>
                </View>
                <View style={[styles.rewardItem, { backgroundColor: '#8b5cf6' }]}>
                  <Text style={styles.rewardIcon}>🏆</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    ),
    bgColor: ["#fffbeb", "#fed7aa"], // from-yellow-50 to-orange-50
  }
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
      <SafeAreaView className="flex-1 bg-white/98 backdrop-blur-sm">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 rounded-xl items-center justify-center">
              <Image 
                source={require('@/assets/images/sigap-no-bg.png')} 
                className="w-28 ml-14" 
                resizeMode="contain" 
              />
            </View>
          </View>
          <Pressable onPress={handleSkip} className="py-2 px-3 bg-sigap-blue rounded-lg flex-row items-center justify-center gap-2">
            <Text className="text-white font-medium">Lewati</Text>
            <ArrowRight size={15} color="white" />
          </Pressable>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-6">
          <Card className="p-6 w-full max-w-md shadow-xl">
            <View style={styles.cardContent}>
              {/* Illustration */}
              <View className="mb-6">
                {currentData.illustration}
              </View>
              
              {/* Content */}
              <View className="mb-8 items-center px-2">
                <Text className="text-sigap-dark text-xl font-bold mb-4 text-center leading-7">
                  {currentData.title}
                </Text>
                <Text className="text-gray-600 text-sm text-center leading-6 px-2">
                  {currentData.description}
                </Text>
              </View>

              {/* Bottom Section */}
              <View>
                {/* Page Indicators */}
                <View className="flex-row justify-center items-center mb-8 space-x-4">
                  {onboardingData.map((_, index) => (
                    <View
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 mx-1 ${
                        index === currentScreen 
                          ? 'w-8 bg-sigap-blue' 
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </View>
                
                {/* Action Button */}
                <Pressable 
                  onPress={handleNext}
                  className="flex-row items-center justify-center bg-sigap-blue rounded-lg py-4 px-6"
                >
                  <Text className="text-white font-semibold text-base">
                    {currentScreen === onboardingData.length - 1 ? "Mulai Sekarang" : "Lanjut"}
                  </Text>
                  <View className="ml-2">
                    {currentScreen === onboardingData.length - 1 ? (
                      <ArrowRight size={20} color="white" />
                    ) : (
                      <ChevronRight size={20} color="white" />
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          </Card>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
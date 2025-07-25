import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";


export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic untuk onboarding/auth/dashboard
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={['#7ed9f8', '#4db1ec', '#297dd4']}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center">
        <View className="w- h-32 items-center justify-center">
            <Image
              source={require('@/assets/images/sigap-no-bg.png')}
              className="w-[120px] h-[80px]"
              resizeMode="contain"
            />
        </View>
        <Text className="text-6xl font-bold text-white mt-4">SIGAP</Text>
        <Text className="text-white/95 text-xl font-semibold mt-2">
          Laporan Cepat, Aksi Sigap
        </Text>
      </View>
    </LinearGradient>
  );
}
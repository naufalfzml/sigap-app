import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    router.replace('/(tabs)/dashboard');
  };

  return (
    <LinearGradient colors={['#7ed9f8', '#4db1ec']} className="flex-1">
      <SafeAreaView className="flex-1 justify-center p-6">
        <Card className="p-8">
          <View className="items-center mb-8">
            <Image source={require('@/assets/images/sigap-no-bg.png')} className="w-26 h-10 mr-4 mb-2" resizeMode="contain" />
            <Text className="text-2xl font-bold text-sigap-dark mt-4">
              {isLogin ? "Selamat Datang Kembali" : "Bergabung dengan SIGAP"}
            </Text>
            <Text className="text-center text-gray-500 mt-2 leading-6">Masuk ke akun Anda untuk melanjutkan, melaporkan, dan memantau</Text>
          </View>

          <View className="space-y-5">
            {/* Input fields */}
            <View className="mt-4 mb-2">
              <Text className="font-bold mb-2">Email atau Nomer HP</Text>
              <Input placeholder="tes@example.com"/>
            </View>
            <View>
              <Text className="font-bold my-2">Password</Text>
              <Input placeholder="Kata Sandi" secureTextEntry={!showPassword}/>
              <Pressable onPress={() => setShowPassword(!showPassword)} className="absolute right-3 mt-12">
                  {showPassword ? <EyeOff color="gray" size={20}/> : <Eye color="gray" size={20}/>}
              </Pressable>
            </View>
            
            <Button onPress={handleSubmit} className="mt-6" style={{ borderRadius: 6 }}>
              <Text className="text-white font-bold">{isLogin ? "Masuk" : "Daftar"}</Text>
            </Button>
          </View>
          
          <Pressable onPress={() => setIsLogin(!isLogin)} className="mt-6">
            <Text className="text-center text-sigap-dark">
              {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              <Text className="font-bold text-sigap-blue">
                {isLogin ? "Daftar Sekarang" : "Masuk"}
              </Text>
            </Text>
          </Pressable>

        </Card>
      </SafeAreaView>
    </LinearGradient>
  );
}
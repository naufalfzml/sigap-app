import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    // Di aplikasi nyata, tambahkan logika login
    router.replace('/(tabs)/dashboard');
  };

  return (
    <LinearGradient colors={['#7ed9f8', '#4db1ec']} className="flex-1">
      <SafeAreaView className="flex-1 justify-center p-6">
        <Card className="p-8">
          <View className="items-center mb-8">
            <Image source={require('@/assets/images/logo-sigap.webp')} className="w-20 h-16" resizeMode="contain" />
            <Text className="text-2xl font-bold text-sigap-dark mt-4">
              {isLogin ? "Selamat Datang" : "Bergabung dengan SIGAP"}
            </Text>
          </View>

          <View className="space-y-5">
            {/* Input fields */}
            <View>
              <Mail className="absolute left-3 top-3.5 z-10" color="gray" size={20}/>
              <Input placeholder="Email atau Nomor Telepon" className="pl-12" />
            </View>
            <View>
              <Lock className="absolute left-3 top-3.5 z-10" color="gray" size={20}/>
              <Input placeholder="Kata Sandi" secureTextEntry={!showPassword} className="pl-12 pr-12"/>
              <Pressable onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5">
                  {showPassword ? <EyeOff color="gray" size={20}/> : <Eye color="gray" size={20}/>}
              </Pressable>
            </View>
            
            <Button onPress={handleSubmit} className="mt-4">
              <Text className="text-white font-bold">{isLogin ? "Masuk" : "Daftar"}</Text>
            </Button>
          </View>
          
          <Pressable onPress={() => setIsLogin(!isLogin)} className="mt-8">
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
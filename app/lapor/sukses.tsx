import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import { CheckCircle, Eye, Home } from 'lucide-react-native';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

export default function ReportSuccessPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-sigap-teal">
      <View className="flex-1 items-center justify-center p-4">
        <Card className="bg-white border-0 shadow-lg p-8 items-center max-w-sm w-full">
          {/* Success Icon */}
          <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
            <CheckCircle size={32} color="#16a34a" />
          </View>

          {/* Title */}
          <Text className="text-black text-2xl font-bold mb-2 text-center">
            Laporan Berhasil Dikirim!
          </Text>
          
          {/* Description */}
          <Text className="text-gray-700 text-sm mb-6 text-center leading-5 mb-4">
            Terima kasih atas partisipasi Anda. Laporan sedang diverifikasi dan akan segera ditindaklanjuti.
          </Text>

          {/* Report ID Card */}
          <View className="bg-sigap-lightteal rounded-lg p-4 mb-6 w-full mt-4">
            <Text className="text-black font-medium text-sm mb-1 text-center">
              ID Laporan
            </Text>
            <Text className="text-[#297dd4] text-lg text-center font-mono">
              #RPT-2024-001
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="w-full space-y-3">
            {/* View Report Status Button */}
            <Pressable
              onPress={() => router.push('/riwayat')}
              className="w-full bg-sigap-blue rounded-lg py-3 px-4 flex-row items-center justify-center active:opacity-80 my-4"
            >
              <Eye size={16} color="white" />
              <Text className="text-white font-medium ml-2">
                Lihat Status Laporan
              </Text>
            </Pressable>

            {/* Back to Home Button */}
            <Pressable
              onPress={() => router.push('/dashboard')}
              className="w-full border border-sigap-blue rounded-lg py-3 px-4 flex-row items-center justify-center active:opacity-80"
            >
              <Home size={16} color="#297dd4" />
              <Text className="text-sigap-blue font-medium ml-2">
                Kembali ke Beranda
              </Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
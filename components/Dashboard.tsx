import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import InteractiveMap from './InteractiveMap';
import ReportFeed from './ReportFeed';
import FloatingActionButton from './FloatingActionButton';
import UserStats from './UserStats';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const router = useRouter();

  return (
    // SafeAreaView memastikan konten tidak tertutup oleh status bar atau notch
    <SafeAreaView className="flex-1 bg-sigap-teal">
      {/* Header dengan User Stats */}
      <View className="bg-white/90 p-4 border-b border-sigap-lightblue/20">
        <UserStats />
      </View>

      {/* Gunakan ScrollView agar konten bisa di-scroll jika lebih panjang dari layar */}
      <ScrollView>
        {/* Tombol Navigasi Utama */}
        <View className="px-4 pt-4">
          <View className="flex-row space-x-2 mb-4">
            <Button className="flex-1" onPress={() => router.push('/(tabs)/dashboard')}>
              Beranda
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => router.push('/(tabs)/riwayat')}
            >
              Riwayat Saya
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => router.push('/(tabs)/laporan')}
            >
              Semua Laporan
            </Button>
          </View>
        </View>

        {/* Peta Interaktif */}
        <View className="p-4">
          <Card className="shadow-lg border-0 overflow-hidden">
            <View className="h-64">
              <InteractiveMap onReportSelect={setSelectedReport} />
            </View>
          </Card>
        </View>

        {/* Quick Stats */}
        <View className="px-4 pb-4">
          <View className="flex-row justify-between space-x-3">
            <Card className="bg-white/95 p-3 items-center flex-1">
              <Text className="text-sigap-blue text-xl font-bold">24</Text>
              <Text className="text-sigap-dark text-xs">Laporan Aktif</Text>
            </Card>
            <Card className="bg-white/95 p-3 items-center flex-1">
              <Text className="text-sigap-blue text-xl font-bold">156</Text>
              <Text className="text-sigap-dark text-xs">Selesai</Text>
            </Card>
            <Card className="bg-white/95 p-3 items-center flex-1">
              <Text className="text-sigap-blue text-xl font-bold">89%</Text>
              <Text className="text-sigap-dark text-xs">Tingkat Selesai</Text>
            </Card>
          </View>
        </View>

        {/* Report Feed */}
        <View className="px-4 pb-20">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sigap-dark font-semibold text-lg">Laporan Terdekat</Text>
            <Button variant="ghost" onPress={() => router.push("/(tabs)/laporan")}>
              Lihat Semua
            </Button>
          </View>
          <ReportFeed />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </SafeAreaView>
  );
}
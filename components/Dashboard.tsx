import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingActionButton from './FloatingActionButton';
import InteractiveMap from './InteractiveMap';
import ReportFeed from './ReportFeed';
import UserStats from './UserStats';

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-sigap-teal">
      {/* Header dengan User Stats */}
      <View className="bg-white/90 p-4 border-b border-sigap-lightblue/20">
        <UserStats />
      </View>

      {/* Gunakan ScrollView agar konten bisa di-scroll jika lebih panjang dari layar */}
      <ScrollView className="px-2">
        {/* Tombol Navigasi Utama */}
        <View className="space-y-4 px-4 mt-2">
          <View className="flex-row gap-2 my-2">
            <Button className="" onPress={() => router.push('/(tabs)/dashboard')}>
              <Text className="font-semibold">Beranda</Text>
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-white"
              onPress={() => router.push('/(tabs)/riwayat')}
            >
              <Text className="text-sigap-lightteal font-semibold">Riwayat Saya</Text>
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-white"
              onPress={() => router.push('/(tabs)/laporan')}
            >
              <Text className="text-sigap-lightteal font-semibold">Semua Laporan</Text>
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
        <View className="px-2 pb-4">
          <View className="flex-row gap-2 mx-2">
            <Card className="bg-white p-3 items-center flex-1">
              <Text className="text-sigap-blue text-xl font-bold">24</Text>
              <Text className="text-sigap-dark text-xs">Laporan Aktif</Text>
            </Card>
            <Card className="bg-white p-3 items-center flex-1">
              <Text className="text-sigap-blue text-xl font-bold">156</Text>
              <Text className="text-sigap-dark text-xs">Selesai</Text>
            </Card>
            <Card className="bg-white p-3 items-center flex-1">
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
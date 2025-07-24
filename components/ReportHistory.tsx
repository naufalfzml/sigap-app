import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, MapPin, Eye, Star, Calendar } from 'lucide-react-native';

// Mock data
const mockReports = [
    { id: "RPT-001", title: "Jalan Berlubang", status: "completed", createdAt: "2024-01-15T10:30:00Z", rating: 5, location: "Jl. Sudirman" },
    { id: "RPT-002", title: "Lampu Mati", status: "progress", createdAt: "2024-01-14T16:45:00Z", location: "Jl. Merdeka" },
];

export default function ReportHistory() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-sigap-lightteal">
      <View className="p-4 border-b border-gray-200 bg-white flex-row items-center">
        <Pressable onPress={() => selectedReport ? setSelectedReport(null) : router.back()}>
          <ArrowLeft size={24} color="#297DD4" />
        </Pressable>
        <Text className="text-lg font-bold text-sigap-dark ml-4">
          {selectedReport ? `Detail #${selectedReport}` : 'Riwayat Laporan'}
        </Text>
      </View>

      <ScrollView className="p-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="p-4 mb-4">
            <Text className="text-base font-bold text-sigap-dark">{report.title}</Text>
            <Text className="text-xs text-gray-500 mb-2">#{report.id}</Text>
            {report.status === 'completed' && <Badge className="bg-green-500"><Text className="text-white">Selesai</Text></Badge>}
            {report.status === 'progress' && <Badge className="bg-yellow-500"><Text className="text-white">Dikerjakan</Text></Badge>}
            <View className="flex-row items-center mt-2 text-gray-600">
                <MapPin size={14} color="gray"/>
                <Text className="text-sm ml-1">{report.location}</Text>
            </View>
             <Button variant="outline" className="mt-4" onPress={() => setSelectedReport(report.id)}>
                <Eye size={16} color="#297DD4" className="mr-2"/>
                <Text className="text-sigap-blue">Lihat Detail</Text>
             </Button>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
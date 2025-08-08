import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const mockReports = [
    { id: "RPT-001", title: "Jalan Berlubang", status: "completed", createdAt: "2024-01-15T10:30:00Z", rating: 5, location: "Jl. Sudirman No. 123" },
    { id: "RPT-002", title: "Lampu Jalan Mati", status: "progress", createdAt: "2024-01-14T16:45:00Z", location: "Jl. Merdeka Raya" },
];

export default function ReportHistory() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="p-4 border-b border-gray-200 bg-white flex-row items-center shadow-sm">
          <Pressable 
            onPress={() => selectedReport ? setSelectedReport(null) : router.back()}
            className="p-2 -ml-2 rounded-full"
          >
            <ArrowLeft size={24} color="#297DD4" />
          </Pressable>
          <Text className="text-lg font-bold text-sigap-dark ml-2">
            {selectedReport ? `Detail #${selectedReport}` : 'Riwayat Laporan'}
          </Text>
        </View>

        {/* Content */}
        <ScrollView className="p-4 bg-sigap-teal" showsVerticalScrollIndicator={false}>
          {mockReports.map((report) => (
            <Card key={report.id} className="p-4 mb-4 shadow-sm">
              {/* Report Title */}
              <Text className="text-base font-bold text-sigap-dark mb-1">
                {report.title}
              </Text>
              
              {/* Report ID */}
              <Text className="text-xs text-gray-500 mb-3">
                #{report.id}
              </Text>
              
              {/* Status Badge */}
              <View className="mb-3">
                {report.status === 'completed' && (
                  <Badge className="bg-green-100 self-start">
                    <Text className="text-green-700 text-sm font-medium">Selesai</Text>
                  </Badge>
                )}
                {report.status === 'progress' && (
                  <Badge className="bg-yellow-100 self-start">
                    <Text className="text-yellow-700 text-sm font-medium">Dikerjakan</Text>
                  </Badge>
                )}
              </View>
              
              {/* Location */}
              <View className="flex-row items-center mb-4">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-2">{report.location}</Text>
              </View>
              
              {/* Detail Button */}
              <Pressable 
                onPress={() => setSelectedReport(report.id)}
                className="flex-row items-center justify-center bg-transparent border border-sigap-blue rounded-lg py-3 px-4"
              >
                <Eye size={16} color="#297DD4" />
                <Text className="text-sigap-blue font-medium ml-2">Lihat Detail</Text>
              </Pressable>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
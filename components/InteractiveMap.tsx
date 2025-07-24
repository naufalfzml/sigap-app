import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MapPin, AlertTriangle, CheckCircle, Clock, ZoomIn, ZoomOut } from 'lucide-react-native';

// Di proyek nyata, data ini akan datang dari API
const mockReports = [
  { id: 1, lat: -6.99, lng: 110.42, status: "new" },
  { id: 2, lat: -6.98, lng: 110.43, status: "progress" },
  { id: 3, lat: -6.995, lng: 110.435, status: "completed" },
];

export default function InteractiveMap({ onReportSelect }: { onReportSelect: (report: any) => void }) {
  
  // NOTE: Kode di bawah adalah placeholder.
  // Untuk fungsionalitas peta nyata, gunakan library `react-native-maps`.
  // `npx expo install react-native-maps`

  return (
    <View className="flex-1 bg-sigap-lightteal/50 items-center justify-center">
      <MapPin size={48} color="#297DD4" />
      <Text className="mt-4 text-center text-gray-600">
        Peta Interaktif akan ditampilkan di sini.{'\n'}Gunakan `react-native-maps` untuk implementasi.
      </Text>
      
      {/* Tombol zoom placeholder */}
      <View className="absolute top-4 right-4 space-y-2">
          <Pressable className="w-8 h-8 bg-white rounded-lg shadow-md items-center justify-center">
              <ZoomIn size={18} color="#0B0F2C" />
          </Pressable>
          <Pressable className="w-8 h-8 bg-white rounded-lg shadow-md items-center justify-center">
              <ZoomOut size={18} color="#0B0F2C" />
          </Pressable>
      </View>
    </View>
  );
}
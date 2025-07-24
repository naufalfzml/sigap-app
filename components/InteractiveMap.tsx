import { MapPin, ZoomIn, ZoomOut } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
// Di proyek nyata, data ini akan datang dari API
const mockReports = [
  { id: 1, lat: -6.99, lng: 110.42, status: "new" },
  { id: 2, lat: -6.98, lng: 110.43, status: "progress" },
  { id: 3, lat: -6.995, lng: 110.435, status: "completed" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const Surakarta = {
  latitude: -7.5758833587959735,
  longitude: 110.8239608122263,
  latitudeDelta: 0.1,  
  longitudeDelta: 0.05
}
export default function InteractiveMap({ onReportSelect }: { onReportSelect: (report: any) => void }) {
  

  return (
    <View className="flex-1 bg-sigap-lightteal/50 items-center justify-center">
      <MapView 
      style={styles.map}
      initialRegion={Surakarta}
      >

      </MapView>
      {/* Tombol zoom placeholder */}
      <View className="absolute top-4 right-4 space-y-2 gap-2">
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
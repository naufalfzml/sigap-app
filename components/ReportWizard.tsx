import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, Camera, ImageIcon, MapPin, Send, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const categories = ["Jalan Rusak", "Lampu Mati", "Sampah", "Drainase", "Pohon Tumbang"];

export default function ReportWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState({
    images: [] as ImagePicker.ImagePickerAsset[],
    location: "Mendeteksi lokasi...",
    description: "",
    category: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReportData(prev => ({ ...prev, images: [...prev.images, ...result.assets] }));
    }
  };

  // ... (renderStep1, renderStep2, renderStep3, dan logika lainnya dikonversi di sini) ...
  // Tampilan sengaja disederhanakan untuk fokus pada fungsionalitas inti
  
  return (
    <SafeAreaView className="flex-1 bg-sigap-teal">
      <View className="p-4 border-b border-gray-200 bg-white">
          <Pressable onPress={() => currentStep === 1 ? router.back() : setCurrentStep(s => s - 1)}>
              <ArrowLeft size={24} color="#297DD4"/>
          </Pressable>
          <Text className="text-lg font-bold text-center text-sigap-dark">Buat Laporan ({currentStep}/3)</Text>
      </View>

      <ScrollView className="p-4">
        {currentStep === 1 && (
            <View>
                <Text className="text-xl font-bold text-center mb-4">Unggah Bukti</Text>
                <Button onPress={pickImage} className="mb-4">
                    <Camera color="white" className="mr-2" />
                    <Text className="text-white">Pilih Gambar dari Galeri</Text>
                </Button>
                <View className="flex-row flex-wrap">
                    {reportData.images.map((img, index) => (
                        <Image key={index} source={{ uri: img.uri }} className="w-24 h-24 rounded-md m-1" />
                    ))}
                </View>
                <Button onPress={() => setCurrentStep(2)} disabled={reportData.images.length === 0} className="mt-8">Lanjutkan</Button>
            </View>
        )}
        {/* Step 2 & 3 bisa ditambahkan dengan pola yang sama */}
      </ScrollView>
    </SafeAreaView>
  );
}
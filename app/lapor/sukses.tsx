// (Isi file ReportSuccessPage dikonversi dan ditempatkan di sini)
// Karena file aslinya tidak ada, saya akan membuat komponen dasarnya
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';

export default function ReportSuccessPage() {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-sigap-teal items-center justify-center p-4">
            <View className="bg-white rounded-lg p-8 items-center w-full max-w-sm">
                <CheckCircle size={64} color="green" />
                <Text className="text-xl font-bold mt-4 text-sigap-dark">Laporan Terkirim!</Text>
                <Text className="text-center text-gray-600 my-4">Terima kasih atas partisipasi Anda.</Text>
                <Button className="w-full mt-4" onPress={() => router.push('/(tabs)/dashboard')}>
                    Kembali ke Beranda
                </Button>
            </View>
        </SafeAreaView>
    )
}
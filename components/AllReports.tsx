import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReportCard from '@/components/ReportCard'; // Komponen kartu yang baru

const allReports = [
  { id: "1", title: "Jalan Berlubang", status: "Baru", category: "Jalan Rusak", distance: "0.5 km", description: "Terdapat lubang yang cukup dalam di tengah jalan, membahayakan pengendara.", location: "Jl. Pahlawan No. 12", time: "2 jam lalu", upvotes: 12, comments: 3, image: "https://images.unsplash.com/photo-1599421497821-4c3810a17567?q=80&w=1974&auto=format&fit=crop" },
  { id: "2", title: "Lampu Jalan Mati", status: "Dikerjakan", category: "Infrastruktur", distance: "1.2 km", description: "Seluruh lampu di sepanjang jalan Merdeka mati total.", location: "Jl. Merdeka", time: "4 jam lalu", upvotes: 8, comments: 1, image: "https://images.unsplash.com/photo-1620667999719-2f7a0f6b4a3a?q=80&w=1935&auto=format&fit=crop" },
];

// Komponen untuk Header (Search & Filter)
const ListHeader = ({ searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }) => (
  <View className="p-4 bg-sigap-lightteal">
    {/* 1. Ganti View pembungkus ini */}
    <View className="flex-row items-center bg-white rounded-md px-3 mb-4 border border-gray-300">
      {/* 2. Pindahkan Ikon ke sini, hapus positioning absolute */}
      <Search color="gray" size={20} />
      {/* 3. Gunakan TextInput asli dan beri style manual agar lebih fleksibel */}
      <TextInput 
        placeholder="Cari berdasarkan judul..." 
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="flex-1 h-10 ml-2" // flex-1 membuat input mengisi sisa ruang
        placeholderTextColor="gray"
      />
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
      <Button variant={selectedFilter === 'all' ? 'default' : 'outline'} onPress={() => setSelectedFilter('all')}>Semua</Button>
      <Button variant={selectedFilter === 'Baru' ? 'default' : 'outline'} onPress={() => setSelectedFilter('Baru')}>Baru</Button>
      <Button variant={selectedFilter === 'Dikerjakan' ? 'default' : 'outline'} onPress={() => setSelectedFilter('Dikerjakan')}>Dikerjakan</Button>
      <Button variant={selectedFilter === 'Selesai' ? 'default' : 'outline'} onPress={() => setSelectedFilter('Selesai')}>Selesai</Button>
    </ScrollView>
  </View>
);

export default function AllReports() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredReports = allReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || report.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderItem = useCallback(({ item }) => <ReportCard report={item} />, []);

  return (
    <SafeAreaView className="flex-1 bg-sigap-lightteal">
      {/* Header Halaman */}
      <View className="p-4 border-b border-gray-200 bg-white flex-row items-center">
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#297DD4" />
        </Pressable>
        <View className="ml-4">
          <Text className="text-lg font-bold text-sigap-dark">Semua Laporan</Text>
          <Text className="text-sm text-gray-500">{filteredReports.length} laporan ditemukan</Text>
        </View>
      </View>
      
      {/* Daftar Laporan dengan FlashList */}
      <FlashList
        data={filteredReports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={250} 
        ListHeaderComponent={
          <ListHeader 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
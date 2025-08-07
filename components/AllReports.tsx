import ReportCard from '@/components/ReportCard';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const allReports = [
  { id: "1", title: "Jalan Berlubang", status: "Pending", category: "Jalan Rusak", distance: "0.5 km", description: "Terdapat lubang yang cukup dalam di tengah jalan, membahayakan pengendara.", location: "Jl. Sudirman No. 123", time: "2 jam lalu", upvotes: 12, comments: 3, image: require('../assets/images/jalan-rusak.webp') },
  { id: "2", title: "Lampu Jalan Mati", status: "Dikerjakan", category: "Infrastruktur", distance: "1.2 km", description: "Seluruh lampu di sepanjang jalan Merdeka mati total.", location: "Jl. Merdeka Raya", time: "4 jam lalu", upvotes: 8, comments: 1, image: require('../assets/images/lampu-jalan.jpg') },
  { 
    id: "3", 
    title: "Tumpukan Sampah", 
    status: "Selesai", 
    category: "Lingkungan",
    distance: "2 km",
    description: "Sampah menumpuk dan tidak diangkut selama seminggu, menimbulkan bau tidak sedap dan mengundang lalat.", 
    location: "Jl. Kebon Jeruk No. 78", 
    time: "6 jam yang lalu",
    upvotes: 8, 
    comments: 1,
    image: require('../assets/images/tumpukan-sampah.jpg'),
  }
];

const FilterButton = ({ title, isActive, onPress }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-1.5 rounded-lg border ${
      isActive 
        ? 'bg-sigap-blue border-sigap-blue' 
        : 'bg-white border-sigap-blue'
    }`}
    style={{ minWidth: 80, height: 32 }} // Ukuran konsisten
  >
    <Text 
      className={`text-center font-medium ${
        isActive ? 'text-white' : 'text-sigap-blue'
      }`}
      numberOfLines={1}
    >
      {title}
    </Text>
  </Pressable>
);

// Komponen untuk Header (Search & Filter)
const ListHeader = ({ searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }) => {
  const filters = [
    { key: 'all', label: 'Semua' },
    { key: 'Pending', label: 'Pending' },
    { key: 'Dikerjakan', label: 'Dikerjakan' },
    { key: 'Selesai', label: 'Selesai' }
  ];

  return (
    <View className="p-4 bg-sigap-teal">
      {/* Search Input */}
      <View className="flex-row items-center bg-white rounded-lg px-3 mb-3 border border-gray-300 shadow-sm">
        <Search color="#6B7280" size={20} />
        <TextInput 
          placeholder="Cari berdasarkan judul..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 h-12 ml-3 text-gray-900"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ 
          gap: 12, 
          paddingHorizontal: 2,
          paddingVertical: 2 
        }}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter.key}
            title={filter.label}
            isActive={selectedFilter === filter.key}
            onPress={() => setSelectedFilter(filter.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

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
    <>
      {/* StatusBar dengan background putih */}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        {/* Header Halaman */}
        <View className="p-4 border-b border-gray-200 bg-white flex-row items-center shadow-sm">
          <Pressable 
            onPress={() => router.back()}
            className="p-2 -ml-2 rounded-full"
          >
            <ArrowLeft size={24} color="#297DD4" />
          </Pressable>
          <View className="ml-2 flex-1">
            <Text className="text-lg font-bold text-sigap-dark">Semua Laporan</Text>
            <Text className="text-sm text-gray-500">
              {filteredReports.length} laporan ditemukan
            </Text>
          </View>
        </View>
        
        {/* Area konten dengan background yang berbeda */}
        <View className="flex-1 bg-sigap-teal">
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
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
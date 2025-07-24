import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Search, MapPin, Clock, ThumbsUp, MessageCircle } from 'lucide-react-native';

// Mock data
const allReports = [
  { id: "1", title: "Jalan Berlubang", status: "new", category: "Jalan Rusak", distance: "0.5 km", description: "Lubang besar...", location: "Jl. Sudirman", time: "2 jam lalu", upvotes: 12, comments: 3, reporter: "Ahmad S.", image: "https://via.placeholder.com/150" },
  { id: "2", title: "Lampu Jalan Mati", status: "progress", category: "Infrastruktur", distance: "1.2 km", description: "Lampu mati...", location: "Jl. Merdeka", time: "4 jam lalu", upvotes: 8, comments: 1, reporter: "Siti M.", image: "https://via.placeholder.com/150" },
];

export default function AllReports() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredReports = allReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || report.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-sigap-lightteal">
      <View className="p-4 border-b border-gray-200 bg-white flex-row items-center">
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#297DD4" />
        </Pressable>
        <View className="ml-4">
            <Text className="text-lg font-bold text-sigap-dark">Semua Laporan</Text>
            <Text className="text-sm text-gray-500">{filteredReports.length} laporan ditemukan</Text>
        </View>
      </View>
      
      <View className="p-4">
        <View className="relative mb-4">
            <Search className="absolute left-3 top-3.5 z-10" color="gray" size={20}/>
            <Input 
                placeholder="Cari laporan..." 
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="pl-10"
            />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
            <Button variant={selectedFilter === 'all' ? 'default' : 'outline'} onPress={() => setSelectedFilter('all')}>Semua</Button>
            <Button variant={selectedFilter === 'new' ? 'default' : 'outline'} onPress={() => setSelectedFilter('new')}>Baru</Button>
            <Button variant={selectedFilter === 'progress' ? 'default' : 'outline'} onPress={() => setSelectedFilter('progress')}>Dikerjakan</Button>
            <Button variant={selectedFilter === 'completed' ? 'default' : 'outline'} onPress={() => setSelectedFilter('completed')}>Selesai</Button>
        </ScrollView>
      </View>

      <ScrollView className="px-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="p-4 mb-4">
            <View className="flex-row justify-between">
                <View className="flex-1 pr-4">
                    <Text className="text-base font-bold text-sigap-dark">{report.title}</Text>
                    {/* Status & Category Badges */}
                    <Text className="text-sm text-gray-700 mt-1">{report.description}</Text>
                    <View className="flex-row items-center mt-2 text-gray-600">
                        <MapPin size={14} color="gray"/>
                        <Text className="text-xs ml-1">{report.location}</Text>
                    </View>
                    <View className="flex-row items-center mt-1 text-gray-600">
                        <Clock size={14} color="gray"/>
                        <Text className="text-xs ml-1">{report.time}</Text>
                    </View>
                </View>
                <Image source={{ uri: report.image }} className="w-20 h-20 rounded-lg"/>
            </View>
            <View className="flex-row items-center mt-4 border-t border-gray-200 pt-2">
                {/* Actions: ThumbsUp, MessageCircle */}
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
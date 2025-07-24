// components/ReportCard.tsx
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import { Clock, MapPin, MessageCircle, ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';


export default function ReportCard({ report }) {
    const router = useRouter();
    
    // Tentukan warna badge berdasarkan status
    const statusColor = {
        "Baru": "bg-blue-100 text-blue-800",
        "Dikerjakan": "bg-yellow-100 text-yellow-800",
        "Selesai": "bg-green-100 text-green-800",
    };

    return (
        <Pressable onPress={() => router.push(`/laporan/${report.id}`)}>
            <Card className="mb-4 mx-4">
                <Image source={{ uri: report.image }} className="w-full h-32 rounded-t-lg" />
                <View className="p-3">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-base font-bold text-sigap-dark flex-1 pr-2 ml-1" numberOfLines={2}>{report.title}</Text>
                        <Badge className={`${statusColor[report.status]}`}>
                            <Text className={`text-xs font-semibold ${statusColor[report.status].split(' ')[1]}`}>{report.status}</Text>
                        </Badge>
                    </View>
                    
                    <View className="mt-2 space-y-1">
                        <View className="flex-row items-center mb-2">
                            <MapPin size={16} color="gray"/>
                            <Text className="text-xs text-gray-600 ml-1.5">{report.location}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={16} color="gray"/>
                            <Text className="text-xs text-gray-600 ml-1.5">{report.time}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100 space-x-4">
                        <View className="flex-row items-center space-x-1">
                            <ThumbsUp size={16} color="gray" />
                            <Text className="text-xs text-gray-600 ml-1 mr-4">{report.upvotes}</Text>
                        </View>
                        <View className="flex-row items-center space-x-1">
                            <MessageCircle size={16} color="gray" />
                            <Text className="text-xs text-gray-600 ml-1 mr-4">{report.comments}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </Pressable>
    );
}
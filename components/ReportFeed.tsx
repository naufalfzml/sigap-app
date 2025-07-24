import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { 
  MapPin, 
  ThumbsUp, 
  MessageCircle, 
  Users, 
  AlertTriangle, 
  Clock, 
  CheckCircle 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock data, sama seperti di proyek Next.js
const mockReports = [
  { id: "1", title: "Jalan Berlubang di Jl. Sudirman", description: "Lubang besar di tengah jalan yang membahayakan pengendara", location: "Jl. Sudirman No. 123", time: "2 jam yang lalu", status: "new", upvotes: 12, comments: 3, reporter: "Ahmad S.", image: "https://via.placeholder.com/200" },
  { id: "2", title: "Lampu Jalan Mati", description: "Lampu penerangan jalan sudah mati sejak 3 hari", location: "Jl. Merdeka Raya", time: "4 jam yang lalu", status: "progress", upvotes: 8, comments: 1, reporter: "Siti M.", image: "https://via.placeholder.com/200" },
  { id: "3", title: "Tumpukan Sampah", description: "Sampah menumpuk dan tidak diangkut selama seminggu", location: "Jl. Kebon Jeruk", time: "6 jam yang lalu", status: "completed", upvotes: 15, comments: 5, reporter: "Budi P.", image: "https://via.placeholder.com/200" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "new":
      return <Badge className="bg-red-100"><Text className="text-red-700">Baru</Text></Badge>;
    case "progress":
      return <Badge className="bg-yellow-100"><Text className="text-yellow-700">Dikerjakan</Text></Badge>;
    case "completed":
      return <Badge className="bg-green-100"><Text className="text-green-700">Selesai</Text></Badge>;
    default:
      return <Badge><Text>Unknown</Text></Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new":
      return <AlertTriangle size={16} className="text-red-500" />;
    case "progress":
      return <Clock size={16} className="text-yellow-500" />;
    case "completed":
      return <CheckCircle size={16} className="text-green-500" />;
    default:
      return null;
  }
};

export default function ReportFeed() {
  const router = useRouter();
  const [userActions, setUserActions] = useState<{ [key: string]: { upvoted: boolean; confirmed: boolean } }>({});
  
  const handleUpvote = (reportId: string) => {
    setUserActions(prev => ({
      ...prev,
      [reportId]: { ...prev[reportId], upvoted: !prev[reportId]?.upvoted },
    }));
  };

  const handleConfirm = (reportId: string) => {
     setUserActions(prev => ({
      ...prev,
      [reportId]: { ...prev[reportId], confirmed: !prev[reportId]?.confirmed },
    }));
  };

  return (
    <View className="space-y-4">
      {mockReports.map((report) => (
        <Card key={report.id} className="p-4">
          {/* Header */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <View className="flex-row items-center space-x-2 mb-1">
                {getStatusIcon(report.status)}
                <Text className="text-sigap-dark font-semibold text-sm flex-1">{report.title}</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                {getStatusBadge(report.status)}
                <Text className="text-sigap-dark/60 text-xs">{report.time}</Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Text className="text-sigap-dark/80 text-sm mb-2">{report.description}</Text>

              <View className="flex-row items-center space-x-1 text-sigap-dark/60 mb-3">
                <MapPin size={12} color="gray" />
                <Text className="text-xs">{report.location}</Text>
              </View>
              
              <View className="flex-row items-center space-x-2 mb-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-sigap-lightteal">
                    <Text className="text-sigap-dark text-xs">{report.reporter.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>
                <Text className="text-sigap-dark/60 text-xs">Dilaporkan oleh {report.reporter}</Text>
              </View>

              {/* Actions */}
              <View className="flex-row items-center space-x-4">
                <Pressable onPress={() => handleUpvote(report.id)} className={`flex-row items-center space-x-1 p-1 rounded-md ${userActions[report.id]?.upvoted ? 'bg-sigap-lightteal' : ''}`}>
                  <ThumbsUp size={16} color={userActions[report.id]?.upvoted ? '#297DD4' : 'gray'} />
                  <Text className={`text-xs ${userActions[report.id]?.upvoted ? 'text-sigap-blue' : 'text-gray-600'}`}>
                    {report.upvotes + (userActions[report.id]?.upvoted ? 1 : 0)}
                  </Text>
                </Pressable>

                <Pressable onPress={() => router.push(`/laporan/${report.id}/komentar`)} className="flex-row items-center space-x-1 p-1">
                  <MessageCircle size={16} color="gray" />
                  <Text className="text-xs text-gray-600">{report.comments}</Text>
                </Pressable>

                <Pressable onPress={() => handleConfirm(report.id)} className={`flex-row items-center space-x-1 p-1 rounded-md ${userActions[report.id]?.confirmed ? 'bg-sigap-lightteal' : ''}`}>
                  <Users size={16} color={userActions[report.id]?.confirmed ? '#297DD4' : 'gray'} />
                  <Text className={`text-xs ${userActions[report.id]?.confirmed ? 'text-sigap-blue' : 'text-gray-600'}`}>
                    {userActions[report.id]?.confirmed ? 'Dikonfirmasi' : 'Konfirmasi'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Image */}
            <Image
              source={{ uri: report.image }}
              className="w-20 h-20 rounded-lg bg-gray-200"
            />
          </View>
        </Card>
      ))}
    </View>
  );
}
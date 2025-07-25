import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Send,
  Share2,
  ThumbsUp
} from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  status: 'new' | 'progress' | 'completed';
  upvotes: number;
  comments: number;
  reporter: string;
  image: ImageSourcePropType;
  reporterAvatar?: ImageSourcePropType; 
};

type Comment = {
  user: string;
  text: string;
  time?: string;
};

const initialMockComments: { [key: string]: Comment[] } = {
  "1": [
    { user: "Citra", text: "Sangat berbahaya, semoga cepat ditangani!", time: "1 jam lalu" }, 
    { user: "David", text: "Barusan lewat sini, benar sekali.", time: "30 menit lalu" }
  ],
  "2": [{ user: "Eko", text: "Sudah gelap gulita selama berhari-hari.", time: "2 jam lalu" }],
  "3": [],
};

// Mock data, sama seperti di proyek Next.js
const mockReports = [
  { id: "1", title: "Jalan Berlubang", description: "Lubang besar di tengah jalan yang membahayakan pengendara", location: "Jl. Sudirman No. 123", time: "2 jam yang lalu", status: "new", upvotes: 12, comments: 3, reporter: "Ahmad S.", image: require('../assets/images/jalan-rusak.webp') },
  { id: "2", title: "Lampu Jalan Mati", description: "Lampu penerangan jalan sudah mati sejak 3 hari", location: "Jl. Merdeka Raya", time: "4 jam yang lalu", status: "progress", upvotes: 8, comments: 1, reporter: "Siti M.", image: require('../assets/images/lampu-jalan.jpg') },
  { id: "3", title: "Tumpukan Sampah", description: "Sampah menumpuk dan tidak diangkut selama seminggu", location: "Jl. Kebon Jeruk", time: "6 jam yang lalu", status: "completed", upvotes: 15, comments: 5, reporter: "Budi P.", image: require('../assets/images/tumpukan-sampah.jpg') },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "new":
      return <Badge className="bg-red-100"><Text className="text-red-700 text-sm font-bold">Pending</Text></Badge>;
    case "progress":
      return <Badge className="bg-yellow-100"><Text className="text-yellow-700 text-sm font-bold">Dikerjakan</Text></Badge>;
    case "completed":
      return <Badge className="bg-green-100"><Text className="text-green-700 text-sm font-bold">Selesai</Text></Badge>;
    default:
      return <Badge><Text>Unknown</Text></Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new":
      return <AlertTriangle size={16} color="#D32F2F" />;
    case "progress":
      return <Clock size={16} color="#FBC02D" />;
    case "completed":
      return <CheckCircle size={16} color="#388E3C" />;
    default:
      return null;
  }
};

export default function ReportFeed() {
  const router = useRouter();
  const [userActions, setUserActions] = useState<{ [key: string]: { upvoted: boolean; confirmed: boolean } }>({});
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>(initialMockComments);
  const [newComment, setNewComment] = useState('');
  
  const [selectedReportComments, setSelectedReportComments] = useState<Report | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleUpvote = (reportId: string) => {
    setUserActions(prev => ({
      ...prev,
      [reportId]: { ...prev[reportId], upvoted: !prev[reportId]?.upvoted },
    }));
  };

  const handleCommentPress = useCallback((report : any) => {
    setSelectedReportComments(report);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleConfirm = (reportId: string) => {
     setUserActions(prev => ({
      ...prev,
      [reportId]: { ...prev[reportId], confirmed: !prev[reportId]?.confirmed },
    }));
  };

  const handleShare = (report: Report) => {
    // Implementasi share logic
    console.log('Sharing report:', report.title);
  };

  const handleSendComment = () => {
    if (newComment.trim() && selectedReportComments) {
      const newCommentObj: Comment = {
        user: "Anda", // Bisa diganti dengan nama user yang login
        text: newComment.trim(),
        time: "Baru saja"
      };

      setComments(prev => ({
        ...prev,
        [selectedReportComments.id]: [
          ...(prev[selectedReportComments.id] || []),
          newCommentObj
        ]
      }));

      setNewComment('');
    }
  };

  // Hitung jumlah komentar untuk setiap report
  const getCommentCount = (reportId: string) => {
    return comments[reportId]?.length || 0;
  };

  return (
    <View className="space-y-4">
      {mockReports.map((report) => (
        <Card key={report.id} className="p-4 mb-4">
          {/* Header */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <View className="flex-row items-center space-x-2 mb-2 gap-2">
                {getStatusIcon(report.status)}
                <Text className="text-sigap-dark font-semibold text-sm flex-1">{report.title}</Text>
              </View>
              <View className="flex-row items-center space-x-2 gap-2">
                {getStatusBadge(report.status)}
                <Text className="text-sigap-dark/60 text-xs">{report.time}</Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            
            {/* 1. BAGIAN HEADER: Info Pelapor & Lokasi */}
            <View className="flex-row items-center justify-between p-3">
              <View className="flex-row items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-sigap-lightteal">
                    <Text className="text-sigap-dark text-sm">{report.reporter.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>
                <View>
                  <Text className="font-semibold text-sm text-sigap-dark px-2">{report.reporter}</Text>
                  <View className="flex-row items-center mt-0.5 mx-1.5">
                    <MapPin size={12} color="gray" />
                    <Text className="text-xs text-sigap-dark/60 ml-1">{report.location}</Text>
                  </View>
                </View>
              </View>
              {/* Di sini bisa ditambahkan ikon titik tiga untuk opsi lainnya */}
            </View>

            {/* 2. BAGIAN KONTEN: Deskripsi & Gambar */}
            <View className="px-3 pb-3">
              <Text className="text-sigap-dark/90">{report.description}</Text>
            </View>
            <Image
              source={report.image}
              className="w-full h-48 bg-gray-200" // Gambar dibuat full-width
            />

            {/* 3. BAGIAN FOOTER: Tombol-tombol Aksi */}
            <View className="flex-row items-center border-t border-gray-100">
              {/* Tombol Upvote */}
              <Pressable 
                onPress={() => handleUpvote(report.id)} 
                className="flex-1 items-center justify-center py-3"
              >
                <View className="flex-row items-center justify-center w-20">
                  <ThumbsUp size={16} color={userActions[report.id]?.upvoted ? '#297DD4' : 'gray'} />
                  <Text className={`text-sm font-medium ${userActions[report.id]?.upvoted ? 'text-sigap-blue' : 'text-gray-600'} ml-1.5`}>
                    {report.upvotes + (userActions[report.id]?.upvoted ? 1 : 0)}
                  </Text>
                </View>
              </Pressable>

              <View className="w-px bg-gray-100" />

              {/* Tombol Komentar */}
              <Pressable 
                onPress={() => handleCommentPress(report)} 
                className="flex-1 items-center justify-center py-3"
              >
                <View className="flex-row items-center justify-center w-20">
                  <MessageCircle size={16} color="gray"/>
                  <Text className="text-sm text-gray-600 font-medium ml-1.5">{getCommentCount(report.id)}</Text>
                </View>
              </Pressable>

              <View className="w-px bg-gray-100" />
              
              {/* Tombol Share */}
              <Pressable 
                onPress={() => handleShare(report)}
                className="flex-1 items-center justify-center py-3"
              >
                <View className="flex-row items-center justify-center w-20">
                  <Share2 size={16} color={'gray'} />
                </View>
              </Pressable>
              
            </View>

          </View>
        </Card>
      ))}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '65%']} 
        backgroundStyle={{ backgroundColor: '#f8f9fa' }}
        handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          {selectedReportComments && (
            <>
              {/* Header */}
              <View className="mb-4">
                <Text className="text-lg font-bold text-gray-800">
                  Komentar ({comments[selectedReportComments.id]?.length || 0})
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {selectedReportComments.title}
                </Text>
              </View>

              {/* Daftar Komentar */}
              <ScrollView className="flex-1 mb-4" showsVerticalScrollIndicator={false}>
                {comments[selectedReportComments.id]?.length === 0 ? (
                  <View className="items-center justify-center py-8">
                    <MessageCircle size={48} color="#d1d5db" />
                    <Text className="text-gray-500 mt-2">Belum ada komentar</Text>
                    <Text className="text-gray-400 text-sm">Jadilah yang pertama berkomentar!</Text>
                  </View>
                ) : (
                  comments[selectedReportComments.id]?.map((comment, index) => (
                    <View key={index} className="mb-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center">
                          <Avatar className="h-8 w-8 rounded-full mr-2">
                            <AvatarFallback className="bg-blue-100">
                              <Text className="text-blue-700 text-xs font-semibold">
                                {comment.user.charAt(0).toUpperCase()}
                              </Text>
                            </AvatarFallback>
                          </Avatar>
                          <Text className="font-semibold text-sm text-gray-800">{comment.user}</Text>
                        </View>
                        {comment.time && (
                          <Text className="text-xs text-gray-500">{comment.time}</Text>
                        )}
                      </View>
                      <Text className="text-gray-700 ml-8">{comment.text}</Text>
                    </View>
                  ))
                )}
              </ScrollView>

              {/* Input Komentar Baru */}
              <View className="border-t border-gray-200 pt-3">
                <View className="flex-row items-center space-x-2 bg-white rounded-lg border border-gray-200 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-sigap-lightteal">
                      <Text className="text-sigap-dark text-sm">A</Text>
                    </AvatarFallback>
                  </Avatar>
                  <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Tulis komentar..."
                    multiline
                    maxLength={500}
                    className="flex-1 max-h-20 text-gray-800 text-sm px-2 py-1"
                    style={{ textAlignVertical: 'top' }}
                  />
                  <Pressable
                    onPress={handleSendComment}
                    disabled={!newComment.trim()}
                    className={`p-2 rounded-full ${newComment.trim() ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <Send size={16} color="white" />
                  </Pressable>
                </View>
                <Text className="text-xs text-gray-500 mt-1 mb-2 ml-1 text-right">
                  {newComment.length}/500
                </Text>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>

    </View>
  );
}
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  Car,
  ChevronLeft,
  ChevronRight,
  Construction,
  Flame,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  ThumbsUp,
  TreePine,
  Users
} from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

// Custom colors
const colors = {
  sigapLightTeal: '#E0F7FA', // Light teal background color
};

// Definisikan tipe kategori
type ReportCategory = 'infrastruktur' | 'lingkungan' | 'kebakaran' | 'lalu-lintas' | 'keamanan' | 'sosial' | 'lainnya';

// Definisikan tipe data dengan kategori dan multiple images
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
  images: ImageSourcePropType[]; // Changed to array for multiple images
  category: ReportCategory;
};

// Konfigurasi kategori dengan icon dan warna
const categoryConfig: Record<ReportCategory, { label: string; icon: any; color: string; bgColor: string }> = {
  infrastruktur: { label: 'Infrastruktur', icon: Construction, color: '#F59E0B', bgColor: '#FEF3C7' },
  lingkungan: { label: 'Lingkungan', icon: TreePine, color: '#10B981', bgColor: '#D1FAE5' },
  kebakaran: { label: 'Kebakaran', icon: Flame, color: '#EF4444', bgColor: '#FEE2E2' },
  'lalu-lintas': { label: 'Lalu Lintas', icon: Car, color: '#3B82F6', bgColor: '#DBEAFE' },
  keamanan: { label: 'Keamanan', icon: AlertTriangle, color: '#DC2626', bgColor: '#FEE2E2' },
  sosial: { label: 'Sosial', icon: Users, color: '#8B5CF6', bgColor: '#EDE9FE' },
  lainnya: { label: 'Lainnya', icon: AlertTriangle, color: '#6B7280', bgColor: '#F3F4F6' }
};

// Status configuration
const statusConfig = {
  new: { label: 'Pending', color: '#EF4444', bgColor: '#FEE2E2' },
  progress: { label: 'Diproses', color: '#F59E0B', bgColor: '#FEF3C7' },
  completed: { label: 'Selesai', color: '#10B981', bgColor: '#D1FAE5' }
};

// Mock data dengan multiple images
const mockReports: Report[] = [
  { 
    id: "1", 
    title: "Jalan Berlubang di Jl. Sudirman", 
    description: "Lubang besar di tengah jalan yang membahayakan pengendara roda dua maupun empat. Perlu penanganan segera sebelum ada korban jiwa. Lubang ini sudah ada sejak beberapa minggu lalu dan semakin membesar karena hujan.", 
    location: "Jl. Sudirman No. 123, Surakarta", 
    time: "2 jam yang lalu", 
    status: "new", 
    upvotes: 12, 
    comments: 3, 
    reporter: "Ahmad Santoso", 
    images: [
      require('../../assets/images/jalan-rusak.webp'),
      require('../../assets/images/jalan-rusak-2.jpg'),
    ],
    category: "infrastruktur"
  },
  { 
    id: "2", 
    title: "Lampu Jalan Mati", 
    description: "Lampu penerangan jalan sudah mati sejak 3 hari, membuat area menjadi gelap dan rawan kejahatan.", 
    location: "Jl. Merdeka Raya No. 45", 
    time: "4 jam yang lalu", 
    status: "progress", 
    upvotes: 8,
    comments: 1, 
    reporter: "Siti Mariam", 
    images: [
      require('../../assets/images/lampu-jalan.jpg'),
      require('../../assets/images/lampu-jalan2.jpg')
    ],
    category: "infrastruktur"
  },
  { 
    id: "3", 
    title: "Tumpukan Sampah", 
    description: "Sampah menumpuk dan tidak diangkut selama seminggu, menimbulkan bau tidak sedap dan mengundang lalat.", 
    location: "Jl. Kebon Jeruk No. 78", 
    time: "6 jam yang lalu", 
    status: "completed", 
    upvotes: 15, 
    comments: 5, 
    reporter: "Budi Prakoso", 
    images: [require('../../assets/images/tumpukan-sampah.jpg')],
    category: "lingkungan"
  }
];

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
// Komponen PhotoGallery
const PhotoGallery: React.FC<{ images: ImageSourcePropType[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / screenWidth);
    setCurrentIndex(currentIndex);
  };

  return (
    <View className="relative">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image 
            key={index}
            source={image} 
            style={{ width: screenWidth, height: 280 }}
            className="bg-gray-200"
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      {/* Photo counter overlay */}
      <View className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full">
        <Text className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </Text>
      </View>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <Pressable 
              onPress={() => scrollToIndex(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-6 bg-black/50 p-2 rounded-full"
            >
              <ChevronLeft size={20} color="white" />
            </Pressable>
          )}
          {currentIndex < images.length - 1 && (
            <Pressable 
              onPress={() => scrollToIndex(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-6 bg-black/50 p-2 rounded-full"
            >
              <ChevronRight size={20} color="white" />
            </Pressable>
          )}
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row space-x-2">
          {images.map((_, index) => (
            <View
              key={index}
              className={`w-2 mx-1 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

// Komponen CategoryBadge
const CategoryBadge: React.FC<{ category: ReportCategory }> = ({ category }) => {
  const config = categoryConfig[category];
  const IconComponent = config.icon;
  
  return (
    <View 
      className="flex-row items-center px-3 py-2 rounded-lg shadow-sm"
      style={{ backgroundColor: config.bgColor }}
    >
      <IconComponent size={16} color={config.color} />
      <Text 
        className="text-sm font-semibold ml-2"
        style={{ color: config.color }}
      >
        {config.label}
      </Text>
    </View>
  );
};

// Komponen StatusBadge
const StatusBadge: React.FC<{ status: 'new' | 'progress' | 'completed' }> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <View 
      className="px-3 py-1 rounded-lg shadow-sm"
      style={{ backgroundColor: config.bgColor }}
    >
      <Text 
        className="text-sm font-bold"
        style={{ color: config.color }}
      >
        {config.label}
      </Text>
    </View>
  );
};


export default function ReportDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userActions, setUserActions] = useState({ upvoted: false, confirmed: false });
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>(initialMockComments);
  const [newComment, setNewComment] = useState('');

  const [selectedReportComments, setSelectedReportComments] = useState<Report | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setIsLoading(true);
    const foundReport = mockReports.find(r => r.id === id);
    setTimeout(() => {
      setReport(foundReport || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleCommentPress = useCallback((report : any) => {
    setSelectedReportComments(report);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleUpvote = () => {
    if (report) {
      setUserActions(prev => ({ ...prev, upvoted: !prev.upvoted }));
      setReport(prev => prev ? {
        ...prev,
        upvotes: prev.upvotes + (userActions.upvoted ? -1 : 1)
      } : null);
    }
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

  const getCommentCount = (reportId: string) => {
    return comments[reportId]?.length || 0;
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.sigapLightTeal }}>
        <ActivityIndicator size="large" color="#297DD4" />
        <Text className="mt-4 text-gray-600 font-medium">Memuat detail laporan...</Text>
      </View>
    );
  }

  if (!report) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.sigapLightTeal }}>
        <AlertTriangle size={64} color="#EF4444" />
        <Text className="mt-4 text-lg font-semibold text-gray-800">Laporan tidak ditemukan</Text>
        <Text className="text-gray-600 text-center mt-2">Laporan yang Anda cari mungkin telah dihapus atau tidak tersedia</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }}>
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft size={24} color="#1F2937" />
          </Pressable>
          <Text className="text-lg font-bold text-gray-900 ml-2 flex-1" numberOfLines={1}>
            Detail Laporan
          </Text>
          <Pressable className="p-2">
            <MoreHorizontal size={24} color="#1F2937" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 bg-sigap-lightteal">
        {/* Photo Gallery */}
        <PhotoGallery images={report.images} />

        {/* Content Card */}
        <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm border border-gray-100">
          <View className="p-6">
            {/* Header with badges */}
            <View className="space-y-4">
              <View className="flex-row justify-between items-start">
                <Text className="text-xl font-bold text-gray-900 flex-1 pr-4 leading-tight">
                  {report.title}
                </Text>
                <StatusBadge status={report.status} />
              </View>
              
              <View className="flex-row items-center space-x-3 mt-4">
                <CategoryBadge category={report.category} />
              </View>
            </View>
            
            {/* Reporter Info */}
            <View className="flex-row items-center mt-6 p-4 bg-gray-50 rounded-xl">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100">
                  <Text className="text-blue-600 text-lg font-semibold">{report.reporter.charAt(0)}</Text>
                </AvatarFallback>
              </Avatar>
              <View className="ml-4 flex-1">
                <Text className="font-semibold text-gray-900">{report.reporter}</Text>
                <Text className="text-sm text-gray-500 mt-1">{report.time}</Text>
              </View>
            </View>

            {/* Location */}
            <View className="flex-row items-start mt-6 p-4 bg-blue-50 rounded-xl">
              <MapPin size={20} color="#3B82F6" className="mt-0.5" />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-medium text-blue-600 mb-1">Lokasi</Text>
                <Text className="text-gray-800 leading-relaxed">{report.location}</Text>
              </View>
            </View>
            
            {/* Description */}
            <View className="mt-6">
              <Text className="text-md font-bold text-black mb-3">Deskripsi Masalah</Text>
              <Text className="text-gray-800 leading-relaxed text-base">{report.description}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row border-t border-gray-100">
              <Pressable 
                onPress={() => handleUpvote()} 
                className="flex-1 items-center justify-center py-3"
              >
                <View className="flex-row items-center justify-center w-20">
                  <ThumbsUp size={16} color={userActions?.upvoted ? '#297DD4' : 'gray'} />
                  <Text className={`text-sm font-medium ${userActions?.upvoted ? 'text-sigap-blue' : 'text-gray-600'} ml-1.5`}>
                    {report.upvotes + (userActions?.upvoted ? 1 : 0)}
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
            
            <Pressable className="flex-1 flex-row items-center justify-center py-4">
              <Share2 size={16} color={'gray'} />
            </Pressable>
          </View>
        </View>

        {/* Padding bottom */}
        <View className="h-6" />
      </ScrollView>

      {/* Enhanced Bottom Sheet for Comments */}
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
    </SafeAreaView>
  );
}
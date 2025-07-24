import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { ArrowLeft, Send, Heart, Reply } from 'lucide-react-native';

const mockComments = [
  { id: 1, user: "Siti M.", avatar: "S", comment: "Saya juga mengalami hal yang sama di lokasi ini.", time: "2 jam lalu", likes: 5, replies: [] },
  { id: 2, user: "Budi P.", avatar: "B", comment: "Terima kasih sudah melaporkan.", time: "1 jam lalu", likes: 3, replies: [] },
];

export default function ReportComments({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-sigap-lightteal">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        {/* Header */}
        <View className="p-4 border-b border-gray-200 bg-white flex-row items-center">
            <Pressable onPress={() => router.back()}>
                <ArrowLeft size={24} color="#297DD4" />
            </Pressable>
            <View className="ml-4">
                <Text className="text-lg font-bold text-sigap-dark">Komentar</Text>
                <Text className="text-sm text-gray-500">Laporan #{reportId}</Text>
            </View>
        </View>

        <ScrollView className="p-4">
            {mockComments.map((comment) => (
                <Card key={comment.id} className="p-4 mb-4">
                    <View className="flex-row space-x-3">
                        <Avatar>
                            <AvatarFallback className="bg-sigap-lightteal"><Text>{comment.avatar}</Text></AvatarFallback>
                        </Avatar>
                        <View className="flex-1">
                            <Text className="font-bold">{comment.user}</Text>
                            <Text className="text-gray-700">{comment.comment}</Text>
                            <View className="flex-row items-center space-x-4 mt-2">
                                <Pressable className="flex-row items-center space-x-1">
                                    <Heart size={14} color="gray"/>
                                    <Text className="text-xs">{comment.likes}</Text>
                                </Pressable>
                                <Pressable className="flex-row items-center space-x-1">
                                    <Reply size={14} color="gray"/>
                                    <Text className="text-xs">Balas</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Card>
            ))}
        </ScrollView>

        {/* Comment Input */}
        <View className="p-4 border-t border-gray-200 bg-white flex-row items-center space-x-2">
            <Textarea 
                placeholder="Tulis komentar..."
                value={newComment}
                onChangeText={setNewComment}
                className="flex-1"
            />
            <Button className="rounded-full w-12 h-12 p-0 items-center justify-center">
                <Send size={20} color="white"/>
            </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
import React, { useEffect, useState, useRef, JSX } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, Image, StatusBar, Animated, ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Gift, ArrowLeft } from 'lucide-react-native';

// --- Type Definition ---
interface TransactionData {
  rewardName: string;
  points: number;
  transactionId: string;
  phoneNumber: string;
}

// --- Component ---
export default function TukarPoinSuksesPage(): JSX.Element {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);

  // --- Animation Values ---
  const pulseAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('lastTransaction');
        if (data) {
          setTransactionData(JSON.parse(data));
        } else {
          // Fallback data if none found
          setTransactionData({
            rewardName: "Data Tidak Ditemukan",
            points: 0,
            transactionId: "N/A",
            phoneNumber: "N/A"
          });
        }
      } catch (error) {
        console.error("Failed to fetch transaction data from storage", error);
      }
    };

    fetchData();
  }, []);

  // --- Animation Effects ---
  useEffect(() => {
    // Pulse animation for the checkmark background
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.5, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    // Bounce animation for the gift icon
    Animated.loop(
        Animated.sequence([
            Animated.timing(bounceAnim, { toValue: -10, duration: 400, useNativeDriver: true }),
            Animated.timing(bounceAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
        { iterations: 4 } // Bounce a few times then stop
    ).start();

  }, [pulseAnim, bounceAnim]);

  // --- Handlers ---
  const handleBackToDashboard = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('lastTransaction');
    } catch (error) {
      console.error("Failed to remove transaction data", error);
    }
    router.push('/dashboard'); // Ganti dengan path dashboard yang sesuai
  };

  const handleTukarLagi = async (): Promise<void> => {
     try {
      await AsyncStorage.removeItem('lastTransaction');
    } catch (error) {
      console.error("Failed to remove transaction data", error);
    }
    router.push('/tukar-poin');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={20} color="#297dd4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Penukaran Berhasil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!transactionData ? (
          <ActivityIndicator size="large" color="#297dd4" />
        ) : (
          <>
            {/* Success Card */}
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                 <Animated.View style={[styles.pulseCircle, { opacity: pulseAnim }]}>
                    <CheckCircle size={48} color="#22c55e" />
                 </Animated.View>
                 <Animated.View style={[styles.bounceIcon, { transform: [{ translateY: bounceAnim }] }]}>
                    <Gift size={16} color="white" />
                 </Animated.View>
              </View>

              <Text style={styles.congratsTitle}>Selamat! 🎉</Text>
              <Text style={styles.congratsSubtitle}>Penukaran poin berhasil dilakukan</Text>

              {/* Reward Details */}
              <LinearGradient colors={['#7ed9f8', '#4db1ec']} style={styles.gradientWrapper}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}>Detail Penukaran</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reward:</Text>
                    <Text style={styles.detailValue}>{transactionData.rewardName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Poin Digunakan:</Text>
                    <Text style={[styles.detailValue, { color: '#297dd4' }]}>{transactionData.points.toLocaleString()} poin</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Nomor Tujuan:</Text>
                    <Text style={styles.detailValue}>{transactionData.phoneNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ID Transaksi:</Text>
                    <Text style={[styles.detailValue, { color: '#297dd4' }]}>{transactionData.transactionId}</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Processing Info */}
              <View style={styles.processingInfoBox}>
                  <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
                  <View style={{ flex: 1 }}>
                      <Text style={styles.processingTitle}>Sedang Diproses</Text>
                      <Text style={styles.processingText}>
                          Reward akan dikirim dalam 5-15 menit. Kamu akan mendapat notifikasi setelah berhasil.
                      </Text>
                  </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={handleBackToDashboard} style={[styles.button, styles.primaryButton]}>
                  <Text style={styles.primaryButtonText}>Kembali ke Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTukarLagi} style={[styles.button, styles.secondaryButton]}>
                  <Text style={styles.secondaryButtonText}>Tukar Poin Lagi</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tips Card */}
            <View style={styles.tipsCard}>
                <Text style={styles.tipsTitle}>💡 Tips</Text>
                <Text style={styles.tipItem}>• Simpan ID transaksi untuk referensi</Text>
                <Text style={styles.tipItem}>• Cek notifikasi untuk status pengiriman</Text>
                <Text style={styles.tipItem}>• Laporkan masalah jika tidak diterima dalam 24 jam</Text>
                <Text style={styles.tipItem}>• Kumpulkan lebih banyak poin dengan melaporkan!</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#7ed9f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(77, 177, 236, 0.2)',
  },
  headerButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0b0f2c' },
  scrollContainer: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#dcfce7', // bg-green-100
    alignItems: 'center',
    justifyContent: 'center',
  },
  bounceIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#facc15', // bg-yellow-400
    alignItems: 'center',
    justifyContent: 'center'
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b0f2c',
    marginBottom: 4,
  },
  congratsSubtitle: {
    fontSize: 18,
    color: '#297dd4',
    marginBottom: 24,
  },
  gradientWrapper: {
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    width: '100%'
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0f2c',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#4b5563', // text-gray-600
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0b0f2c',
  },
  processingInfoBox: {
    backgroundColor: '#eff6ff', // bg-blue-50
    borderWidth: 1,
    borderColor: '#bfdbfe', // border-blue-200
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
    width: '100%'
  },
  pulseDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6', // bg-blue-500
    borderRadius: 4,
    marginTop: 6
  },
  processingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af', // text-blue-800
    marginBottom: 2
  },
  processingText: {
    fontSize: 12,
    color: '#2563eb' // text-blue-600
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#297dd4',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#297dd4',
  },
  secondaryButtonText: {
    color: '#297dd4',
    fontSize: 16,
    fontWeight: '600'
  },
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0f2c',
    marginBottom: 8
  },
  tipItem: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  }
});
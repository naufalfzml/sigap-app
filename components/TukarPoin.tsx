import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Gift,
  LucideProps,
  Search,
  Smartphone,
  Trophy,
  Wifi,
  Zap
} from 'lucide-react-native';
import React, { JSX, useState } from "react";
import {
  ActivityIndicator,
  Image, Modal, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// --- Type Definitions ---

type RewardCategory = 'pulsa' | 'listrik' | 'kuota' | 'voucher' | 'fnb';
type TransactionStatus = 'completed' | 'processing' | 'failed';

interface Reward {
    id: number;
    name: string;
    category: RewardCategory;
    provider: string;
    points: number;
    originalPrice: number;
    discount: number;
    stock: number;
    popular: boolean;
    image: any;
    description: string;
}

interface Transaction {
    id: string;
    rewardName: string;
    points: number;
    status: TransactionStatus;
    date: string;
    phoneNumber: string;
}

interface Category {
    id: string;
    name: string;
    icon: React.FC<LucideProps>;
}

const rewards: Reward[] = [
  { id: 1, name: "Pulsa Telkomsel 25K", category: "pulsa", provider: "Telkomsel", points: 2500, originalPrice: 27000, discount: 7, stock: 50, popular: true, image: require("../assets/images/telkomsel.png"), description: "Pulsa reguler Telkomsel 25.000" },
  { id: 2, name: "Pulsa XL 50K", category: "pulsa", provider: "XL", points: 4800, originalPrice: 52000, discount: 8, stock: 30, popular: false, image: require("../assets/images/xl.png"), description: "Pulsa reguler XL 50.000" },
  { id: 3, name: "Pulsa Indosat 10K", category: "pulsa", provider: "Indosat", points: 1000, originalPrice: 11000, discount: 9, stock: 100, popular: true, image: require("../assets/images/indosat.png"), description: "Pulsa reguler Indosat 10.000" },
  { id: 4, name: "Token PLN 20K", category: "listrik", provider: "PLN", points: 2000, originalPrice: 22000, discount: 9, stock: 75, popular: true, image: require("../assets/images/pln.png"), description: "Token listrik PLN 20.000" },
  { id: 5, name: "Token PLN 50K", category: "listrik", provider: "PLN", points: 4900, originalPrice: 52000, discount: 6, stock: 40, popular: false, image: require("../assets/images/pln.png"), description: "Token listrik PLN 50.000" },
  { id: 6, name: "Kuota XL 3GB", category: "kuota", provider: "XL", points: 1500, originalPrice: 17000, discount: 12, stock: 60, popular: true, image: require("../assets/images/xl.png"), description: "Kuota internet XL 3GB 30 hari" },
  { id: 7, name: "Kuota Smartfren 5GB", category: "kuota", provider: "Smartfren", points: 2200, originalPrice: 25000, discount: 12, stock: 35, popular: false, image: require("../assets/images/smartfren.png"), description: "Kuota internet Smartfren 5GB 30 hari" },
  { id: 8, name: "Voucher Grab 25K", category: "voucher", provider: "Grab", points: 2400, originalPrice: 25000, discount: 4, stock: 25, popular: true, image:  require("../assets/images/grab.png"), description: "Voucher Grab senilai 25.000" },
  { id: 9, name: "Voucher GoFood 20K", category: "voucher", provider: "GoFood", points: 1900, originalPrice: 20000, discount: 5, stock: 45, popular: false, image: require("../assets/images/gofood.png") , description: "Voucher GoFood senilai 20.000" },
];

const transactionHistory: Transaction[] = [
  { id: "TXN001", rewardName: "Pulsa Telkomsel 25K", points: 2500, status: "completed", date: "2024-01-15", phoneNumber: "081234567890" },
  { id: "TXN002", rewardName: "Token PLN 20K", points: 2000, status: "processing", date: "2024-01-14", phoneNumber: "123456789012" },
  { id: "TXN003", rewardName: "Kuota XL 3GB", points: 1500, status: "failed", date: "2024-01-13", phoneNumber: "081234567890" }
];

const categories: Category[] = [
  { id: "all", name: "Semua", icon: Gift },
  { id: "pulsa", name: "Pulsa", icon: Smartphone },
  { id: "listrik", name: "Token Listrik", icon: Zap },
  { id: "kuota", name: "Kuota", icon: Wifi },
  { id: "voucher", name: "Voucher", icon: Gift },
];

export default function RewardExchange(): JSX.Element {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isExchanging, setIsExchanging] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const userPoints: number = 2450;

  const filteredRewards: Reward[] = rewards.filter(reward => {
    const matchesCategory = selectedCategory === "all" || reward.category === selectedCategory;
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reward.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExchange = async (): Promise<void> => {
    if (!selectedReward || !phoneNumber) return;
    
    setIsExchanging(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transactionData = {
      rewardName: selectedReward.name,
      points: selectedReward.points,
      transactionId: "TXN" + Date.now().toString().slice(-6),
      phoneNumber: phoneNumber
    };
    
    try {
      await AsyncStorage.setItem('lastTransaction', JSON.stringify(transactionData));
    } catch (e) {
      console.error("Failed to save transaction.", e);
    }
    
    setIsExchanging(false);
    setModalVisible(false);
    router.push('/tukar-poin/sukses');
  };

  const openExchangeModal = (reward: Reward): void => {
    setSelectedReward(reward);
    setPhoneNumber('');
    setModalVisible(true);
  };

  const getStatusIcon = (status: TransactionStatus): JSX.Element | null => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} color="#22c55e" />;
      case 'processing': return <Clock size={16} color="#f59e0b" />;
      case 'failed': return <AlertCircle size={16} color="#ef4444" />;
      default: return null;
    }
  };

  const getStatusText = (status: TransactionStatus): string => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'processing': return 'Diproses';
      case 'failed': return 'Gagal';
      default: return status;
    }
  };

  // ... (JSX untuk renderRewardList, renderHistory, dan return utama tetap sama)
  // Tidak perlu mengubah JSX, karena perubahannya hanya pada penambahan tipe
  const renderRewardList = (): JSX.Element => (
    <>
      {/* User Points Banner */}
      <LinearGradient
        colors={['#297dd4', '#4db1ec']}
        style={styles.pointsBanner}
      >
        <View style={styles.pointsBannerContent}>
          <View>
            <Text style={styles.pointsLabel}>Total Poin</Text>
            <Text style={styles.pointsValue}>{userPoints.toLocaleString()}</Text>
            <View style={styles.badge} className='flex-row items-center'>
              <Trophy size={11} color="gold" />
              <Text style={styles.badgeText}> Pahlawan Kota</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Gift color="rgba(255,255,255,0.6)" size={48} />
            <Text style={[styles.pointsLabel, { marginTop: 4 }]}>Tukar sekarang!</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search style={styles.searchIcon} color="#9ca3af" size={16} />
        <TextInput
          placeholder="Cari reward atau provider..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor="#9ca3af"
        />
      </View>
      
      {/* Category Tabs */}
      <View style={{ marginBottom: 24 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                  <TouchableOpacity
                      key={category.id}
                      onPress={() => setSelectedCategory(category.id)}
                      style={[styles.tab, selectedCategory === category.id && styles.activeTab]}
                  >
                      <category.icon size={18} color={selectedCategory === category.id ? 'white' : '#0b0f2c'} />
                      <Text style={[styles.tabText, selectedCategory === category.id && styles.activeTabText]}>
                          {category.name}
                      </Text>
                  </TouchableOpacity>
              ))}
          </ScrollView>
      </View>

      {/* Rewards Grid */}
      <View style={styles.rewardsGrid}>
        {filteredRewards.map((reward) => {
            const isAffordable = userPoints >= reward.points;
            const isOutOfStock = reward.stock === 0;
            const isDisabled = !isAffordable || isOutOfStock;
            
            let buttonText = "Tukar";
            if (!isAffordable) buttonText = "Poin Kurang";
            if (isOutOfStock) buttonText = "Habis";

            const imageSource = typeof reward.image === 'string'
             ? { uri: reward.image }
             : reward.image;
            return (
              <View key={reward.id} style={styles.rewardCard}>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <View>
                    <Image source={ imageSource } style={styles.rewardImage} />
                    {reward.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>🔥</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.rewardHeader}>
                      <View style={{ flex: 1, marginRight: 8 }}>
                          <Text style={styles.rewardName}>{reward.name}</Text>
                          <Text style={styles.rewardDesc}>{reward.description}</Text>
                      </View>
                      {reward.discount > 0 && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeText}>-{reward.discount}%</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.rewardFooter}>
                      <View>
                        <Text style={styles.rewardPoints}>{reward.points.toLocaleString()} poin</Text>
                        <Text style={styles.rewardOriginalPrice}>Rp {reward.originalPrice.toLocaleString()}</Text>
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <Text style={styles.rewardStock}>Stok: {reward.stock}</Text>
                        <TouchableOpacity 
                          style={[styles.exchangeButton, isDisabled && styles.disabledButton]}
                          disabled={isDisabled}
                          onPress={() => openExchangeModal(reward)}
                        >
                            <Text style={styles.exchangeButtonText}>{buttonText}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
        })}
      </View>
    </>
  );
  
  const renderHistory = (): JSX.Element => (
    <View style={{ paddingBottom: 40 }}>
        <Text style={styles.pageTitle}>Riwayat Transaksi</Text>
        {transactionHistory.map((tx) => (
            <View key={tx.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                    <Text style={styles.historyRewardName}>{tx.rewardName}</Text>
                    <View style={styles.historyStatus}>
                        {getStatusIcon(tx.status)}
                        <Text style={styles.historyStatusText}>{getStatusText(tx.status)}</Text>
                    </View>
                </View>
                <View style={styles.historyDetails}>
                    <View style={styles.historyRow}>
                        <Text style={styles.historyLabel}>ID Transaksi:</Text>
                        <Text style={styles.historyValue}>{tx.id}</Text>
                    </View>
                    <View style={styles.historyRow}>
                        <Text style={styles.historyLabel}>Poin:</Text>
                        <Text style={[styles.historyValue, { color: '#297dd4' }]}>{tx.points.toLocaleString()}</Text>
                    </View>
                    <View style={styles.historyRow}>
                        <Text style={styles.historyLabel}>Tanggal:</Text>
                        <Text style={styles.historyValue}>{tx.date}</Text>
                    </View>
                    <View style={styles.historyRow}>
                        <Text style={styles.historyLabel}>Nomor:</Text>
                        <Text style={styles.historyValue}>{tx.phoneNumber}</Text>
                    </View>
                </View>
            </View>
        ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} className='mt-10'>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={20} color="#297dd4" />
          </TouchableOpacity>
          <Text className='text-lg font-bold text-sigap-dark'>Tukar Poin</Text>
        </View>
        <TouchableOpacity onPress={() => setShowHistory(!showHistory)} style={styles.historyButton}>
            <Text style={styles.historyButtonText}>{showHistory ? 'Kembali' : 'Riwayat'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {showHistory ? renderHistory() : renderRewardList()}
        </View>
      </ScrollView>

      {/* Exchange Confirmation Modal */}
      {selectedReward && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Konfirmasi Penukaran</Text>
              
              <View style={styles.modalRewardInfo}>
                  <Image source={typeof selectedReward.image === 'string' ? { uri: selectedReward.image } : selectedReward.image } style={{width: 50, height: 50, borderRadius: 8}} />
                  <View>
                      <Text style={styles.modalRewardName}>{selectedReward.name}</Text>
                      <Text style={styles.modalRewardPoints}>{selectedReward.points.toLocaleString()} poin</Text>
                  </View>
              </View>

              <View>
                  <Text style={styles.inputLabel}>
                      {selectedReward.category === 'listrik' ? 'ID Pelanggan' : 'Nomor HP'}
                  </Text>
                  <TextInput
                      placeholder={selectedReward.category === 'listrik' ? 'Masukkan ID Pelanggan' : 'Masukkan nomor HP'}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      style={styles.modalInput}
                      keyboardType="phone-pad"
                  />
              </View>

              <View style={styles.pointsSummary}>
                  <View style={styles.summaryRow}>
                      <Text>Poin Saat Ini:</Text>
                      <Text style={{fontWeight: '500'}}>{userPoints.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                      <Text>Poin Digunakan:</Text>
                      <Text style={{fontWeight: '500', color: '#ef4444'}}>-{selectedReward.points.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryTotalRow}>
                      <Text style={{fontWeight: 'bold'}}>Sisa Poin:</Text>
                      <Text style={{fontWeight: 'bold', color: '#297dd4'}}>{(userPoints - selectedReward.points).toLocaleString()}</Text>
                  </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.confirmButton, (!phoneNumber || isExchanging) && styles.disabledButton]}
                onPress={handleExchange}
                disabled={!phoneNumber || isExchanging}
              >
                {isExchanging ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.confirmButtonText}>Konfirmasi Tukar</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// StyleSheet tidak berubah
const styles = StyleSheet.create({
  // ... (salin semua styles dari jawaban sebelumnya)
  safeArea: { flex: 1, backgroundColor: '#7ed9f8' },
  container: { flex: 1, backgroundColor: '#7ed9f8' },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(77, 177, 236, 0.2)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { padding: 4 },
  logo: { width: 32, height: 32, borderRadius: 8 },
  historyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#297dd4',
    borderRadius: 6,
  },
  historyButtonText: { color: '#297dd4', fontWeight: '500' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#0b0f2c', marginBottom: 16 },
  pointsBanner: { borderRadius: 12, padding: 24, marginBottom: 24, overflow: 'hidden' },
  pointsBannerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pointsLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  pointsValue: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginTop: 8 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  searchContainer: { position: 'relative', marginBottom: 16 },
  searchIcon: { position: 'absolute', left: 12, top: 14, zIndex: 1 },
  searchInput: {
    backgroundColor: 'white',
    height: 44,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(77, 177, 236, 0.2)',
  },
  tab: { 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 4, 
      paddingHorizontal: 12, 
      paddingVertical: 8, 
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: 'rgba(255,255,255,0.8)',
      minWidth: 80,
  },
  activeTab: { backgroundColor: '#297dd4' },
  tabText: { fontSize: 12, color: '#0b0f2c' },
  activeTabText: { color: 'white' },
  rewardsGrid: { gap: 16, paddingBottom: 40 },
  rewardCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  rewardImage: { width: 60, height: 60, borderRadius: 8 },
  popularBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#ef4444', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  popularBadgeText: { color: 'white', fontSize: 12 },
  rewardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  rewardName: { fontSize: 14, fontWeight: '600', color: '#0b0f2c' },
  rewardDesc: { fontSize: 12, color: '#6b7280' },
  discountBadge: { backgroundColor: '#fee2e2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  discountBadgeText: { color: '#dc2626', fontSize: 12, fontWeight: '500' },
  rewardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  rewardPoints: { fontSize: 18, fontWeight: 'bold', color: '#297dd4' },
  rewardOriginalPrice: { fontSize: 12, color: '#9ca3af', textDecorationLine: 'line-through' },
  rewardStock: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  exchangeButton: { backgroundColor: '#297dd4', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  exchangeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  disabledButton: { backgroundColor: '#9ca3af' },
  historyCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  historyRewardName: { fontSize: 14, fontWeight: '600', color: '#0b0f2c' },
  historyStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyStatusText: { fontSize: 12 },
  historyDetails: { gap: 4 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  historyLabel: { fontSize: 12, color: '#6b7280' },
  historyValue: { fontSize: 12, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 12, padding: 24, width: '100%', gap: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#0b0f2c' },
  modalRewardInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8 },
  modalRewardName: { fontSize: 14, fontWeight: '600' },
  modalRewardPoints: { fontSize: 14, fontWeight: 'bold', color: '#297dd4' },
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  modalInput: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, fontSize: 14 },
  pointsSummary: { backgroundColor: '#eff6ff', borderRadius: 8, padding: 12, gap: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 14 },
  summaryTotalRow: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 14, borderTopWidth: 1, borderColor: '#dbeafe', paddingTop: 8, marginTop: 4 },
  confirmButton: { backgroundColor: '#297dd4', padding: 14, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 14, borderRadius: 8, alignItems: 'center' },
  cancelButtonText: { color: '#6b7280', fontWeight: '500', fontSize: 16 },
});
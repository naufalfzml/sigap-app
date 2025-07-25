import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, ImageIcon, MapPin, Navigation, Plus, Send, Upload, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ReportWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState({
    images: [],
    title: "",
    location: { 
      lat: -6.2088, 
      lng: 106.8456, 
      address: "Mendeteksi lokasi..." 
    },
    description: "",
    category: "",
  });

  // Request location permission on mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      // Request foreground permissions first
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        // Check if location services are enabled
        const locationEnabled = await Location.hasServicesEnabledAsync();
        if (!locationEnabled) {
          Alert.alert(
            "GPS Tidak Aktif",
            "Mohon aktifkan GPS/Location Services untuk mendeteksi lokasi Anda.",
            [
              { text: "OK", onPress: () => {} }
            ]
          );
          return;
        }
        
        // Auto-detect location on app start
        getCurrentLocation();
      } else {
        Alert.alert(
          "Izin Lokasi Diperlukan",
          "Aplikasi memerlukan akses lokasi untuk mendeteksi posisi Anda saat melaporkan masalah.",
          [
            { text: "OK", onPress: () => {} }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setReportData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: "Mendapatkan lokasi..."
        }
      }));

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          const formattedAddress = [
            address.name,
            address.street,
            address.district,
            address.city,
            address.region,
            address.postalCode
          ].filter(Boolean).join(', ');

          setReportData(prev => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address: formattedAddress || "Alamat tidak ditemukan"
            }
          }));
        } else {
          setReportData(prev => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            }
          }));
        }
      } catch (geocodeError) {
        console.error('Reverse geocoding error:', geocodeError);
        setReportData(prev => ({
          ...prev,
          location: {
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }
        }));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        "Lokasi Error", 
        "Tidak dapat mendapatkan lokasi. Pastikan GPS aktif dan berikan izin akses lokasi."
      );
      setReportData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: "Gagal mendapatkan lokasi"
        }
      }));
    }
  };

  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Camera permission is required to take photos");
      return;
    }

    if (reportData.images.length >= 3) {
      Alert.alert("Limit Reached", "Maksimal 3 file dapat diunggah");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setReportData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...result.assets] 
      }));
    }
  };

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Gallery permission is required to select photos");
      return;
    }

    const remainingSlots = 3 - reportData.images.length;
    if (remainingSlots <= 0) {
      Alert.alert("Limit Reached", "Maksimal 3 file dapat diunggah");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.slice(0, remainingSlots);
      setReportData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages] 
      }));
    }
  };

  const removeImage = (index) => {
    setReportData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting report:", reportData);
    router.push("/lapor/sukses")
  };

  const renderProgressBar = () => (
    <View style={{
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: 'rgba(255,255,255,0.9)',
      gap: 8
    }}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={{
            flex: 1,
            height: 4,
            backgroundColor: step <= currentStep ? '#297DD4' : '#D8F6F9',
            borderRadius: 2
          }}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={{ padding: 24 }}>
      {/* Title */}
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0B0F2C',
        marginBottom: 8
      }}>
        Unggah Bukti
      </Text>

      <Text style={{
        fontSize: 16,
        textAlign: 'center',
        color: '#0B0F2C',
        opacity: 0.7,
        marginBottom: 32,
        lineHeight: 22
      }}>
        Ambil foto untuk melaporkan masalah
      </Text>

      {/* Upload Area or Image Grid */}
      {reportData.images.length === 0 ? (
        <View style={{
          borderWidth: 2,
          borderColor: '#4DB1EC',
          borderStyle: 'dashed',
          borderRadius: 12,
          paddingVertical: 40,
          paddingHorizontal: 20,
          alignItems: 'center',
          backgroundColor: 'rgba(216, 246, 249, 0.3)',
          marginBottom: 24
        }}>
          <Upload size={48} color="#297DD4" style={{ marginBottom: 16 }} />
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C',
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Unggah Foto
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#0B0F2C',
            opacity: 0.6,
            textAlign: 'center',
            marginBottom: 24
          }}>
            Maksimal 3 file, ukuran masing-masing max 10MB
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable
              onPress={pickImageFromCamera}
              style={{
                backgroundColor: '#297DD4',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Camera size={16} color="white" />
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '500'
              }}>
                Ambil Foto
              </Text>
            </Pressable>

            <Pressable
              onPress={pickImageFromGallery}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#297DD4',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
              }}
            >
              <ImageIcon size={16} color="#297DD4" />
              <Text style={{
                color: '#297DD4',
                fontSize: 14,
                fontWeight: '500'
              }}>
                Dari Galeri
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12
          }}>
            {reportData.images.map((image, index) => (
              <View key={index} style={{ position: 'relative' }}>
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: (width - 80) / 2,
                    height: (width - 80) / 2,
                    borderRadius: 12
                  }}
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => removeImage(index)}
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: '#FF4D4F',
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={12} color="white" />
                </Pressable>
              </View>
            ))}
            
            {reportData.images.length < 3 && (
              <Pressable
                onPress={pickImageFromGallery}
                style={{
                  width: (width - 80) / 2,
                  height: (width - 80) / 2,
                  borderWidth: 2,
                  borderColor: '#4DB1EC',
                  borderStyle: 'dashed',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(216, 246, 249, 0.3)'
                }}
              >
                <Plus size={32} color="#297DD4" />
              </Pressable>
            )}
          </View>
        </View>
      )}

      <Pressable
        onPress={() => setCurrentStep(2)}
        disabled={reportData.images.length === 0}
        style={{
          backgroundColor: reportData.images.length > 0 ? '#297DD4' : '#D9D9D9',
          paddingVertical: 16,
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <Text style={{
          color: reportData.images.length > 0 ? 'white' : '#8C8C8C',
          fontSize: 14,
          fontWeight: '600'
        }}>
          Lanjutkan
        </Text>
      </Pressable>
    </View>
  );

  const renderStep2 = () => (
      <View style={{ padding: 24 }}>
        
        {/* Title */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#0B0F2C',
          marginBottom: 8
        }}>
          Judul, Lokasi & Deskripsi
        </Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          color: '#0B0F2C',
          opacity: 0.7,
          marginBottom: 32
        }}>
          Konfirmasi lokasi dan berikan rincian laporan
        </Text>

        {/* ====================================================== */}
        {/* ============ INPUT JUDUL LAPORAN DITAMBAHKAN ========= */}
        {/* ====================================================== */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#0B0F2C',
            marginBottom: 8
          }}>
            Judul Laporan
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'rgba(77, 177, 236, 0.3)',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              color: '#0B0F2C'
            }}
            placeholder="cth: Jalan Berlubang di Depan Sekolah"
            placeholderTextColor="#8C8C8C"
            value={reportData.title}
            onChangeText={(text) => setReportData(prev => ({ ...prev, title: text }))}
            maxLength={100}
          />
          <Text style={{
            fontSize: 12,
            color: '#0B0F2C',
            opacity: 0.6,
            marginTop: 4,
            textAlign: 'right'
          }}>
            {reportData.title.length}/100 karakter
          </Text>
        </View>

      {/* Location Card */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C'
          }}>
            Lokasi Laporan
          </Text>
          <Pressable
            onPress={getCurrentLocation}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#297DD4',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Navigation size={16} color="#297DD4" />
            <Text style={{ color: '#297DD4', fontSize: 14 }}>Deteksi</Text>
          </Pressable>
        </View>

        {/* Mini Map */}
        <View style={{
          height: 120,
          backgroundColor: '#D8F6F9',
          borderRadius: 8,
          marginBottom: 12,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Map pattern background */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1
          }}>
            {/* Grid pattern */}
            {Array.from({ length: 5 }).map((_, i) => (
              <View key={`h-${i}`} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: i * 24,
                height: 1,
                backgroundColor: '#297DD4'
              }} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`v-${i}`} style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: i * 40,
                width: 1,
                backgroundColor: '#297DD4'
              }} />
            ))}
          </View>
          
          {/* Location pin with pulse animation */}
          <View style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MapPin size={32} color="#297DD4" />
            <View style={{
              position: 'absolute',
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'rgba(41, 125, 212, 0.2)',
              top: -9
            }} />
          </View>
          
          {/* Coordinates display */}
          <View style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            backgroundColor: 'rgba(255,255,255,0.9)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'rgba(41, 125, 212, 0.2)'
          }}>
            <Text style={{ fontSize: 12, color: '#0B0F2C', fontWeight: '500' }}>
              {reportData.location.lat.toFixed(4)}, {reportData.location.lng.toFixed(4)}
            </Text>
          </View>
          
          {/* Status indicator */}
          {reportData.location.address === "Mendapatkan lokasi..." && (
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 193, 7, 0.9)',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4
            }}>
              <Text style={{ fontSize: 10, color: 'white', fontWeight: '500' }}>
                Detecting...
              </Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
          <MapPin size={16} color="#297DD4" style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ 
              fontSize: 14, 
              color: reportData.location.address.includes("Mendapatkan") || reportData.location.address.includes("Gagal") ? '#8C8C8C' : '#0B0F2C',
              flex: 1,
              fontStyle: reportData.location.address.includes("Mendapatkan") ? 'italic' : 'normal'
            }}>
              {reportData.location.address}
            </Text>
            {reportData.location.address !== "Mendeteksi lokasi..." && 
             reportData.location.address !== "Mendapatkan lokasi..." && 
             reportData.location.address !== "Gagal mendapatkan lokasi" && (
              <Text style={{ 
                fontSize: 12, 
                color: '#8C8C8C',
                marginTop: 2
              }}>
                Akurasi: GPS
              </Text>
            )}
          </View>
        </View>
      </View>


        {/* Description */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#0B0F2C',
            marginBottom: 8
          }}>
            Deskripsi Masalah
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'rgba(77, 177, 236, 0.3)',
              borderRadius: 8,
              padding: 12,
              minHeight: 100,
              textAlignVertical: 'top',
              fontSize: 16,
              color: '#0B0F2C'
            }}
            placeholder="Jelaskan masalah yang ditemukan secara lebih rinci..."
            placeholderTextColor="#8C8C8C"
            value={reportData.description}
            onChangeText={(text) => setReportData(prev => ({ ...prev, description: text }))}
            multiline
            maxLength={500}
          />
          <Text style={{
            fontSize: 12,
            color: '#0B0F2C',
            opacity: 0.6,
            marginTop: 4,
            textAlign: 'right'
          }}>
            {reportData.description.length}/500 karakter
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable
            onPress={() => setCurrentStep(1)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#297DD4',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#297DD4', fontSize: 14, fontWeight: '600' }}>
              Kembali
            </Text>
          </Pressable>
          <Pressable
            // Validasi sekarang memeriksa judul DAN deskripsi
            onPress={() => setCurrentStep(3)}
            disabled={!reportData.title.trim() || !reportData.description.trim()}
            style={{
              flex: 1,
              backgroundColor: reportData.title.trim() && reportData.description.trim() ? '#297DD4' : '#D9D9D9',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: reportData.title.trim() && reportData.description.trim() ? 'white' : '#8C8C8C',
              fontSize: 14,
              fontWeight: '600'
            }}>
              Lanjutkan
            </Text>
          </Pressable>
        </View>
      </View>
    );

  const renderStep3 = () => (
      <View style={{ padding: 24 }}>
        {/* Title */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#0B0F2C',
          marginBottom: 8
        }}>
          Tinjau & Kirim
        </Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          color: '#0B0F2C',
          opacity: 0.7,
          marginBottom: 32
        }}>
          Periksa kembali laporan Anda sebelum mengirim
        </Text>

        {/* ====================================================== */}
        {/* ========= TINJAUAN JUDUL LAPORAN DITAMBAHKAN ========= */}
        {/* ====================================================== */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C',
            marginBottom: 12
          }}>
            Judul Laporan
          </Text>
          <Text style={{ fontSize: 14, color: '#0B0F2C', opacity: 0.8 }}>
            {reportData.title}
          </Text>
        </View>
        {/* ====================================================== */}
        {/* ================ AKHIR TINJAUAN JUDUL ================ */}
        {/* ====================================================== */}

        {/* Review Images */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C',
            marginBottom: 12
          }}>
            Bukti Foto
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {reportData.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={{
                  width: (width - 88) / 3, // Disesuaikan sedikit agar pas
                  height: (width - 88) / 3,
                  borderRadius: 8
                }}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

        {/* Review Location */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C',
            marginBottom: 12
          }}>
            Lokasi
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <MapPin size={16} color="#297DD4" style={{ marginTop: 2 }} />
            <Text style={{ fontSize: 14, color: '#0B0F2C', flex: 1 }}>
              {reportData.location.address}
            </Text>
          </View>
        </View>

        {/* Review Description */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#0B0F2C',
            marginBottom: 12
          }}>
            Deskripsi
          </Text>
          <Text style={{ fontSize: 14, color: '#0B0F2C', opacity: 0.8 }}>
            {reportData.description}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#297DD4',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#297DD4', fontSize: 14, fontWeight: '600' }}>
              Kembali
            </Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            style={{
              flex: 1,
              backgroundColor: '#297DD4',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <Send size={16} color="white" />
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
              Kirim Laporan
            </Text>
          </Pressable>
        </View>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7ED9F8' }}>
      {/* Header */}
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(77, 177, 236, 0.2)'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12
        }}>
          <Pressable
            onPress={() => currentStep === 1 ? router.back() : setCurrentStep(currentStep - 1)}
            style={{ marginRight: 12 }}
          >
            <ArrowLeft size={20} color="#297DD4" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#0B0F2C'
            }}>
              Buat Laporan
            </Text>
          </View>
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#297DD4'
          }}>
            {currentStep}/3
          </Text>
        </View>
        {renderProgressBar()}
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          margin: 16,
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
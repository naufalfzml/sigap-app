// File: components/ProcessIllustration.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Defs, Pattern, Path, Circle, Rect } from 'react-native-svg';
import { File, Brain, Shield, Zap } from 'lucide-react-native';

const CircuitBackground = () => (
  <View style={StyleSheet.absoluteFill}>
    <Svg width="100%" height="100%" style={{ opacity: 0.1 }}>
      <Defs>
        <Pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
          <Path d="M20 0v20M0 20h40M20 20h20M20 20v20" stroke="#297dd4" strokeWidth="1" />
          <Circle cx="20" cy="20" r="2" fill="#297dd4" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#circuit)" />
    </Svg>
  </View>
);

const ProcessIllustration = () => {
  return (
    <LinearGradient
      colors={['#d8f6f9', '#4db1ec4D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full h-48 rounded-2xl overflow-hidden"
    >
      <CircuitBackground />
      <View className="flex-1 flex-row items-center justify-center space-x-4 px-2 z-10">
        {/* Ikon-ikon diletakkan di sini */}
        <View className="items-center"><View className="w-14 h-14 bg-sigap-blue rounded-xl items-center justify-center shadow-lg mb-2"><File size={26} color="white" /></View><Text className="font-semibold text-gray-700">Laporan</Text></View>
        <View className="items-center"><View className="w-14 h-14 bg-sigap-blue rounded-full items-center justify-center shadow-lg mb-2"><Brain size={26} color="white" /></View><Text className="font-semibold text-gray-700">AI</Text></View>
        <View className="items-center"><View className="w-14 h-14 bg-green-500 rounded-xl items-center justify-center shadow-lg mb-2"><Shield size={26} color="white" /></View><Text className="font-semibold text-green-500">Blockchain</Text></View>
        <View className="items-center"><View className="w-14 h-14 bg-orange-500 rounded-xl items-center justify-center shadow-lg mb-2"><Zap size={26} color="white" /></View><Text className="font-semibold text-orange-500">Dinas</Text></View>
      </View>
    </LinearGradient>
  );
};

export default ProcessIllustration;
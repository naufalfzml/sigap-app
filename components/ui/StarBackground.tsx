// StarBackground.js

import { Star } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// --- PENGATURAN GRID BINTANG ---
const STAR_SIZE = 30; // Ukuran setiap bintang
const HORIZONTAL_SPACING = 60; // Jarak horizontal antar bintang
const VERTICAL_SPACING = 50; // Jarak vertikal antar bintang

// Fungsi untuk menghasilkan data bintang dalam format grid
const generateGridStars = () => {
  const stars = [];
  let id = 0;
  
  // Perulangan untuk setiap baris (sumbu Y)
  for (let y = 0; y < height * 0.4; y += VERTICAL_SPACING) {
    const isRowOdd = (y / VERTICAL_SPACING) % 2 !== 0;
    // Beri sedikit geseran horizontal untuk baris ganjil
    const offsetX = isRowOdd ? HORIZONTAL_SPACING / 2 : 0;

    // Perulangan untuk setiap kolom (sumbu X)
    for (let x = -offsetX; x < width; x += HORIZONTAL_SPACING) {
      stars.push({
        id: id++,
        left: x,
        top: y,
      });
    }
  }
  return stars;
};

const StarBackground = () => {
  // useMemo agar posisi bintang tidak dibuat ulang setiap kali re-render
  const stars = useMemo(() => generateGridStars(), []);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {stars.map((star) => (
        <View key={star.id} style={{ position: 'absolute', left: star.left, top: star.top }}>
          <Star
            size={STAR_SIZE}
            color="#fbbf24"
            fill="#fbbf24"
            style={{ opacity: 0.65 }} // Atur opasitas sesuai keinginan
          />
        </View>
      ))}
    </View>
  );
};

export default StarBackground;
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const mockReports = [
  { id: 1, lat: -7.565, lng: 110.823, status: "new" },
  { id: 2, lat: -7.575, lng: 110.833, status: "progress" },
  { id: 3, lat: -7.585, lng: 110.815, status: "completed" },
];

const Surakarta = { lat: -7.5758833587959735, lng: 110.8239608122263, zoom: 13 };

export default function LeafletMap({ onReportSelect }: { onReportSelect: (r:any)=>void }) {
  const html = useMemo(() => {
    const markers = JSON.stringify(mockReports);
    const center = JSON.stringify(Surakarta);

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
  html, body, #map { height: 100%; margin: 0; padding: 0; }
  .leaflet-container { background: #e6f7f7; }
  .legend {
    position: absolute; bottom: 12px; left: 12px; background: white; padding: 8px 10px;
    border-radius: 8px; font: 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
  }
  .legend-item { display: flex; align-items: center; gap: 6px; margin: 4px 0; }
  .dot { width: 10px; height: 10px; border-radius: 999px; border: 1px solid #fff; }
</style>
</head>
<body>
<div id="map"></div>
<div class="legend">
  <div class="legend-item"><span class="dot" style="background:#ef4444"></span> Baru</div>
  <div class="legend-item"><span class="dot" style="background:#f59e0b"></span> Proses</div>
  <div class="legend-item"><span class="dot" style="background:#22c55e"></span> Selesai</div>
</div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  const RN = window.ReactNativeWebView;
  const center = ${center};
  const data = ${markers};

  const map = L.map('map', { zoomControl: true }).setView([center.lat, center.lng], center.zoom);

  // OSM tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const statusColors = {
    new: '#ef4444',
    progress: '#f59e0b',
    completed: '#22c55e',
    default: '#3b82f6'
  };

  const layerGroup = L.layerGroup().addTo(map);
  const latlngs = [];

  // Dot markers
  data.forEach(r => {
    const color = statusColors[r.status] || statusColors.default;
    const ll = [r.lat, r.lng];
    latlngs.push(ll);

    L.circleMarker(ll, {
      radius: 6,
      color: '#fff',
      weight: 1.5,
      fillColor: color,
      fillOpacity: 1.0
    })
    .bindTooltip('Report ' + r.id + ' (' + r.status + ')', { direction: 'top', offset: [0,-6] })
    .on('click', () => {
      RN.postMessage(JSON.stringify({ type: 'marker-click', payload: r }));
    })
    .addTo(layerGroup);
  });

  // Auto-fit view ke semua titik
  if (latlngs.length > 1) {
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [24, 24] });
  }
</script>
</body>
</html>`;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        onMessage={(e) => {
          try {
            const msg = JSON.parse(e.nativeEvent.data);
            if (msg.type === 'marker-click') onReportSelect?.(msg.payload);
          } catch {}
        }}
      />
    </View>
  );
}

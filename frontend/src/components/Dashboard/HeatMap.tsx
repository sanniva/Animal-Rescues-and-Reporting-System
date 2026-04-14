import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Fix for default markers in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Report {
  report_id: number;
  location_address: string;
  animal_type: string;
  submitted_at: string;
}

interface HeatmapProps {
  reports: Report[];
  height?: string;
  width?: string;
}

// Geocoding cache to avoid rate limits
const geocodeCache = new Map<string, [number, number]>();

const HeatmapLayer: React.FC<{ reports: Report[] }> = ({ reports }) => {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const heatLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    let cancelled = false;

    const geocodeAddresses = async () => {
      if (!reports || reports.length === 0) return;

      setLoading(true);
      setError(null);

      const coordinates: [number, number, number][] = [];
      let geocodedCount = 0;

      for (const report of reports) {
        if (cancelled) return;

        const address = report.location_address;

        // Skip invalid addresses
        if (!address || address === 'No location' || address.trim() === '') {
          continue;
        }

        // Check cache first
        if (geocodeCache.has(address)) {
          const coords = geocodeCache.get(address)!;
          coordinates.push([coords[0], coords[1], 1]);
          geocodedCount++;
          continue;
        }

        try {
          // Using Nominatim (OpenStreetMap) for geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
            {
              headers: {
                'User-Agent': 'ResQAll-App'
              }
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              geocodeCache.set(address, [lat, lon]);
              coordinates.push([lat, lon, 1]);
              geocodedCount++;
            }
          }

          // Rate limiting for Nominatim (1 request per second)
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.error('Geocoding error for address:', address, err);
        }
      }

      // Don't touch the map if component has unmounted
      if (cancelled) return;

      if (coordinates.length > 0 && map && map.getPane('overlayPane')) {
        // @ts-ignore - leaflet.heat types
        const heat = L.heatLayer(coordinates, {
          radius: 30,
          blur: 20,
          maxZoom: 17,
          gradient: {
            0.2: '#0000ff',  // Blue - Low
            0.4: '#00ff00',  // Green - Medium
            0.6: '#ffff00',  // Yellow - High
            0.8: '#ff9900',  // Orange - Very High
            1.0: '#ff0000'   // Red - Critical
          }
        });

        heat.addTo(map);
        heatLayerRef.current = heat;

        // Fit map bounds to show all coordinates
        if (coordinates.length > 1) {
          const bounds = L.latLngBounds(coordinates.map(c => [c[0], c[1]]));
          map.fitBounds(bounds, { padding: [50, 50] });
        } else if (coordinates.length === 1) {
          map.setView([coordinates[0][0], coordinates[0][1]], 13);
        }
      }

      if (!cancelled) {
        setLoading(false);
        if (geocodedCount === 0) {
          setError('Could not geocode any addresses');
        }
      }
    };

    geocodeAddresses();

    return () => {
      cancelled = true;
      // Clean up heat layer on unmount
      if (heatLayerRef.current && map) {
        map.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }
    };
  }, [reports, map]);

  if (loading) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '3px solid #e0e0e0',
          borderTop: '3px solid #2D5A27',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ margin: 0 }}>Processing location data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#ffebee',
        color: '#c62828',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>📍</span>
        {error}
      </div>
    );
  }

  return null;
};

export const Heatmap: React.FC<HeatmapProps> = ({
  reports,
  height = '500px',
  width = '100%'
}) => {
  // Filter out reports without valid location
  const validReports = reports.filter(r =>
    r.location_address &&
    r.location_address.trim() !== '' &&
    r.location_address !== 'No location'
  );

  // Default center (Kathmandu, Nepal)
  const defaultCenter: [number, number] = [27.7172, 85.3240];

  return (
    <div style={{ height, width, position: 'relative' }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer reports={validReports} />
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontSize: '12px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          Incident Intensity
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#0000ff', fontSize: '16px' }}>●</span>
            <span>Low</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#00ff00', fontSize: '16px' }}>●</span>
            <span>Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#ffff00', fontSize: '16px', textShadow: '0 0 1px #000' }}>●</span>
            <span>High</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#ff9900', fontSize: '16px' }}>●</span>
            <span>Very High</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#ff0000', fontSize: '16px' }}>●</span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      {/* Stats badge */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#2D5A27',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>📍</span>
        <span>{validReports.length} locations mapped</span>
      </div>
    </div>
  );
};
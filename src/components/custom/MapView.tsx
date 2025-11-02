import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {  Navigation2 } from 'lucide-react';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface MapViewProps {
  pickupLocation: Location;
  destinationLocation: Location;
  className?: string;
}

// Enhanced custom icons with modern styling
const createCustomIcon = (type: 'pickup' | 'destination') => {
  const isPick = type === 'pickup';
  const color = isPick ? '#10b981' : '#3b82f6';
  const shadowColor = isPick ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: 48px;
        height: 48px;
        transform: translate(-50%, -100%);
      ">
        <div style="
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 20px ${shadowColor}, 0 0 0 4px white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
        ">
          <div style="
            width: 36px;
            height: 36px;
            background: ${color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
          ">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              ${isPick ? 
                '<circle cx="12" cy="12" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="white" stroke-width="2"/>' :
                '<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>'
              }
            </svg>
          </div>
        </div>
        <div style="
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: ${color};
          border-radius: 50%;
          opacity: 0.4;
        "></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
  });
};

export default function MapView({
  pickupLocation = {
    lat: 26.8103,
    lng: 90.4125,
    address: "Gulshan, Dhaka"
  },
  destinationLocation = {
    lat: 24.2092,
    lng: 90.4725,
    address: "Dhanmondi, Dhaka"
  },
  className = ""
}: MapViewProps) {
  const mapRef = useRef<L.Map>(null);

  const bounds: L.LatLngBoundsExpression = useMemo(() => [
    [pickupLocation?.lat, pickupLocation?.lng],
    [destinationLocation?.lat, destinationLocation?.lng]
  ], [pickupLocation, destinationLocation]);

  const polylinePositions: L.LatLngExpression[] = [
    [pickupLocation?.lat, pickupLocation?.lng],
    [destinationLocation?.lat, destinationLocation?.lng]
  ];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, {
        padding: [100, 100],
        maxZoom: 14
      });
    }
  }, [bounds, pickupLocation, destinationLocation]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        className="h-full w-full z-0"
        zoomControl={true}
        attributionControl={false}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={false}
        touchZoom={true}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Pickup Marker */}
        <Marker
          position={[pickupLocation?.lat, pickupLocation?.lng]}
          icon={createCustomIcon('pickup')}
        >
          <Popup className="custom-popup">
            <div className="p-2">
              <p className="font-semibold text-sm mb-1">Pickup Location</p>
              <p className="text-xs text-gray-600">{pickupLocation?.address}</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker
          position={[destinationLocation?.lat, destinationLocation?.lng]}
          icon={createCustomIcon('destination')}
        >
          <Popup className="custom-popup">
            <div className="p-2">
              <p className="font-semibold text-sm mb-1">Destination</p>
              <p className="text-xs text-gray-600">{destinationLocation?.address}</p>
            </div>
          </Popup>
        </Marker>

        {/* Route Line */}
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: '#3b82f6',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 15',
            lineCap: 'round',
            lineJoin: 'round'
          }}
        />
      </MapContainer>

      {/* Info Card Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
        <div className="glass-morphism rounded-xl px-4 py-3 shadow-soft pointer-events-auto max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Navigation2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Trip</p>
              <p className="text-sm font-semibold text-foreground truncate">En route to destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] pointer-events-none">
        <div className="glass-morphism rounded-xl px-3 py-2 shadow-soft pointer-events-auto">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-foreground font-medium">Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-foreground font-medium">Drop-off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

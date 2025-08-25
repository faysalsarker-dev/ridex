import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';

// Fix for default markers in react-leaflet
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

// Enhanced custom icons with better styling
const createCustomIcon = (type: 'pickup' | 'destination') => {
  const color = type === 'pickup' ? '#10b981' : '#ef4444';
  const bgColor = type === 'pickup' ? '#dcfce7' : '#fee2e2';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: ${color};
        border: 4px solid white;
        border-radius: 50%;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3), 0 0 0 8px ${bgColor}50;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transform: translate(-50%, -50%);
      ">
        <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
          ${type === 'pickup' ? 
            '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>' :
            '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
          }
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

export default function MapView({ pickupLocation, destinationLocation, className = "" }: MapViewProps) {
  const mapRef = useRef<L.Map>(null);

  // Calculate center and zoom to fit both locations with better bounds
  const bounds: L.LatLngBoundsExpression = [
    [pickupLocation.lat, pickupLocation.lng],
    [destinationLocation.lat, destinationLocation.lng]
  ];

  // Enhanced polyline path with intermediate points for better visualization
  const polylinePositions: L.LatLngExpression[] = [
    [pickupLocation.lat, pickupLocation.lng],
    [destinationLocation.lat, destinationLocation.lng]
  ];

  useEffect(() => {
    if (mapRef.current) {
      // Fit map to show both locations with generous padding
      mapRef.current.fitBounds(bounds, { 
        padding: [80, 80],
        maxZoom: 15 // Prevent over-zooming
      });
    }
  }, [pickupLocation, destinationLocation]);

  return (
    <div className={`relative h-full w-full ${className}`}>
  


<MapContainer
  ref={mapRef}
  bounds={bounds}
  className="h-full w-full z-0 rounded-lg"
  zoomControl={true}
  attributionControl={false}
  scrollWheelZoom={true}
  dragging={true}
  doubleClickZoom={false}
  touchZoom={false}
  boxZoom={false}
  keyboard={false}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  />
  {/* Pickup Marker */}
  <Marker position={[pickupLocation.lat, pickupLocation.lng]} icon={createCustomIcon('pickup')}>
    <Popup>Pickup: {pickupLocation.address}</Popup>
  </Marker>

  {/* Destination Marker */}
  <Marker position={[destinationLocation.lat, destinationLocation.lng]} icon={createCustomIcon('destination')}>
    <Popup>Destination: {destinationLocation.address}</Popup>
  </Marker>

  {/* Route Line */}
  <Polyline
    positions={polylinePositions}
    pathOptions={{
      color: '#0891b2',
      weight: 5,
      opacity: 0.8,
      dashArray: '10, 10',
      lineCap: 'round',
      lineJoin: 'round'
    }}
  />
</MapContainer>



      {/* Map overlay for better mobile experience */}
      <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground font-medium">Current Ride</p>
      </div>
    </div>
  );
}
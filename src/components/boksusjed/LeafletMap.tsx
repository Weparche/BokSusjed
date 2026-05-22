import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { divIcon, type LatLngExpression } from 'leaflet';
import { mapCenter } from '../../data/boksusjedMock';
import type { MapPin as MapPinType } from '../../types/boksusjed';
import type { GeoPoint } from '../../utils/geo';
import { POST_TYPE_STYLES } from '../../utils/postHelpers';
import { PIN_COLORS } from '../../utils/mapPinColors';
import { formatDistance } from '../../utils/formatTime';

function createPinIcon(type: MapPinType['type'], selected: boolean) {
  const colors = PIN_COLORS[type];
  const size = selected ? 40 : 34;

  return divIcon({
    className: '',
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${colors.bg};
        border:2.5px solid ${selected ? '#16a34a' : colors.border};
        border-radius:9999px;
        box-shadow:0 4px 14px rgba(15,23,42,${selected ? '0.22' : '0.14'});
        display:flex;align-items:center;justify-content:center;
        transform:translate(-50%,-100%);
        ${selected ? 'scale:1.1;' : ''}
      ">
        <span style="width:10px;height:10px;border-radius:9999px;background:${colors.border};"></span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

const pickerIcon = divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;background:#16a34a;border:3px solid white;border-radius:9999px;box-shadow:0 4px 12px rgba(22,163,74,0.45);transform:translate(-50%,-100%);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function MapController({
  selectedPin,
  flyToCenter,
  flyToUser,
  userLocation,
  focusPoint,
}: {
  selectedPin: MapPinType | null;
  flyToCenter: number;
  flyToUser: number;
  userLocation: GeoPoint | null;
  focusPoint?: GeoPoint | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 16, { duration: 0.7 });
    }
  }, [selectedPin, map]);

  useEffect(() => {
    if (flyToCenter > 0) {
      map.flyTo([mapCenter.lat, mapCenter.lng], mapCenter.zoom, { duration: 0.7 });
    }
  }, [flyToCenter, map]);

  useEffect(() => {
    if (flyToUser > 0 && userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 0.7 });
    }
  }, [flyToUser, userLocation, map]);

  useEffect(() => {
    if (focusPoint) {
      map.flyTo([focusPoint.lat, focusPoint.lng], 16, { duration: 0.5 });
    }
  }, [focusPoint, map]);

  return null;
}

interface LeafletMapProps {
  pins: MapPinType[];
  selectedPin?: MapPinType | null;
  onSelectPin?: (pin: MapPinType) => void;
  flyToCenter?: number;
  flyToUser?: number;
  userLocation?: GeoPoint | null;
  pickerMode?: boolean;
  pickerValue?: GeoPoint | null;
  onPickerChange?: (point: GeoPoint) => void;
  className?: string;
  zoom?: number;
}

export function LeafletMap({
  pins,
  selectedPin = null,
  onSelectPin,
  flyToCenter = 0,
  flyToUser = 0,
  userLocation = null,
  pickerMode = false,
  pickerValue = null,
  onPickerChange,
  className = 'h-full w-full rounded-[1.75rem] z-0',
  zoom = mapCenter.zoom,
}: LeafletMapProps) {
  const center: LatLngExpression = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [mapCenter.lat, mapCenter.lng];

  function PickerClickHandler() {
    useMapEvents({
      click(e) {
        onPickerChange?.({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom
      zoomControl={!pickerMode}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        selectedPin={selectedPin}
        flyToCenter={flyToCenter}
        flyToUser={flyToUser}
        userLocation={userLocation}
        focusPoint={pickerMode ? pickerValue : null}
      />

      {pickerMode && <PickerClickHandler />}

      {(userLocation ?? (!pickerMode ? { lat: mapCenter.lat, lng: mapCenter.lng } : null)) && (
        <CircleMarker
          center={userLocation ? [userLocation.lat, userLocation.lng] : center}
          radius={pickerMode ? 8 : 10}
          pathOptions={{
            color: '#ffffff',
            weight: 3,
            fillColor: '#3b82f6',
            fillOpacity: 1,
          }}
        />
      )}

      {pickerMode && pickerValue && (
        <Marker position={[pickerValue.lat, pickerValue.lng]} icon={pickerIcon} />
      )}

      {!pickerMode &&
        pins.map((pin) => {
          const style = POST_TYPE_STYLES[pin.type];
          const isSelected = selectedPin?.id === pin.id;

          return (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createPinIcon(pin.type, isSelected)}
              eventHandlers={{
                click: () => onSelectPin?.(pin),
              }}
            >
              <Popup className="boksusjed-popup">
                <div className="min-w-[160px]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {style.label}
                  </p>
                  <p className="mt-1 font-bold text-slate-900">{pin.title}</p>
                  <p className="mt-1 text-xs font-medium text-brand-600">
                    {formatDistance(pin.distanceMeters)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}

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
import { divIcon, latLngBounds, type LatLngExpression } from 'leaflet';
import { mapCenter } from '../../data/boksusjedMock';
import type { LayerMapPin, MapPin as MapPinType } from '../../types/boksusjed';
import type { GeoPoint } from '../../utils/geo';
import { POST_TYPE_STYLES } from '../../utils/postHelpers';
import { createLayerPinDivIcon, createMapPinDivIcon } from '../../utils/mapPinIconHtml';
import { formatDistance } from '../../utils/formatTime';

function createPinIcon(type: MapPinType['type'], selected: boolean) {
  const icon = createMapPinDivIcon(type, selected);
  return divIcon({
    className: '',
    html: icon.html,
    iconSize: icon.iconSize,
    iconAnchor: icon.iconAnchor,
    popupAnchor: icon.popupAnchor,
  });
}

function createLayerIcon(color: LayerMapPin['color'], selected: boolean) {
  const icon = createLayerPinDivIcon(color, selected);
  return divIcon({
    className: '',
    html: icon.html,
    iconSize: icon.iconSize,
    iconAnchor: icon.iconAnchor,
    popupAnchor: icon.popupAnchor,
  });
}

function LayerPinsBoundsHandler({ pins }: { pins: LayerMapPin[] }) {
  const map = useMap();

  useEffect(() => {
    const fitToPins = () => {
      map.invalidateSize();

      if (pins.length === 0) {
        map.setView([mapCenter.lat, mapCenter.lng], mapCenter.zoom);
        return;
      }
      if (pins.length === 1) {
        map.setView([pins[0]!.lat, pins[0]!.lng], 16);
        return;
      }
      const bounds = latLngBounds(pins.map((pin) => [pin.lat, pin.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
    };

    fitToPins();
    const timer = window.setTimeout(fitToPins, 150);
    return () => window.clearTimeout(timer);
  }, [pins, map]);

  return null;
}

function PinsBoundsHandler({ pins }: { pins: MapPinType[] }) {
  const map = useMap();

  useEffect(() => {
    const fitToPins = () => {
      map.invalidateSize();

      if (pins.length === 0) {
        map.setView([mapCenter.lat, mapCenter.lng], mapCenter.zoom);
        return;
      }
      if (pins.length === 1) {
        map.setView([pins[0]!.lat, pins[0]!.lng], 16);
        return;
      }
      const bounds = latLngBounds(pins.map((pin) => [pin.lat, pin.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
    };

    fitToPins();
    const timer = window.setTimeout(fitToPins, 150);
    return () => window.clearTimeout(timer);
  }, [pins, map]);

  return null;
}

const pickerIcon = divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;background:#16a34a;border:3px solid white;border-radius:9999px;box-shadow:0 4px 12px rgba(22,163,74,0.45);transform:translate(-50%,-100%);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const invalidate = () => map.invalidateSize();
    invalidate();
    const t1 = window.setTimeout(invalidate, 100);
    const t2 = window.setTimeout(invalidate, 350);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [map]);

  return null;
}

function MapController({
  selectedPin,
  selectedLayerPin,
  flyToCenter,
  flyToUser,
  userLocation,
  focusPoint,
}: {
  selectedPin: MapPinType | null;
  selectedLayerPin?: LayerMapPin | null;
  flyToCenter: number;
  flyToUser: number;
  userLocation: GeoPoint | null;
  focusPoint?: GeoPoint | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedLayerPin) {
      map.flyTo([selectedLayerPin.lat, selectedLayerPin.lng], 16, { duration: 0.7 });
    } else if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 16, { duration: 0.7 });
    }
  }, [selectedPin, selectedLayerPin, map]);

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
  pins?: MapPinType[];
  layerPins?: LayerMapPin[];
  selectedPin?: MapPinType | null;
  selectedLayerPin?: LayerMapPin | null;
  onSelectPin?: (pin: MapPinType) => void;
  onSelectLayerPin?: (pin: LayerMapPin) => void;
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
  pins = [],
  layerPins,
  selectedPin = null,
  selectedLayerPin = null,
  onSelectPin,
  onSelectLayerPin,
  flyToCenter = 0,
  flyToUser = 0,
  userLocation = null,
  pickerMode = false,
  pickerValue = null,
  onPickerChange,
  className = 'h-full w-full rounded-[1.75rem] z-0',
  zoom = mapCenter.zoom,
}: LeafletMapProps) {
  const useLayerMode = layerPins != null;
  const center: LatLngExpression = [mapCenter.lat, mapCenter.lng];

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

      <MapResizeHandler />

      {!pickerMode && useLayerMode && <LayerPinsBoundsHandler pins={layerPins!} />}
      {!pickerMode && !useLayerMode && <PinsBoundsHandler pins={pins} />}

      <MapController
        selectedPin={selectedPin}
        selectedLayerPin={selectedLayerPin}
        flyToCenter={flyToCenter}
        flyToUser={flyToUser}
        userLocation={userLocation}
        focusPoint={pickerMode ? pickerValue : null}
      />

      {pickerMode && <PickerClickHandler />}

      {userLocation && !pickerMode && (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={10}
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

      {!pickerMode && useLayerMode &&
        layerPins!.map((pin) => {
          const isSelected = selectedLayerPin?.id === pin.id;

          return (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createLayerIcon(pin.color, isSelected)}
              eventHandlers={{
                click: () => onSelectLayerPin?.(pin),
              }}
            >
              <Popup className="boksusjed-popup">
                <div className="min-w-[160px]">
                  {pin.subtitle && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {pin.subtitle}
                    </p>
                  )}
                  <p className="mt-1 font-display font-semibold text-ink">{pin.title}</p>
                  <p className="mt-1 text-xs font-medium text-accent">
                    {formatDistance(pin.distanceMeters)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}

      {!pickerMode && !useLayerMode &&
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {style.label}
                  </p>
                  <p className="mt-1 font-display font-semibold text-ink">{pin.title}</p>
                  <p className="mt-1 text-xs font-medium text-accent">
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

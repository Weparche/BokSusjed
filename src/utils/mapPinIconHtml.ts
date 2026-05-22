import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { MapPinColor, PostType } from '../types/boksusjed';
import { POST_TYPE_STYLES } from './postHelpers';
import { PIN_COLORS } from './mapPinColors';

const MAP_PIN_SIZE = 34;
const MAP_PIN_SIZE_SELECTED = 40;

export const LAYER_PIN_COLORS: Record<MapPinColor, { bg: string; border: string }> = {
  green: { bg: '#ecfdf5', border: '#059669' },
  blue: { bg: '#f0f9ff', border: '#0284c7' },
  orange: { bg: '#fff7ed', border: '#ea580c' },
  red: { bg: '#fef2f2', border: '#dc2626' },
  purple: { bg: '#f5f3ff', border: '#7c3aed' },
};

export function createLayerPinDivIcon(color: MapPinColor, selected: boolean) {
  const colors = LAYER_PIN_COLORS[color];
  const size = selected ? MAP_PIN_SIZE_SELECTED : MAP_PIN_SIZE;
  const dot = Math.round(size * 0.35);

  return {
    size,
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${colors.bg};
        border:2.5px solid ${selected ? '#16a34a' : colors.border};
        border-radius:9999px;
        box-shadow:0 4px 14px rgba(15,23,42,${selected ? '0.22' : '0.14'});
        display:flex;align-items:center;justify-content:center;
        transform:translate(-50%,-100%);
        ${selected ? 'scale:1.08;' : ''}
      ">
        <div style="width:${dot}px;height:${dot}px;background:${colors.border};border-radius:9999px;"></div>
      </div>
    `,
    iconSize: [size, size] as [number, number],
    iconAnchor: [size / 2, size] as [number, number],
    popupAnchor: [0, -size] as [number, number],
  };
}

export function createMapPinDivIcon(type: PostType, selected: boolean) {
  const colors = PIN_COLORS[type];
  const style = POST_TYPE_STYLES[type];
  const size = selected ? MAP_PIN_SIZE_SELECTED : MAP_PIN_SIZE;
  const iconSize = Math.round(size * 0.47);

  const iconHtml = renderToStaticMarkup(
    createElement(style.icon, {
      size: iconSize,
      strokeWidth: 2.5,
      color: colors.border,
      absoluteStrokeWidth: true,
    }),
  );

  return {
    size,
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${colors.bg};
        border:2.5px solid ${selected ? '#16a34a' : colors.border};
        border-radius:10px;
        box-shadow:0 4px 14px rgba(15,23,42,${selected ? '0.22' : '0.14'});
        display:flex;align-items:center;justify-content:center;
        transform:translate(-50%,-100%);
        ${selected ? 'scale:1.08;' : ''}
      ">
        ${iconHtml}
      </div>
    `,
    iconSize: [size, size] as [number, number],
    iconAnchor: [size / 2, size] as [number, number],
    popupAnchor: [0, -size] as [number, number],
  };
}

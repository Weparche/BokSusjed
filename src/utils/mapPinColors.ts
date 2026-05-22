import type { PostType } from '../types/boksusjed';

export const PIN_COLORS: Record<PostType, { bg: string; border: string }> = {
  announcement: { bg: '#f0f9ff', border: '#0ea5e9' },
  recommendation: { bg: '#fffbeb', border: '#d97706' },
  help_needed: { bg: '#ecfdf5', border: '#059669' },
  help_offered: { bg: '#f0fdfa', border: '#0d9488' },
  giveaway: { bg: '#f5f3ff', border: '#7c3aed' },
  sale: { bg: '#fff7ed', border: '#ea580c' },
  safety: { bg: '#fff1f2', border: '#e11d48' },
  lost_found: { bg: '#fffbeb', border: '#b45309' },
  event: { bg: '#eef2ff', border: '#4f46e5' },
};

"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = {
  name: string;
  value: string;
  textColor: string;
};

export type Theme = {
  colors: {
    primary: ThemeColor;
    background: string;
    text: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  spacing: 'compact' | 'comfortable' | 'spacious';
};

const defaultTheme: Theme = {
  colors: {
    primary: {
      name: 'Blue',
      value: '#2563eb',
      textColor: '#ffffff'
    },
    background: '#ffffff',
    text: '#0f172a',
    border: '#e2e8f0'
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  borderRadius: 'md',
  spacing: 'comfortable'
};

interface ThemeState {
  theme: Theme;
  updateTheme: (theme: Partial<Theme>) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      updateTheme: (updates) => 
        set((state) => ({
          theme: { ...state.theme, ...updates }
        })),
      resetTheme: () => set({ theme: defaultTheme })
    }),
    {
      name: 'theme-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            theme: defaultTheme
          };
        }
        return persistedState;
      }
    }
  )
);
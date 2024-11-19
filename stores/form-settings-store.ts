"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormField } from '@/types/form';

interface FormSettingsState {
  isOpen: boolean;
  selectedField: FormField | null;
  openSettings: (field: FormField) => void;
  closeSettings: () => void;
}

export const useFormSettingsStore = create<FormSettingsState>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedField: null,
      openSettings: (field) => set({ isOpen: true, selectedField: field }),
      closeSettings: () => set({ isOpen: false, selectedField: null }),
    }),
    {
      name: 'form-settings-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            isOpen: false,
            selectedField: null
          };
        }
        return persistedState;
      }
    }
  )
);
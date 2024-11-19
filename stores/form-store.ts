"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormField } from "@/types/form";
import { compressImage } from "@/lib/image-utils";

interface Form {
  id: string;
  name: string;
  title: string;
  description: string;
  responses: number;
  lastUpdated: string;
  fields: FormField[];
  themeSettings: {
    coverType: 'none' | 'color' | 'image';
    showLogo: boolean;
    coverImage?: string;
    coverColor?: string;
    logo?: string;
  };
  deletedAt?: string;
}

interface FormState {
  forms: Form[];
  addForm: (form: Form) => void;
  updateForm: (id: string, form: Partial<Form>) => Promise<void>;
  deleteForm: (id: string) => void;
  restoreForm: (id: string) => void;
  permanentlyDeleteForm: (id: string) => void;
  getForm: (id: string) => Form | undefined;
  getDeletedForms: () => Form[];
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      forms: [],
      addForm: (form) => set((state) => ({ 
        forms: [...state.forms, {
          ...form,
          lastUpdated: new Date().toISOString()
        }]
      })),
      updateForm: async (id, updates) => {
        let processedUpdates = { 
          ...updates,
          lastUpdated: new Date().toISOString()
        };

        if (updates.themeSettings?.coverImage) {
          try {
            const compressed = await compressImage(
              updates.themeSettings.coverImage,
              800,
              600,
              0.7
            );
            processedUpdates = {
              ...processedUpdates,
              themeSettings: {
                ...processedUpdates.themeSettings,
                coverImage: compressed
              }
            };
          } catch (error) {
            console.error('Failed to compress cover image:', error);
          }
        }

        if (updates.themeSettings?.logo) {
          try {
            const compressed = await compressImage(
              updates.themeSettings.logo,
              200,
              200,
              0.7
            );
            processedUpdates = {
              ...processedUpdates,
              themeSettings: {
                ...processedUpdates.themeSettings,
                logo: compressed
              }
            };
          } catch (error) {
            console.error('Failed to compress logo:', error);
          }
        }

        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === id ? { ...form, ...processedUpdates } : form
          ),
        }));
      },
      deleteForm: (id) => set((state) => ({
        forms: state.forms.map((form) =>
          form.id === id ? { 
            ...form, 
            deletedAt: new Date().toISOString()
          } : form
        ),
      })),
      restoreForm: (id) => set((state) => ({
        forms: state.forms.map((form) =>
          form.id === id ? { 
            ...form, 
            deletedAt: undefined,
            lastUpdated: new Date().toISOString()
          } : form
        ),
      })),
      permanentlyDeleteForm: (id) => set((state) => ({
        forms: state.forms.filter((form) => form.id !== id),
      })),
      getForm: (id) => get().forms.find((form) => form.id === id && !form.deletedAt),
      getDeletedForms: () => get().forms.filter((form) => form.deletedAt),
    }),
    {
      name: 'form-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            forms: persistedState.forms.map((form: Form) => ({
              ...form,
              themeSettings: form.themeSettings || {
                coverType: 'none',
                showLogo: true
              },
              lastUpdated: form.lastUpdated || new Date().toISOString()
            }))
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        ...state,
        forms: state.forms.map(form => ({
          ...form,
          themeSettings: {
            ...form.themeSettings,
            coverImage: form.themeSettings.coverImage?.length > 1000000 ? undefined : form.themeSettings.coverImage,
            logo: form.themeSettings.logo?.length > 500000 ? undefined : form.themeSettings.logo
          }
        }))
      })
    }
  )
);
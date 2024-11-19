"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
}

interface ResponseState {
  responses: FormResponse[];
  addResponse: (response: FormResponse) => void;
  getFormResponses: (formId: string) => FormResponse[];
  deleteResponse: (id: string) => void;
  clearResponses: () => void;
}

export const useResponseStore = create<ResponseState>()(
  persist(
    (set, get) => ({
      responses: [],
      addResponse: (response) => {
        set((state) => ({
          responses: [...state.responses, response]
        }));
      },
      getFormResponses: (formId) => {
        return get().responses.filter(r => r.formId === formId);
      },
      deleteResponse: (id) =>
        set((state) => ({
          responses: state.responses.filter((response) => response.id !== id)
        })),
      clearResponses: () => set({ responses: [] })
    }),
    {
      name: 'form-responses-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            responses: []
          };
        }
        return persistedState;
      }
    }
  )
);
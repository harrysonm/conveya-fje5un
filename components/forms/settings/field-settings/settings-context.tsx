"use client";

import { createContext, useContext, useCallback, useState } from 'react';

interface SettingsContextType {
  isOpen: boolean;
  closePanel: () => void;
  preventClose: () => void;
  isSelectOpen: boolean;
  setIsSelectOpen: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}

interface SettingsProviderProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsProvider({ children, isOpen, onClose }: SettingsProviderProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const closePanel = useCallback(() => {
    if (!isSelectOpen) {
      onClose();
    }
  }, [onClose, isSelectOpen]);

  const preventClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <SettingsContext.Provider 
      value={{ 
        isOpen, 
        closePanel, 
        preventClose,
        isSelectOpen,
        setIsSelectOpen
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
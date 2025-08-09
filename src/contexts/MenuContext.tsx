"use client";

import { createContext, useContext } from 'react';
import { MenuItem, MenuConfig } from '@/types/menu';

interface MenuContextType {
  menuConfigs: MenuConfig[];
  activeMenuItems: MenuItem[];
  updateMenuConfig: (updatedConfig: MenuConfig) => void;
  removeMenuConfig: (configId: string) => void;
  addMenuConfig: (newConfig: MenuConfig) => void;
  addMenuItem: (configId: string, newItem: MenuItem) => void;
  updateMenuItem: (configId: string, updatedItem: MenuItem) => void;
  removeMenuItem: (configId: string, itemId: string) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

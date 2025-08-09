
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, MenuConfig } from '@/types/menu';

interface MenuContextType {
  menuConfigs: MenuConfig[];
  activeMenuItems: MenuItem[];
  updateMenuConfig: (config: MenuConfig) => void;
  addMenuConfig: (config: MenuConfig) => void;
  removeMenuConfig: (id: string) => void;
  getMenuItemByIcon: (iconName: string) => any;
  addMenuItem: (configId: string, item: MenuItem) => void;
  updateMenuItem: (configId: string, item: MenuItem) => void;
  removeMenuItem: (configId: string, itemId: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Default menu configuration
const defaultMenuConfigs: MenuConfig[] = [
  {
    id: 'main',
    name: 'Main Navigation',
    isActive: true,
    order: 1,
    items: [
      { id: 'dashboard', title: 'Dashboard', url: '/', icon: 'LayoutDashboard', requiredRole: null },
      { id: 'users', title: 'Users', url: '/users', icon: 'Users', requiredRole: 'moderator' },
      { id: 'analytics', title: 'Analytics', url: '/analytics', icon: 'BarChart3', requiredRole: null },
      { id: 'reports', title: 'Reports', url: '/reports', icon: 'FileText', requiredRole: 'moderator' },
      { id: 'security', title: 'Security', url: '/security', icon: 'Shield', requiredRole: 'admin' },
      { id: 'settings', title: 'Settings', url: '/settings', icon: 'Settings', requiredRole: null },
    ]
  },
  {
    id: 'management',
    name: 'Management Modules',
    isActive: true,
    order: 2,
    items: [
      { 
        id: 'visa', 
        title: 'Visa Management', 
        url: '/visa', 
        icon: 'CreditCard', 
        requiredRole: 'moderator',
        children: [
          { id: 'visa-list', title: 'Visa Applications', url: '/visa', icon: 'List', requiredRole: 'moderator' },
          { id: 'visa-add', title: 'New Application', url: '/visa/add', icon: 'Plus', requiredRole: 'moderator' },
        ]
      },
      { 
        id: 'transport', 
        title: 'Transport', 
        url: '/transport', 
        icon: 'Car', 
        requiredRole: 'moderator',
        children: [
          { id: 'transport-bookings', title: 'Customer Bookings', url: '/transport', icon: 'List', requiredRole: 'moderator' },
          { id: 'transport-vehicles', title: 'Vehicle Management', url: '/transport/vehicles', icon: 'Car', requiredRole: 'moderator' },
          { id: 'transport-add', title: 'New Booking', url: '/transport/add', icon: 'Plus', requiredRole: 'moderator' },
        ]
      },
      { 
        id: 'hotel', 
        title: 'Hotel Management', 
        url: '/hotels', 
        icon: 'Building', 
        requiredRole: 'moderator',
        children: [
          { id: 'hotel-bookings', title: 'Hotel Bookings', url: '/hotels', icon: 'List', requiredRole: 'moderator' },
          { id: 'hotel-inventory', title: 'Hotel Inventory', url: '/hotels/inventory', icon: 'Building', requiredRole: 'moderator' },
          { id: 'hotel-add', title: 'New Booking', url: '/hotels/add', icon: 'Plus', requiredRole: 'moderator' },
        ]
      },
    ]
  },
  {
    id: 'developer',
    name: 'Developer Options',
    isActive: true,
    order: 3,
    items: [
      { id: 'menu-manager', title: 'Menu Manager', url: '/developer/menu-manager', icon: 'Menu', requiredRole: 'admin' },
    ]
  }
];

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuConfigs, setMenuConfigs] = useState<MenuConfig[]>(() => {
    const saved = localStorage.getItem('menu_configs');
    return saved ? JSON.parse(saved) : defaultMenuConfigs;
  });

  useEffect(() => {
    localStorage.setItem('menu_configs', JSON.stringify(menuConfigs));
  }, [menuConfigs]);

  const activeMenuItems = menuConfigs
    .filter(config => config.isActive)
    .sort((a, b) => a.order - b.order)
    .flatMap(config => config.items);

  const updateMenuConfig = (config: MenuConfig) => {
    setMenuConfigs(prev => prev.map(c => c.id === config.id ? config : c));
  };

  const addMenuConfig = (config: MenuConfig) => {
    setMenuConfigs(prev => [...prev, config]);
  };

  const removeMenuConfig = (id: string) => {
    setMenuConfigs(prev => prev.filter(c => c.id !== id));
  };

  const addMenuItem = (configId: string, item: MenuItem) => {
    setMenuConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, items: [...config.items, item] }
        : config
    ));
  };

  const updateMenuItem = (configId: string, item: MenuItem) => {
    setMenuConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, items: config.items.map(i => i.id === item.id ? item : i) }
        : config
    ));
  };

  const removeMenuItem = (configId: string, itemId: string) => {
    setMenuConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, items: config.items.filter(i => i.id !== itemId) }
        : config
    ));
  };

  const getMenuItemByIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'LayoutDashboard': 'LayoutDashboard',
      'Users': 'Users',
      'BarChart3': 'BarChart3',
      'FileText': 'FileText',
      'Shield': 'Shield',
      'Settings': 'Settings',
      'CreditCard': 'CreditCard',
      'Car': 'Car',
      'Building': 'Building',
      'Menu': 'Menu',
      'List': 'List',
      'Plus': 'Plus',
    };
    return iconMap[iconName] || 'Circle';
  };

  return (
    <MenuContext.Provider value={{
      menuConfigs,
      activeMenuItems,
      updateMenuConfig,
      addMenuConfig,
      removeMenuConfig,
      getMenuItemByIcon,
      addMenuItem,
      updateMenuItem,
      removeMenuItem
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

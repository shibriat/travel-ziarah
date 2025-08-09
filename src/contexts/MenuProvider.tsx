"use client";

import React, { useState, useEffect } from 'react';
import { MenuContext } from './MenuContext';
import { MenuItem, MenuConfig } from '@/types/menu';

const initialMenuConfigs: MenuConfig[] = [
    {
      id: 'main-nav',
      name: 'Main Navigation',
      items: [
        { id: 'dashboard', title: 'Dashboard', url: '/dashboard', icon: 'LayoutDashboard' },
        { id: 'users', title: 'Users', url: '/users', icon: 'Users', requiredRole: 'moderator' },
        { id: 'settings', title: 'Settings', url: '/settings', icon: 'Settings' },
        {
          id: 'visa',
          title: 'Visa',
          url: '#',
          icon: 'CreditCard',
          requiredRole: 'moderator',
          children: [
            { id: 'visa-management', title: 'Visa Management', url: '/visa', icon: 'List' },
            { id: 'add-visa', title: 'Add Visa', url: '/visa/add', icon: 'Plus' }
          ]
        },
        {
          id: 'transport',
          title: 'Transport',
          url: '#',
          icon: 'Car',
          requiredRole: 'moderator',
          children: [
            { id: 'transport-management', title: 'Transport Management', url: '/transport', icon: 'List' },
            { id: 'vehicle-management', title: 'Vehicle Management', url: '/transport/vehicles', icon: 'Car' },
            { id: 'add-transport', title: 'Add Transport', url: '/transport/add', icon: 'Plus' }
          ]
        },
        {
          id: 'hotels',
          title: 'Hotels',
          url: '#',
          icon: 'Building',
          requiredRole: 'moderator',
          children: [
            { id: 'hotel-management', title: 'Hotel Management', url: '/hotels', icon: 'List' },
            { id: 'hotel-inventory', title: 'Hotel Inventory', url: '/hotels/inventory', icon: 'Building' },
            { id: 'add-hotel', title: 'Add Hotel', url: '/hotels/add', icon: 'Plus' }
          ]
        },
        {
          id: 'developer',
          title: 'Developer',
          url: '/developer',
          icon: 'Shield',
          requiredRole: 'admin',
          children: [
            { id: 'menu-manager', title: 'Menu Manager', url: '/developer/menu-manager', icon: 'Menu' }
          ]
        }
      ],
      isActive: true,
      order: 1
    }
  ];

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [menuConfigs, setMenuConfigs] = useState<MenuConfig[]>([]);
    const [activeMenuItems, setActiveMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
      const savedConfigs = localStorage.getItem('menu_configs');
      if (savedConfigs) {
        setMenuConfigs(JSON.parse(savedConfigs));
      } else {
        setMenuConfigs(initialMenuConfigs);
      }
    }, []);

    useEffect(() => {
      const activeConfig = menuConfigs.find(c => c.isActive);
      if (activeConfig) {
        setActiveMenuItems(activeConfig.items);
      } else {
        setActiveMenuItems([]);
      }
      if (menuConfigs.length > 0) {
        localStorage.setItem('menu_configs', JSON.stringify(menuConfigs));
      }
    }, [menuConfigs]);

    const updateMenuConfig = (updatedConfig: MenuConfig) => {
      setMenuConfigs(prev => prev.map(c => c.id === updatedConfig.id ? updatedConfig : c));
    };

    const removeMenuConfig = (configId: string) => {
      setMenuConfigs(prev => prev.filter(c => c.id !== configId));
    };

    const addMenuConfig = (newConfig: MenuConfig) => {
      setMenuConfigs(prev => [...prev, newConfig]);
    };

    const addMenuItem = (configId: string, newItem: MenuItem) => {
      setMenuConfigs(prev => prev.map(c => {
        if (c.id === configId) {
          return { ...c, items: [...c.items, newItem] };
        }
        return c;
      }));
    };

    const updateMenuItem = (configId: string, updatedItem: MenuItem) => {
      setMenuConfigs(prev => prev.map(c => {
        if (c.id === configId) {
          return { ...c, items: c.items.map(i => i.id === updatedItem.id ? updatedItem : i) };
        }
        return c;
      }));
    };

    const removeMenuItem = (configId: string, itemId: string) => {
      setMenuConfigs(prev => prev.map(c => {
        if (c.id === configId) {
          return { ...c, items: c.items.filter(i => i.id !== itemId) };
        }
        return c;
      }));
    };

    return (
      <MenuContext.Provider value={{
        menuConfigs,
        activeMenuItems,
        updateMenuConfig,
        removeMenuConfig,
        addMenuConfig,
        addMenuItem,
        updateMenuItem,
        removeMenuItem
      }}>
        {children}
      </MenuContext.Provider>
    );
  }

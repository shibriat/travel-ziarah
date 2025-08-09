
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  requiredRole?: 'admin' | 'moderator' | 'user' | null;
  children?: MenuItem[];
  isActive?: boolean;
}

export interface MenuConfig {
  id: string;
  name: string;
  items: MenuItem[];
  isActive: boolean;
  order: number;
}

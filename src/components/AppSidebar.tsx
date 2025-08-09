
"use client";

import { LayoutDashboard, Users, Settings, BarChart3, FileText, Shield, LogOut, CreditCard, Car, Building, Menu, List, Plus, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useMenu } from "@/contexts/MenuContext"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

const iconMap = {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
  CreditCard,
  Car,
  Building,
  Menu,
  List,
  Plus,
};

export function AppSidebar() {
  const { state } = useSidebar()
  const currentPath = usePathname()
  const { user, logout, hasPermission } = useAuth()
  const { activeMenuItems } = useMenu()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const isCollapsed = state === "collapsed"
  
  const isActive = (path: string) => currentPath === path
  const getNavClasses = (path: string) =>
    isActive(path)
      ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
      : "hover:bg-white/10 text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-200"

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const filteredItems = activeMenuItems.filter(item => 
    !item.requiredRole || hasPermission(item.requiredRole)
  )

  const groupedItems = filteredItems.reduce((groups, item) => {
    const key = item.children ? 'withChildren' : 'standalone'
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
    return groups
  }, {} as Record<string, typeof filteredItems>)

  return (
    <Sidebar 
      className="backdrop-blur-xl bg-mint/90 border-r border-white/20 shadow-lg transition-all duration-300" 
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-white/10 bg-mint/50 p-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}>
            <LayoutDashboard className={`text-primary transition-all duration-200 ${isCollapsed ? 'w-4 h-4' : 'w-6 h-6'}`} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sidebar-foreground">Admin Panel</span>
              <span className="text-xs text-sidebar-foreground/60">Management System</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-mint/50 p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.standalone?.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={getNavClasses(item.url)}
                      >
                        <IconComponent className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
              
              {groupedItems.withChildren?.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard
                const isExpanded = expandedItems.has(item.id)
                const hasActiveChild = item.children?.some(child => isActive(child.url))
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <Collapsible open={isExpanded || hasActiveChild} onOpenChange={() => toggleExpanded(item.id)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className={`w-full justify-between transition-all duration-200 ${hasActiveChild ? 'bg-primary/10 text-primary' : 'hover:bg-white/10'}`}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 shrink-0" />
                            {!isCollapsed && <span className="truncate">{item.title}</span>}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded || hasActiveChild ? 'rotate-180' : ''}`} />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent>
                          <div className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-3">
                            {item.children?.map((child) => {
                              const ChildIconComponent = iconMap[child.icon as keyof typeof iconMap] || LayoutDashboard
                              return (
                                <SidebarMenuButton key={child.id} asChild className="py-1 h-8">
                                  <Link
                                    href={child.url}
                                    className={getNavClasses(child.url)}
                                  >
                                    <ChildIconComponent className="w-3 h-3 shrink-0" />
                                    <span className="text-sm truncate">{child.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              )
                            })}
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup className="mt-auto">
            {!isCollapsed && (
              <>
                <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold">User</SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sidebar-foreground text-sm truncate">{user.name}</p>
                        <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </>
            )}
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 bg-mint/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="text-destructive hover:bg-destructive/10 transition-colors duration-200">
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

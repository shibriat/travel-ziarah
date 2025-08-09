
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-mint/20 via-background to-primary/5">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="h-14 md:h-16 backdrop-blur-xl bg-primary/90 border-b border-white/20 flex items-center justify-between px-4 md:px-6 shadow-lg relative w-full z-10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 -z-10"></div>
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <SidebarTrigger className="text-white hover:bg-white/20 transition-colors duration-200 shrink-0" />
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs md:text-sm">A</span>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm md:text-lg font-semibold text-white truncate">Admin Dashboard</h2>
                <p className="text-xs text-white/80 truncate hidden sm:block">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-3 shrink-0">
              <button className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm border border-white/20">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <button className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm border border-white/20">
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <button className="flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm border border-white/20">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <span className="text-white text-xs md:text-sm hidden lg:inline">Profile</span>
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

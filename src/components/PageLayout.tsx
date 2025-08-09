
import { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="p-6 space-y-6 animate-fade-in relative">
      {/* Floating glass orbs for background effect */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-full glass-effect animate-float opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full glass-effect animate-float opacity-20" style={{animationDelay: '2s'}}></div>
      
      <div className="page-header relative z-10">
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

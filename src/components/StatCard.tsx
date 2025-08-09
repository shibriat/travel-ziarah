
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
            {trend.positive ? '+' : ''}{trend.value}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  )
}

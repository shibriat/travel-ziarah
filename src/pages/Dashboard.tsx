
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,345",
      description: "Active users this month",
      icon: Users,
      trend: { value: "12%", positive: true }
    },
    {
      title: "Revenue",
      value: "$45,231",
      description: "Total revenue this quarter",
      icon: DollarSign,
      trend: { value: "8%", positive: true }
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      description: "Month over month growth",
      icon: TrendingUp,
      trend: { value: "4%", positive: true }
    },
    {
      title: "Active Sessions",
      value: "1,234",
      description: "Current active sessions",
      icon: Activity,
      trend: { value: "2%", positive: false }
    }
  ]

  return (
    <PageLayout 
      title="Dashboard" 
      description="Welcome back! Here's what's happening with your application."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user interactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "John Doe", action: "Created new account", time: "2 minutes ago" },
                { user: "Jane Smith", action: "Updated profile", time: "5 minutes ago" },
                { user: "Admin", action: "System backup completed", time: "10 minutes ago" },
                { user: "Mike Johnson", action: "Password reset", time: "15 minutes ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors text-left">
                <Users className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium">Add User</p>
                <p className="text-sm text-muted-foreground">Create new account</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors text-left">
                <TrendingUp className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium">View Reports</p>
                <p className="text-sm text-muted-foreground">Generate analytics</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors text-left">
                <DollarSign className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium">Billing</p>
                <p className="text-sm text-muted-foreground">Manage subscriptions</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors text-left">
                <Activity className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium">System Status</p>
                <p className="text-sm text-muted-foreground">Check health</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

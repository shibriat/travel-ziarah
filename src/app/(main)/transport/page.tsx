
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Plus, Search, Car, MapPin } from 'lucide-react'

interface CustomerTransport {
  id: string
  customerName: string
  customerPhone: string
  route: string
  vehicle: string
  date: string
  time: string
  passengers: number
  charge: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const mockCustomerTransports: CustomerTransport[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerPhone: '+1234567890',
    route: 'Airport to Hotel Downtown',
    vehicle: 'Toyota Camry - ABC123',
    date: '2024-01-15',
    time: '14:30',
    passengers: 2,
    charge: 45,
    status: 'confirmed'
  },
  {
    id: '2',
    customerName: 'Sarah Wilson',
    customerPhone: '+1234567891',
    route: 'City Center to Airport',
    vehicle: 'Mercedes Sprinter - XYZ789',
    date: '2024-01-16',
    time: '08:00',
    passengers: 8,
    charge: 120,
    status: 'pending'
  }
]

export default function TransportManagement() {
  const [transports, setTransports] = useState<CustomerTransport[]>(mockCustomerTransports)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransports = transports.filter(transport =>
    transport.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-700 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const deleteTransport = (id: string) => {
    setTransports(transports.filter(transport => transport.id !== id))
  }

  return (
    <PageLayout title="Customer Transport Management" description="Manage customer transport bookings and assignments">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              <CardTitle>Customer Transport Bookings</CardTitle>
            </div>
            <Button className="glass-button">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, route, or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-input"
                />
              </div>
            </div>

            <div className="rounded-lg border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Passengers</TableHead>
                      <TableHead>Charge</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransports.map((transport) => (
                      <TableRow key={transport.id} className="border-white/20 hover:bg-white/5">
                        <TableCell>
                          <div>
                            <div className="font-medium">{transport.customerName}</div>
                            <div className="text-sm text-muted-foreground">{transport.customerPhone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{transport.route}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{transport.vehicle}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{transport.date}</div>
                            <div className="text-muted-foreground">{transport.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{transport.passengers}</TableCell>
                        <TableCell className="font-medium">${transport.charge}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transport.status)}>
                            {transport.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="glass-button">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteTransport(transport.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

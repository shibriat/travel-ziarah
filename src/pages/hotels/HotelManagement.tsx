
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Plus, Search, Building, User, Calendar, Star } from 'lucide-react'

interface HotelBooking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  hotelName: string
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  roomRate: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  bookingDate: string
  specialRequests?: string
}

const mockBookings: HotelBooking[] = [
  {
    id: '1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice.johnson@email.com',
    customerPhone: '+1234567890',
    hotelName: 'Grand Plaza Hotel',
    roomType: 'Deluxe Suite',
    checkIn: '2024-02-15',
    checkOut: '2024-02-18',
    nights: 3,
    guests: 2,
    roomRate: 250,
    totalAmount: 750,
    status: 'confirmed',
    bookingDate: '2024-01-20',
    specialRequests: 'High floor, city view'
  },
  {
    id: '2',
    customerName: 'Bob Wilson',
    customerEmail: 'bob.wilson@email.com',
    customerPhone: '+1234567891',
    hotelName: 'Business Center Inn',
    roomType: 'Standard Room',
    checkIn: '2024-02-10',
    checkOut: '2024-02-12',
    nights: 2,
    guests: 1,
    roomRate: 150,
    totalAmount: 300,
    status: 'checked-out',
    bookingDate: '2024-01-15'
  }
]

export default function HotelManagement() {
  const [bookings, setBookings] = useState<HotelBooking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
      case 'confirmed': return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'checked-in': return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
      case 'checked-out': return 'bg-purple-500/20 text-purple-700 border-purple-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-700 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id))
  }

  return (
    <PageLayout title="Hotel Bookings" description="Manage customer hotel reservations and bookings">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              <CardTitle>Hotel Bookings</CardTitle>
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
                  placeholder="Search by customer, hotel, or room type..."
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
                      <TableHead>Hotel & Room</TableHead>
                      <TableHead>Check-in/out</TableHead>
                      <TableHead>Stay Details</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-white/20 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{booking.customerName}</div>
                              <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                              <div className="text-sm text-muted-foreground">{booking.customerPhone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{booking.hotelName}</div>
                              <div className="text-sm text-muted-foreground">{booking.roomType}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div className="text-sm">
                              <div>In: {booking.checkIn}</div>
                              <div>Out: {booking.checkOut}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.nights} nights</div>
                            <div>{booking.guests} guests</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${booking.roomRate}/night</TableCell>
                        <TableCell className="font-bold">${booking.totalAmount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
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
                              onClick={() => deleteBooking(booking.id)}
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

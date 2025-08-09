
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Plus, Search, Building, Star, MapPin, Wifi, Car, Utensils } from 'lucide-react'

interface Hotel {
  id: string
  name: string
  address: string
  city: string
  country: string
  rating: number
  roomTypes: RoomType[]
  amenities: string[]
  status: 'active' | 'inactive'
  contactEmail: string
  contactPhone: string
}

interface RoomType {
  id: string
  name: string
  capacity: number
  baseRate: number
  totalRooms: number
  availableRooms: number
  amenities: string[]
}

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    address: '123 Main Street',
    city: 'New York',
    country: 'USA',
    rating: 5,
    roomTypes: [
      {
        id: '1',
        name: 'Standard Room',
        capacity: 2,
        baseRate: 200,
        totalRooms: 50,
        availableRooms: 30,
        amenities: ['WiFi', 'TV', 'AC']
      },
      {
        id: '2',
        name: 'Deluxe Suite',
        capacity: 4,
        baseRate: 350,
        totalRooms: 20,
        availableRooms: 12,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'City View']
      }
    ],
    amenities: ['Pool', 'Gym', 'Restaurant', 'Spa', 'Parking'],
    status: 'active',
    contactEmail: 'reservations@grandplaza.com',
    contactPhone: '+1-555-0123'
  },
  {
    id: '2',
    name: 'Business Center Inn',
    address: '456 Business Ave',
    city: 'Chicago',
    country: 'USA',
    rating: 4,
    roomTypes: [
      {
        id: '3',
        name: 'Standard Room',
        capacity: 2,
        baseRate: 150,
        totalRooms: 80,
        availableRooms: 45,
        amenities: ['WiFi', 'TV', 'AC', 'Desk']
      }
    ],
    amenities: ['WiFi', 'Business Center', 'Meeting Rooms', 'Parking'],
    status: 'active',
    contactEmail: 'info@businessinn.com',
    contactPhone: '+1-555-0456'
  }
]

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Parking': Car,
  'Restaurant': Utensils,
  'Pool': Building,
  'Gym': Building,
  'Spa': Building,
  'Business Center': Building,
  'Meeting Rooms': Building
}

export default function HotelInventory() {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-700 border-green-500/30'
      : 'bg-red-500/20 text-red-700 border-red-500/30'
  }

  const deleteHotel = (id: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== id))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <PageLayout title="Hotel Inventory" description="Manage hotels, room types, and rates">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              <CardTitle>Hotel Inventory</CardTitle>
            </div>
            <Button className="glass-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Hotel
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-input"
                />
              </div>
            </div>

            <div className="grid gap-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="glass-effect border border-white/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-5 h-5 text-primary" />
                          <h3 className="font-bold text-lg">{hotel.name}</h3>
                          <div className="flex items-center gap-1">
                            {renderStars(hotel.rating)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{hotel.address}, {hotel.city}, {hotel.country}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <span>Email: {hotel.contactEmail}</span> | <span>Phone: {hotel.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge className={getStatusColor(hotel.status)}>
                            {hotel.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="glass-button">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteHotel(hotel.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <span className="text-sm font-medium mb-2 block">Hotel Amenities:</span>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity) => {
                          const IconComponent = amenityIcons[amenity] || Building
                          return (
                            <Badge key={amenity} variant="outline" className="glass-effect">
                              <IconComponent className="w-3 h-3 mr-1" />
                              {amenity}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    {/* Room Types */}
                    <div>
                      <span className="text-sm font-medium mb-2 block">Room Types & Rates:</span>
                      <div className="rounded-lg border border-white/20 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/20">
                              <TableHead>Room Type</TableHead>
                              <TableHead>Capacity</TableHead>
                              <TableHead>Rate/Night</TableHead>
                              <TableHead>Availability</TableHead>
                              <TableHead>Room Amenities</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {hotel.roomTypes.map((roomType) => (
                              <TableRow key={roomType.id} className="border-white/20">
                                <TableCell className="font-medium">{roomType.name}</TableCell>
                                <TableCell>{roomType.capacity} guests</TableCell>
                                <TableCell className="font-bold">${roomType.baseRate}</TableCell>
                                <TableCell>
                                  <span className="text-sm">
                                    {roomType.availableRooms}/{roomType.totalRooms} available
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {roomType.amenities.map((amenity) => (
                                      <Badge key={amenity} variant="secondary" className="text-xs">
                                        {amenity}
                                      </Badge>
                                    ))}
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

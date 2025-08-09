"use client";

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Plus, Search, Car, User } from 'lucide-react'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  capacity: number
  driver: string
  driverPhone: string
  status: 'available' | 'in-use' | 'maintenance'
  ratePerKm: number
  baseRate: number
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    licensePlate: 'ABC123',
    capacity: 4,
    driver: 'Mike Johnson',
    driverPhone: '+1234567890',
    status: 'available',
    ratePerKm: 2.5,
    baseRate: 25
  },
  {
    id: '2',
    make: 'Mercedes',
    model: 'Sprinter',
    year: 2023,
    licensePlate: 'XYZ789',
    capacity: 12,
    driver: 'David Brown',
    driverPhone: '+1234567891',
    status: 'in-use',
    ratePerKm: 3.5,
    baseRate: 45
  }
]

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'in-use': return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
      case 'maintenance': return 'bg-red-500/20 text-red-700 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const deleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id))
  }

  return (
    <PageLayout title="Vehicle Management" description="Manage vehicles, drivers, and rates">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              <CardTitle>Vehicle Fleet</CardTitle>
            </div>
            <Button className="glass-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
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
                      <TableHead>Vehicle</TableHead>
                      <TableHead>License Plate</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Rates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="border-white/20 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                              <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{vehicle.licensePlate}</TableCell>
                        <TableCell>{vehicle.capacity} persons</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{vehicle.driver}</div>
                              <div className="text-sm text-muted-foreground">{vehicle.driverPhone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Base: ${vehicle.baseRate}</div>
                            <div>Per km: ${vehicle.ratePerKm}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {vehicle.status}
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
                              onClick={() => deleteVehicle(vehicle.id)}
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


import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddTransport() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    driverName: '',
    route: '',
    capacity: '',
    status: 'active',
    lastService: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get existing transports
    const existingTransports = JSON.parse(localStorage.getItem('transports') || '[]')
    
    // Add new transport
    const newTransport = {
      ...formData,
      id: Date.now().toString(),
      capacity: parseInt(formData.capacity)
    }
    
    const updatedTransports = [...existingTransports, newTransport]
    localStorage.setItem('transports', JSON.stringify(updatedTransports))
    
    navigate('/transport')
  }

  return (
    <PageLayout title="Add Vehicle" description="Add a new vehicle to the transport fleet">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/transport')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Transport Management
        </Button>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input
                    id="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bus">Bus</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input
                    id="driverName"
                    value={formData.driverName}
                    onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="route">Route</Label>
                  <Input
                    id="route"
                    value={formData.route}
                    onChange={(e) => setFormData({...formData, route: e.target.value})}
                    placeholder="e.g., Airport - Downtown"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="lastService">Last Service Date</Label>
                  <Input
                    id="lastService"
                    type="date"
                    value={formData.lastService}
                    onChange={(e) => setFormData({...formData, lastService: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="glass-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Vehicle
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/transport')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

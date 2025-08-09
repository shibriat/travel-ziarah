
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddHotel() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: '',
    totalRooms: '',
    availableRooms: '',
    pricePerNight: '',
    status: 'active',
    amenities: [] as string[]
  })

  const amenitiesList = ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Beach Access', 'Parking', 'Room Service']

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] })
    } else {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get existing hotels
    const existingHotels = JSON.parse(localStorage.getItem('hotels') || '[]')
    
    // Add new hotel
    const newHotel = {
      ...formData,
      id: Date.now().toString(),
      rating: parseFloat(formData.rating),
      totalRooms: parseInt(formData.totalRooms),
      availableRooms: parseInt(formData.availableRooms),
      pricePerNight: parseFloat(formData.pricePerNight)
    }
    
    const updatedHotels = [...existingHotels, newHotel]
    localStorage.setItem('hotels', JSON.stringify(updatedHotels))
    
    navigate('/hotels')
  }

  return (
    <PageLayout title="Add Hotel" description="Add a new hotel to the system">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/hotels')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hotel Management
        </Button>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hotel Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="totalRooms">Total Rooms</Label>
                  <Input
                    id="totalRooms"
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({...formData, totalRooms: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="availableRooms">Available Rooms</Label>
                  <Input
                    id="availableRooms"
                    type="number"
                    value={formData.availableRooms}
                    onChange={(e) => setFormData({...formData, availableRooms: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="pricePerNight">Price per Night ($)</Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
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

                <div className="md:col-span-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="glass-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hotel
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/hotels')}>
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

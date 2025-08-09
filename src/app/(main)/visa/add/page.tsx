
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
"use client";

import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddVisa() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    applicantName: '',
    passportNumber: '',
    visaType: '',
    country: '',
    status: 'submitted',
    applicationDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get existing visas
    const existingVisas = JSON.parse(localStorage.getItem('visas') || '[]')
    
    // Add new visa
    const newVisa = {
      ...formData,
      id: Date.now().toString()
    }
    
    const updatedVisas = [...existingVisas, newVisa]
    localStorage.setItem('visas', JSON.stringify(updatedVisas))
    
    router.push('/visa')
  }

  return (
    <PageLayout title="Add Visa Application" description="Create a new visa application">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => router.push('/visa')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Visa Management
        </Button>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Visa Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="applicantName">Applicant Name</Label>
                  <Input
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="visaType">Visa Type</Label>
                  <Select value={formData.visaType} onValueChange={(value) => setFormData({...formData, visaType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourist">Tourist</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="transit">Transit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    type="date"
                    value={formData.applicationDate}
                    onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="glass-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Application
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push('/visa')}>
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

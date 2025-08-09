"use client";

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Plus, Search, CreditCard, User, FileText } from 'lucide-react'

interface VisaApplication {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  passportNumber: string
  nationality: string
  destinationCountry: string
  visaType: string
  travelDate: string
  purpose: string
  duration: number
  status: 'submitted' | 'processing' | 'approved' | 'rejected' | 'issued'
  applicationDate: string
  fee: number
  documents: string[]
}

const mockVisaApplications: VisaApplication[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    customerPhone: '+1234567890',
    passportNumber: 'A12345678',
    nationality: 'USA',
    destinationCountry: 'Germany',
    visaType: 'Tourist',
    travelDate: '2024-03-15',
    purpose: 'Tourism',
    duration: 14,
    status: 'processing',
    applicationDate: '2024-01-15',
    fee: 350,
    documents: ['Passport Copy', 'Photos', 'Travel Insurance', 'Bank Statement']
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    customerPhone: '+1234567891',
    passportNumber: 'B98765432',
    nationality: 'Canada',
    destinationCountry: 'Japan',
    visaType: 'Business',
    travelDate: '2024-02-20',
    purpose: 'Business Meeting',
    duration: 7,
    status: 'approved',
    applicationDate: '2024-01-10',
    fee: 450,
    documents: ['Passport Copy', 'Business Letter', 'Invitation Letter', 'Hotel Booking']
  }
]

export default function VisaManagement() {
  const [applications, setApplications] = useState<VisaApplication[]>(mockVisaApplications)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredApplications = applications.filter(app =>
    app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.destinationCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.visaType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
      case 'processing': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
      case 'approved': return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-700 border-red-500/30'
      case 'issued': return 'bg-purple-500/20 text-purple-700 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id))
  }

  return (
    <PageLayout title="Visa Applications" description="Manage customer visa applications and processing">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <CardTitle>Visa Applications</CardTitle>
            </div>
            <Button className="glass-button">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, country, passport..."
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
                      <TableHead>Passport</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Visa Type</TableHead>
                      <TableHead>Travel Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id} className="border-white/20 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{app.customerName}</div>
                              <div className="text-sm text-muted-foreground">{app.customerEmail}</div>
                              <div className="text-sm text-muted-foreground">{app.customerPhone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-mono text-sm">{app.passportNumber}</div>
                            <div className="text-sm text-muted-foreground">{app.nationality}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.destinationCountry}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.visaType}</div>
                            <div className="text-sm text-muted-foreground">{app.purpose}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.travelDate}</TableCell>
                        <TableCell>{app.duration} days</TableCell>
                        <TableCell className="font-medium">${app.fee}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="glass-button">
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="glass-button">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteApplication(app.id)}
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

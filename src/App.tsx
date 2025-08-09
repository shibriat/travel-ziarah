import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/components/AppLayout';
import TransportManagement from '@/pages/transport/TransportManagement';
import VehicleManagement from '@/pages/transport/VehicleManagement';
import AddTransport from '@/pages/transport/AddTransport';
import VisaManagement from '@/pages/visa/VisaManagement';
import AddVisa from '@/pages/visa/AddVisa';
import HotelManagement from '@/pages/hotels/HotelManagement';
import HotelInventory from '@/pages/hotels/HotelInventory';
import AddHotel from '@/pages/hotels/AddHotel';
import MenuManager from '@/pages/developer/MenuManager';

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route 
                        path="/users" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <Users />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/settings" element={<Settings />} />
                      
                      {/* Visa Management Routes */}
                      <Route 
                        path="/visa" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <VisaManagement />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/visa/add" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <AddVisa />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Transport Management Routes */}
                      <Route 
                        path="/transport" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <TransportManagement />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/transport/vehicles" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <VehicleManagement />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/transport/add" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <AddTransport />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Hotel Management Routes */}
                      <Route 
                        path="/hotels" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <HotelManagement />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/hotels/inventory" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <HotelInventory />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/hotels/add" 
                        element={
                          <ProtectedRoute requiredRole="moderator">
                            <AddHotel />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Developer Routes */}
                      <Route 
                        path="/developer/menu-manager" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <MenuManager />
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;

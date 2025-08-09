
import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useMenu } from '@/contexts/MenuContext'
import { MenuItem, MenuConfig } from '@/types/menu'
import { Edit, Trash2, Plus, Move, Menu as MenuIcon, Save } from 'lucide-react'

export default function MenuManager() {
  const { menuConfigs, updateMenuConfig, removeMenuConfig, addMenuConfig, addMenuItem, updateMenuItem, removeMenuItem } = useMenu()
  const [editingConfig, setEditingConfig] = useState<string | null>(null)
  const [showAddConfig, setShowAddConfig] = useState(false)
  const [showAddItem, setShowAddItem] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<{configId: string, item: MenuItem} | null>(null)
  
  // Form states
  const [configForm, setConfigForm] = useState({
    id: '',
    name: '',
    isActive: true,
    order: 1,
    items: [] as MenuItem[]
  })
  
  const [itemForm, setItemForm] = useState({
    id: '',
    title: '',
    url: '',
    icon: 'LayoutDashboard',
    requiredRole: null as 'admin' | 'moderator' | 'user' | null,
    children: [] as MenuItem[]
  })

  const icons = [
    'LayoutDashboard', 'Users', 'Settings', 'BarChart3', 'FileText', 
    'Shield', 'CreditCard', 'Car', 'Building', 'Menu', 'List', 'Plus'
  ]

  const roles = [
    { value: null, label: 'No role required' },
    { value: 'user', label: 'User' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'admin', label: 'Admin' }
  ]

  const toggleConfigStatus = (configId: string) => {
    const config = menuConfigs.find(c => c.id === configId)
    if (config) {
      updateMenuConfig({ ...config, isActive: !config.isActive })
    }
  }

  const updateConfigOrder = (configId: string, newOrder: number) => {
    const config = menuConfigs.find(c => c.id === configId)
    if (config) {
      updateMenuConfig({ ...config, order: newOrder })
    }
  }

  const handleSaveConfig = () => {
    if (configForm.id && configForm.name) {
      if (editingConfig) {
        updateMenuConfig(configForm as MenuConfig)
      } else {
        addMenuConfig({
          ...configForm,
          id: configForm.id || Date.now().toString(),
        } as MenuConfig)
      }
      setConfigForm({ id: '', name: '', isActive: true, order: 1, items: [] })
      setEditingConfig(null)
      setShowAddConfig(false)
    }
  }

  const handleSaveMenuItem = () => {
    if (itemForm.title && itemForm.url && showAddItem) {
      const newItem: MenuItem = {
        ...itemForm,
        id: itemForm.id || Date.now().toString(),
      }
      
      if (editingItem) {
        updateMenuItem(editingItem.configId, newItem)
        setEditingItem(null)
      } else {
        addMenuItem(showAddItem, newItem)
        setShowAddItem(null)
      }
      
      setItemForm({
        id: '',
        title: '',
        url: '',
        icon: 'LayoutDashboard',
        requiredRole: null,
        children: []
      })
    }
  }

  const startEditConfig = (config: MenuConfig) => {
    setConfigForm(config)
    setEditingConfig(config.id)
    setShowAddConfig(true)
  }

  const startEditItem = (configId: string, item: MenuItem) => {
    setItemForm(item)
    setEditingItem({configId, item})
    setShowAddItem(configId)
  }

  return (
    <PageLayout title="Menu Manager" description="Manage navigation menus, submenus, and user permissions">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <MenuIcon className="w-5 h-5 text-primary" />
              <CardTitle>Menu Configurations</CardTitle>
            </div>
            <Dialog open={showAddConfig} onOpenChange={setShowAddConfig}>
              <DialogTrigger asChild>
                <Button className="glass-button" onClick={() => {
                  setConfigForm({ id: '', name: '', isActive: true, order: 1, items: [] })
                  setEditingConfig(null)
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Config
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect">
                <DialogHeader>
                  <DialogTitle>{editingConfig ? 'Edit' : 'Add'} Menu Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="config-id">Configuration ID</Label>
                    <Input
                      id="config-id"
                      value={configForm.id}
                      onChange={(e) => setConfigForm(prev => ({...prev, id: e.target.value}))}
                      placeholder="e.g., main-nav"
                      disabled={!!editingConfig}
                    />
                  </div>
                  <div>
                    <Label htmlFor="config-name">Configuration Name</Label>
                    <Input
                      id="config-name"
                      value={configForm.name}
                      onChange={(e) => setConfigForm(prev => ({...prev, name: e.target.value}))}
                      placeholder="e.g., Main Navigation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="config-order">Order</Label>
                    <Input
                      id="config-order"
                      type="number"
                      value={configForm.order}
                      onChange={(e) => setConfigForm(prev => ({...prev, order: parseInt(e.target.value)}))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="config-active"
                      checked={configForm.isActive}
                      onCheckedChange={(checked) => setConfigForm(prev => ({...prev, isActive: checked}))}
                    />
                    <Label htmlFor="config-active">Active</Label>
                  </div>
                  <Button onClick={handleSaveConfig} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {editingConfig ? 'Update' : 'Create'} Configuration
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {menuConfigs.map((config) => (
                <Card key={config.id} className="border glass-effect">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-lg">{config.name}</h3>
                        <Badge variant={config.isActive ? "default" : "secondary"}>
                          {config.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Order:</span>
                          <Input
                            type="number"
                            value={config.order}
                            onChange={(e) => updateConfigOrder(config.id, parseInt(e.target.value))}
                            className="w-20 h-8"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={config.isActive}
                          onCheckedChange={() => toggleConfigStatus(config.id)}
                        />
                        <Button variant="outline" size="sm" onClick={() => startEditConfig(config)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeMenuConfig(config.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Menu Items ({config.items.length})</span>
                        <Dialog open={showAddItem === config.id} onOpenChange={(open) => {
                          if (!open) {
                            setShowAddItem(null)
                            setEditingItem(null)
                            setItemForm({
                              id: '',
                              title: '',
                              url: '',
                              icon: 'LayoutDashboard',
                              requiredRole: null,
                              children: []
                            })
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setShowAddItem(config.id)}>
                              <Plus className="w-3 h-3 mr-1" />
                              Add Item
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-effect">
                            <DialogHeader>
                              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Menu Item</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="item-title">Title</Label>
                                <Input
                                  id="item-title"
                                  value={itemForm.title}
                                  onChange={(e) => setItemForm(prev => ({...prev, title: e.target.value}))}
                                  placeholder="e.g., Dashboard"
                                />
                              </div>
                              <div>
                                <Label htmlFor="item-url">URL</Label>
                                <Input
                                  id="item-url"
                                  value={itemForm.url}
                                  onChange={(e) => setItemForm(prev => ({...prev, url: e.target.value}))}
                                  placeholder="e.g., /dashboard"
                                />
                              </div>
                              <div>
                                <Label htmlFor="item-icon">Icon</Label>
                                <Select 
                                  value={itemForm.icon} 
                                  onValueChange={(value) => setItemForm(prev => ({...prev, icon: value}))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {icons.map(icon => (
                                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="item-role">Required Role</Label>
                                <Select 
                                  value={itemForm.requiredRole || 'null'} 
                                  onValueChange={(value) => setItemForm(prev => ({...prev, requiredRole: value === 'null' ? null : value as any}))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {roles.map(role => (
                                      <SelectItem key={role.value || 'null'} value={role.value || 'null'}>
                                        {role.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleSaveMenuItem} className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                {editingItem ? 'Update' : 'Add'} Item
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      <div className="rounded-lg border border-white/20 overflow-hidden">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-white/20 hover:bg-white/5">
                                <TableHead>Title</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Required Role</TableHead>
                                <TableHead>Children</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {config.items.map((item) => (
                                <TableRow key={item.id} className="border-white/20 hover:bg-white/5">
                                  <TableCell className="font-medium">{item.title}</TableCell>
                                  <TableCell className="font-mono text-sm">{item.url}</TableCell>
                                  <TableCell>{item.icon}</TableCell>
                                  <TableCell>
                                    {item.requiredRole ? (
                                      <Badge variant="outline">{item.requiredRole}</Badge>
                                    ) : (
                                      <span className="text-muted-foreground">None</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {item.children && item.children.length > 0 ? (
                                      <Badge>{item.children.length} items</Badge>
                                    ) : (
                                      <span className="text-muted-foreground">None</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-1">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => startEditItem(config.id, item)}
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => removeMenuItem(config.id, item.id)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
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

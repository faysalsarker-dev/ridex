import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit2, Shield, Car, CheckCircle, XCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const profileAvatar = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'

interface VehicleInfo {
  model?: string;
  licensePlate?: string;
  color?: string;
}

interface DriverProfile {
  isApproved: boolean;
  isOnline: boolean;
  vehicleInfo: VehicleInfo;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role: 'rider' | 'driver' | 'admin';
  isBlocked: boolean;
  driverProfile?: DriverProfile;
}

const UserProfile: React.FC = () => {
  
  // Mock user data - in real app this would come from API/context
  const [userData, setUserData] = useState<UserData>({
    name: "John Smith",
    email: "john.smith@example.com",
    password: "******",
    role: "driver",
    isBlocked: false,
    driverProfile: {
      isApproved: true,
      isOnline: true,
      vehicleInfo: {
        model: "Toyota Camry 2022",
        licensePlate: "ABC-123",
        color: "White"
      }
    }
  });

  // Dialog states
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  // Form states
  const [newName, setNewName] = useState(userData.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleNameUpdate = () => {
    if (newName.trim().length < 2) {
   
      return;
    }
    
    setUserData(prev => ({ ...prev, name: newName.trim() }));
    setNameDialogOpen(false);

  };

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {

      return;
    }
    
    if (newPassword.length < 6) {
  
      return;
    }
    
    if (newPassword !== confirmPassword) {
   
      return;
    }
    
    // In real app, this would make an API call
    setPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
   
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'driver': return 'default';
      case 'rider': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (isApproved: boolean, isOnline: boolean) => {
    if (!isApproved) return { variant: 'destructive' as const, text: 'Pending Approval', icon: XCircle };
    if (isOnline) return { variant: 'default' as const, text: 'Online', icon: CheckCircle };
    return { variant: 'secondary' as const, text: 'Offline', icon: XCircle };
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            User Profile
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Manage your account settings and preferences
          </motion.p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none" />
            
            <CardHeader className="text-center pb-2 relative z-10">
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="h-32 w-32 ring-4 ring-primary/20 shadow-lg">
                    <AvatarImage src={profileAvatar} alt="Profile" />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <CardTitle className="text-3xl font-bold mb-2">{userData.name}</CardTitle>
              </motion.div>
              
              <motion.div 
                className="flex justify-center items-center gap-3 mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
                >
                  <Badge variant={getRoleBadgeVariant(userData.role)} className="capitalize text-sm px-3 py-1">
                    {userData.role}
                  </Badge>
                </motion.div>
                {userData.isBlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 500 }}
                  >
                    <Badge variant="destructive" className="text-sm px-3 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Blocked
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-8 relative z-10">
              {/* Contact Information */}
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="border-muted/50 bg-gradient-to-br from-card to-muted/10 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <User className="h-5 w-5 text-primary" />
                        </motion.div>
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="flex items-center justify-between group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div>
                          <Label className="text-sm text-muted-foreground">Full Name</Label>
                          <p className="font-semibold text-lg">{userData.name}</p>
                        </div>
                        <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
                          <DialogTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </DialogTrigger>
                          <AnimatePresence>
                            {nameDialogOpen && (
                              <DialogContent asChild>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <DialogHeader>
                                    <DialogTitle>Update Name</DialogTitle>
                                  </DialogHeader>
                                  <motion.div 
                                    className="space-y-4 pt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <div>
                                      <Label htmlFor="name">Full Name</Label>
                                      <motion.div
                                        whileFocus={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <Input
                                          id="name"
                                          value={newName}
                                          onChange={(e) => setNewName(e.target.value)}
                                          placeholder="Enter your full name"
                                          className="mt-1"
                                        />
                                      </motion.div>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                      <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Button onClick={handleNameUpdate} className="w-full">
                                          Update Name
                                        </Button>
                                      </motion.div>
                                      <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Button 
                                          variant="outline" 
                                          onClick={() => setNameDialogOpen(false)}
                                          className="w-full"
                                        >
                                          Cancel
                                        </Button>
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                </motion.div>
                              </DialogContent>
                            )}
                          </AnimatePresence>
                        </Dialog>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Label className="text-sm text-muted-foreground">Email Address</Label>
                        <p className="font-medium text-muted-foreground">{userData.email}</p>
                        <motion.p 
                          className="text-xs text-muted-foreground mt-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Email cannot be changed
                        </motion.p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Security */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="border-muted/50 bg-gradient-to-br from-card to-muted/10 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Shield className="h-5 w-5 text-primary" />
                        </motion.div>
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div 
                        className="flex items-center justify-between group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div>
                          <Label className="text-sm text-muted-foreground">Password</Label>
                          <p className="font-medium">••••••••</p>
                        </div>
                        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                          <DialogTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </DialogTrigger>
                          <AnimatePresence>
                            {passwordDialogOpen && (
                              <DialogContent asChild>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <DialogHeader>
                                    <DialogTitle>Change Password</DialogTitle>
                                  </DialogHeader>
                                  <motion.div 
                                    className="space-y-4 pt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    {[
                                      { id: 'current-password', label: 'Current Password', value: currentPassword, setValue: setCurrentPassword, show: showPasswords.current, key: 'current' },
                                      { id: 'new-password', label: 'New Password', value: newPassword, setValue: setNewPassword, show: showPasswords.new, key: 'new' },
                                      { id: 'confirm-password', label: 'Confirm New Password', value: confirmPassword, setValue: setConfirmPassword, show: showPasswords.confirm, key: 'confirm' }
                                    ].map((field, index) => (
                                      <motion.div
                                        key={field.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                      >
                                        <Label htmlFor={field.id}>{field.label}</Label>
                                        <div className="relative">
                                          <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                          >
                                            <Input
                                              id={field.id}
                                              type={field.show ? "text" : "password"}
                                              value={field.value}
                                              onChange={(e) => field.setValue(e.target.value)}
                                              placeholder={`Enter ${field.label.toLowerCase()}`}
                                              className="pr-10"
                                            />
                                          </motion.div>
                                          <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                          >
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                              onClick={() => setShowPasswords(prev => ({ ...prev, [field.key]: !prev[field.key as keyof typeof prev] }))}
                                            >
                                              {field.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                          </motion.div>
                                        </div>
                                      </motion.div>
                                    ))}
                                    
                                    <motion.div 
                                      className="flex gap-2 pt-4"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.4 }}
                                    >
                                      <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Button onClick={handlePasswordUpdate} className="w-full">
                                          Update Password
                                        </Button>
                                      </motion.div>
                                      <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Button 
                                          variant="outline" 
                                          onClick={() => {
                                            setPasswordDialogOpen(false);
                                            setCurrentPassword('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                          }}
                                          className="w-full"
                                        >
                                          Cancel
                                        </Button>
                                      </motion.div>
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              </DialogContent>
                            )}
                          </AnimatePresence>
                        </Dialog>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Driver Profile (only shown for drivers) */}
              <AnimatePresence>
                {userData.role === 'driver' && userData.driverProfile && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <Card className="border-muted/50 bg-gradient-to-br from-card to-muted/10 backdrop-blur-sm shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Car className="h-5 w-5 text-primary" />
                          </motion.div>
                          Driver Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <motion.div 
                          className="flex items-center gap-4 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div>
                            <Label className="text-sm text-muted-foreground">Status</Label>
                            <motion.div 
                              className="flex items-center gap-2 mt-1"
                              animate={userData.driverProfile!.isOnline ? { 
                                scale: [1, 1.05, 1] 
                              } : {}}
                              transition={{ 
                                duration: 2, 
                                repeat: userData.driverProfile!.isOnline ? Infinity : 0 
                              }}
                            >
                              {(() => {
                                const status = getStatusBadge(
                                  userData.driverProfile!.isApproved, 
                                  userData.driverProfile!.isOnline
                                );
                                return (
                                  <Badge variant={status.variant} className="flex items-center gap-1 text-sm px-3 py-1">
                                    <motion.div
                                      animate={{ 
                                        scale: userData.driverProfile!.isOnline ? [1, 1.2, 1] : 1,
                                      }}
                                      transition={{ 
                                        duration: 1.5, 
                                        repeat: userData.driverProfile!.isOnline ? Infinity : 0 
                                      }}
                                    >
                                      <status.icon className="h-3 w-3" />
                                    </motion.div>
                                    {status.text}
                                  </Badge>
                                );
                              })()}
                            </motion.div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="grid md:grid-cols-3 gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {[
                            { label: 'Vehicle Model', value: userData.driverProfile.vehicleInfo.model },
                            { label: 'License Plate', value: userData.driverProfile.vehicleInfo.licensePlate },
                            { label: 'Vehicle Color', value: userData.driverProfile.vehicleInfo.color }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300 }
                              }}
                              className="p-4 rounded-lg bg-gradient-to-br from-muted/20 to-muted/10 border border-muted/30"
                            >
                              <Label className="text-sm text-muted-foreground">{item.label}</Label>
                              <p className="font-semibold text-lg mt-1">{item.value || 'Not provided'}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
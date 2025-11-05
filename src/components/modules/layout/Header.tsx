/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, LogOut, Settings, Mail, Shield, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '@/redux/features/admin/admin.api';
import { useLogoutMutation, useUpdateMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';

export const Header = () => {
  const { data, isLoading } = useUserInfoQuery({});
  const [logOut, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [update, { isLoading: isUpdating }] = useUpdateMutation();
  const [updatePass, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  const user = data?.data;

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('profile');

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
      });
    }
  }, [user]);

  const getInitials = (name: string) => {
    if (!name) return 'AD';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileUpdate = async () => {
    if (!profileForm.name.trim()) {
      toast.error('Name is required');
      return;
    }

    try {
      await update({
        name: profileForm.name,
      }).unwrap();

      toast.success('Profile updated successfully');
      setProfileDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordForm.currentPassword) {
      toast.error('Current password is required');
      return;
    }

    if (!passwordForm.newPassword) {
      toast.error('New password is required');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    try {
      await updatePass({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();

      toast.success('Password updated successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setActiveTab('profile');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update password');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut({}).unwrap();
      toast.success('Logged out successfully');
      setLogoutDialogOpen(false);
      // Redirect will be handled by your app's auth logic
      window.location.href = '/login';
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to logout');
      setLogoutDialogOpen(false);
    }
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 backdrop-blur-sm bg-card/80">
      {/* Left side - can add logo or title here */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-foreground">Admin Panel</h2>
      </div>

      {/* Right side - Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col items-end">
          <p className="text-sm font-medium text-foreground">
            {user?.name || 'Admin User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.role || 'Administrator'}
          </p>
        </div>

        <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-all hover:shadow-lg">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {isLoading ? '...' : getInitials(user?.name || 'Admin')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </DialogTitle>
              <DialogDescription>
                Manage your profile information and security settings
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      {getInitials(profileForm.name || user?.name || 'Admin')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      disabled={isUpdating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Role
                    </Label>
                    <Input
                      value={user?.role || 'Administrator'}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>

                  <Button 
                    onClick={handleProfileUpdate} 
                    className="w-full" 
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-4">
                <div className="flex items-center gap-2 p-3 mb-4 text-sm bg-muted rounded-lg">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Update your password to keep your account secure
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value,
                        })
                      }
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      disabled={isUpdatingPassword}
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <Button
                    onClick={handlePasswordUpdate}
                    variant="default"
                    className="w-full"
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-destructive" />
                Confirm Logout
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to login again to access the admin panel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
};
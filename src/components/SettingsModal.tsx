import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, User, Shield, Bell, Eye, Lock, Award, Star, Settings } from 'lucide-react';
import { useAppContext, User as UserType } from '@/contexts/AppContext';
import { AdminPanel } from './AdminPanel';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const { isAdmin } = useAppContext();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Mental health advocate and wellness enthusiast'
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    emailVisible: false,
    activityVisible: true,
    twoFactorAuth: false
  });
  
  const [systemSettings, setSystemSettings] = useState({
    autoApprove: false,
    allowGuestComments: true,
    moderationMode: 'manual'
  });

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    if (user) {
      onUpdateUser({ ...user, name: profile.name, email: profile.email });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-cognitio-purple to-cognitio-magenta text-white">
          <h2 className="text-xl font-oswald font-semibold">
            {isAdmin() ? 'Admin Settings & Profile' : 'Settings & Profile'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <Tabs defaultValue={isAdmin() ? 'admin' : 'profile'} className="p-6">
            <TabsList className={`grid w-full ${isAdmin() ? 'grid-cols-5' : 'grid-cols-4'}`}>
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                Rewards
              </TabsTrigger>
              {isAdmin() && (
                <TabsTrigger value="admin" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
                      alt="Avatar" 
                      className="w-16 h-16 rounded-full"
                    />
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={user?.email === 'hello@cognitioplus.com'}
                      />
                    </div>
                  </div>
                  {user?.isAdmin && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-red-600" />
                        <span className="font-semibold text-sm text-red-800">Admin Account</span>
                      </div>
                      <p className="text-xs text-red-600">
                        You have full system access including content moderation and user management.
                      </p>
                    </div>
                  )}
                  <Button onClick={handleSaveProfile} className="bg-cognitio-purple hover:bg-cognitio-purple/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add extra security to your account</p>
                    </div>
                    <Switch 
                      checked={privacy.twoFactorAuth} 
                      onCheckedChange={(checked) => setPrivacy({...privacy, twoFactorAuth: checked})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Change Password</Label>
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Button variant="outline">Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries({
                    profileVisible: 'Profile Visibility',
                    emailVisible: 'Email Visibility', 
                    activityVisible: 'Activity Visibility'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label>{label}</Label>
                      <Switch 
                        checked={privacy[key as keyof typeof privacy]} 
                        onCheckedChange={(checked) => setPrivacy({...privacy, [key]: checked})}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards & Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-cognitio-yellow/10 rounded-lg">
                      <Star className="h-8 w-8 mx-auto mb-2 text-cognitio-purple" />
                      <p className="font-semibold">{user?.points || 0}</p>
                      <p className="text-sm text-gray-600">Points</p>
                    </div>
                    <div className="p-4 bg-cognitio-purple/10 rounded-lg">
                      <Award className="h-8 w-8 mx-auto mb-2 text-cognitio-purple" />
                      <p className="font-semibold">Level {Math.floor((user?.points || 0) / 100) + 1}</p>
                      <p className="text-sm text-gray-600">Current Level</p>
                    </div>
                    <div className="p-4 bg-cognitio-magenta/10 rounded-lg">
                      <Badge className="h-8 w-8 mx-auto mb-2 text-cognitio-magenta" />
                      <p className="font-semibold">{user?.badges?.length || 0}</p>
                      <p className="text-sm text-gray-600">Badges</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Your Badges</Label>
                    <div className="flex flex-wrap gap-2">
                      {user?.badges?.map((badge, index) => (
                        <Badge key={index} variant="secondary">{badge}</Badge>
                      )) || <Badge variant="secondary">New Member</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {isAdmin() && (
              <TabsContent value="admin" className="space-y-4">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

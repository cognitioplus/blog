import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/contexts/AppContext';
import { UserManagement } from './UserManagement';
import { ContentModeration } from './ContentModeration';
import { SystemAnalytics } from './SystemAnalytics';

export const AdminPanel: React.FC = () => {
  const { isAdmin } = useAppContext();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    totalAnalytics: 0
  });

  useEffect(() => {
    if (isAdmin()) {
      loadStats();
    }
  }, []);

  const loadStats = async () => {
    try {
      const [users, posts, pending, analytics] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('posts').select('id', { count: 'exact' }),
        supabase.from('posts').select('id', { count: 'exact' }).eq('approved', false),
        supabase.from('analytics').select('id', { count: 'exact' })
      ]);

      setStats({
        totalUsers: users.count || 0,
        totalPosts: posts.count || 0,
        pendingPosts: pending.count || 0,
        totalAnalytics: analytics.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Access denied. Admin privileges required.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Analytics Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnalytics}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
          <TabsTrigger value="analytics">System Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="moderation">
          <ContentModeration onStatsUpdate={loadStats} />
        </TabsContent>
        <TabsContent value="analytics">
          <SystemAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
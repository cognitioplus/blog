import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { BarChart3, TrendingUp, Users, FileText, MessageCircle, Heart } from 'lucide-react';

interface AnalyticsData {
  id: string;
  event_type: string;
  user_id: string;
  post_id?: string;
  metadata: any;
  created_at: string;
  users?: { name: string; email: string };
}

interface AnalyticsStats {
  totalEvents: number;
  userRegistrations: number;
  postCreations: number;
  comments: number;
  reactions: number;
  shares: number;
}

export const SystemAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalEvents: 0,
    userRegistrations: 0,
    postCreations: 0,
    comments: 0,
    reactions: 0,
    shares: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      const startDate = new Date();
      if (timeRange === '7d') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (timeRange === '30d') {
        startDate.setDate(startDate.getDate() - 30);
      } else if (timeRange === '90d') {
        startDate.setDate(startDate.getDate() - 90);
      }

      const { data, error } = await supabase
        .from('analytics')
        .select(`
          *,
          users (name, email)
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      setAnalytics(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: AnalyticsData[]) => {
    const stats = {
      totalEvents: data.length,
      userRegistrations: data.filter(d => d.event_type === 'user_registration').length,
      postCreations: data.filter(d => d.event_type === 'post_created').length,
      comments: data.filter(d => d.event_type === 'comment_added').length,
      reactions: data.filter(d => d.event_type === 'post_reaction').length,
      shares: data.filter(d => d.event_type === 'post_shared').length
    };
    setStats(stats);
  };

  const trackEvent = async (eventType: string, metadata: any = {}) => {
    try {
      await supabase
        .from('analytics')
        .insert({
          event_type: eventType,
          user_id: 'system',
          metadata
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'user_registration': return <Users className="h-4 w-4" />;
      case 'post_created': return <FileText className="h-4 w-4" />;
      case 'comment_added': return <MessageCircle className="h-4 w-4" />;
      case 'post_reaction': return <Heart className="h-4 w-4" />;
      case 'post_shared': return <TrendingUp className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'user_registration': return 'bg-green-100 text-green-800';
      case 'post_created': return 'bg-blue-100 text-blue-800';
      case 'comment_added': return 'bg-purple-100 text-purple-800';
      case 'post_reaction': return 'bg-pink-100 text-pink-800';
      case 'post_shared': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">System Analytics</h3>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              New Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userRegistrations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Posts Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postCreations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.comments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Reactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Shares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shares}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.slice(0, 20).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getEventColor(event.event_type)}`}>
                    {getEventIcon(event.event_type)}
                  </div>
                  <div>
                    <p className="font-medium">{event.event_type.replace('_', ' ').toUpperCase()}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.users?.name || 'System'} • {new Date(event.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {event.event_type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
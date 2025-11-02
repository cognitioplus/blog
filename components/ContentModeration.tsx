import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Check, X, Edit, Save, Trash2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  tags: string[];
  approved: boolean;
  created_at: string;
  users?: { name: string; email: string };
}

interface ContentModerationProps {
  onStatsUpdate: () => void;
}

export const ContentModeration: React.FC<ContentModerationProps> = ({ onStatsUpdate }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users (name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const approvePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ approved: true })
        .eq('id', postId);

      if (error) throw error;
      
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, approved: true } : post
      ));
      
      toast({
        title: "Success",
        description: "Post approved successfully"
      });
      onStatsUpdate();
    } catch (error) {
      console.error('Error approving post:', error);
      toast({
        title: "Error",
        description: "Failed to approve post",
        variant: "destructive"
      });
    }
  };

  const rejectPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ approved: false })
        .eq('id', postId);

      if (error) throw error;
      
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, approved: false } : post
      ));
      
      toast({
        title: "Success",
        description: "Post rejected"
      });
      onStatsUpdate();
    } catch (error) {
      console.error('Error rejecting post:', error);
      toast({
        title: "Error",
        description: "Failed to reject post",
        variant: "destructive"
      });
    }
  };

  const startEditing = (post: Post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveEdit = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ 
          title: editTitle, 
          content: editContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId);

      if (error) throw error;
      
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, title: editTitle, content: editContent } : post
      ));
      
      setEditingPost(null);
      toast({
        title: "Success",
        description: "Post updated successfully"
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Success",
        description: "Post deleted successfully"
      });
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading posts...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingPost === post.id ? (
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mb-2"
                  />
                ) : (
                  <CardTitle className="mb-2">{post.title}</CardTitle>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    By {post.users?.name || 'Unknown'}
                  </span>
                  {post.approved ? (
                    <Badge variant="default">Approved</Badge>
                  ) : (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {editingPost === post.id ? (
                  <Button size="sm" onClick={() => saveEdit(post.id)}>
                    <Save className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => startEditing(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => deletePost(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {editingPost === post.id ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                className="mb-4"
              />
            ) : (
              <p className="text-sm mb-4">{post.content.substring(0, 200)}...</p>
            )}
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => approvePost(post.id)} disabled={post.approved}>
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => rejectPost(post.id)}>
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

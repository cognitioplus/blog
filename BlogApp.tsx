import React, { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import BlogHeader from './BlogHeader';
import BlogEditor from './BlogEditor';
import DragDropContainer from './DragDropContainer';
import LoginPage from './LoginPage';
import SettingsModal from './SettingsModal';
import RewardSystem, { RewardBadges } from './RewardSystem';
import { useAppContext, BlogPost as BlogPostType, User, Comment } from '@/contexts/AppContext';

const mentalHealthPosts: BlogPostType[] = [
  {
    id: '1',
    title: 'Building Resilience: Your Mental Health Toolkit',
    content: 'Resilience is not about avoiding difficulties, but learning to navigate them with grace and strength. In our journey toward mental wellness, developing a comprehensive toolkit of coping strategies becomes essential. This includes mindfulness practices, cognitive restructuring techniques, and building strong support networks. Research shows that resilient individuals share common traits: they maintain perspective during challenges, practice self-compassion, and view setbacks as opportunities for growth. By cultivating these skills, we can transform our relationship with adversity and emerge stronger from life\'s inevitable challenges.',
    author: 'Dr. Elena Rodriguez',
    authorId: 'system',
    date: new Date().toLocaleDateString(),
    tags: ['Resilience', 'Mental Health', 'Well-Being', 'Growth'],
    likes: 156,
    comments: [],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    reactions: { likes: 156, loves: 89, smiles: 45 },
    approved: true
  },
  {
    id: '2',
    title: 'The Science of Personal Growth: Neuroplasticity and Change',
    content: 'Our brains possess an remarkable ability to reorganize and form new neural connections throughout our lives - a phenomenon called neuroplasticity. This scientific discovery revolutionizes how we approach personal development and mental health recovery. When we engage in consistent positive practices like meditation, learning new skills, or challenging negative thought patterns, we literally rewire our brains for better mental health. Understanding neuroplasticity empowers us to take an active role in our psychological well-being, knowing that change is not only possible but inevitable when we commit to growth-oriented behaviors.',
    author: 'Dr. James Chen',
    authorId: 'system',
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    tags: ['Growth', 'Mental Health', 'Psychosocial Support', 'Wellness'],
    likes: 203,
    comments: [],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    reactions: { likes: 203, loves: 124, smiles: 67 },
    approved: true
  }
];

const BlogApp: React.FC = () => {
  const { user, setUser, posts, setPosts, isAdmin, canEditPost, canDeletePost, addRewardPoints } = useAppContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Initialize posts if empty
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(mentalHealthPosts);
    }
  }, [posts.length, setPosts]);

  const availableTags = useMemo(() => {
    const tags = posts.flatMap(post => post.tags);
    return Array.from(new Set(tags));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Admin sees all posts, users only see approved posts or their own
      const canView = isAdmin() || post.approved || (user && post.authorId === user.id);
      if (!canView) return false;
      
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag, isAdmin, user]);

  const handleCreatePost = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setEditingPost(undefined);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: BlogPostType) => {
    if (!canEditPost(post)) {
      toast({ title: 'Access Denied', description: 'You can only edit your own posts.' });
      return;
    }
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !canDeletePost(post)) {
      toast({ title: 'Access Denied', description: 'You can only delete your own posts.' });
      return;
    }
    setPosts(posts.filter(p => p.id !== postId));
    toast({ title: 'Post deleted', description: 'The post has been removed.' });
  };

  const handleApprovePost = (postId: string) => {
    if (!isAdmin()) {
      toast({ title: 'Access Denied', description: 'Only admins can approve posts.' });
      return;
    }
    setPosts(posts.map(p => p.id === postId ? { ...p, approved: true } : p));
    toast({ title: 'Post approved', description: 'The post is now visible to all users.' });
  };

  const handleSavePost = (postData: Partial<BlogPostType>) => {
    if (!user) return;
    
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
      toast({ title: 'Post updated successfully!', description: 'Your changes have been saved.' });
    } else {
      const newPost: BlogPostType = {
        id: Date.now().toString(),
        title: postData.title || '',
        content: postData.content || '',
        author: user.name,
        authorId: user.id,
        date: new Date().toLocaleDateString(),
        tags: postData.tags || [],
        likes: 0,
        comments: [],
        reactions: { likes: 0, loves: 0, smiles: 0 },
        approved: isAdmin(), // Admin posts auto-approved
        image: postData.image
      };
      setPosts([newPost, ...posts]);
      addRewardPoints(10, 'creating a post');
      toast({ 
        title: 'Post created successfully!', 
        description: isAdmin() ? 'Your post is now live.' : 'Your post is pending admin approval.' 
      });
    }
    setIsEditorOpen(false);
  };

  const handleReact = (id: string, type: 'like' | 'love' | 'smile') => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setPosts(posts.map(post => {
      if (post.id === id) {
        const reactions = post.reactions || { likes: 0, loves: 0, smiles: 0 };
        const key = type === 'like' ? 'likes' : type === 'love' ? 'loves' : 'smiles';
        return {
          ...post,
          reactions: { ...reactions, [key]: reactions[key] + 1 }
        };
      }
      return post;
    }));
    addRewardPoints(3, 'reacting to a post');
  };

  const handleAddComment = (id: string, content: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setPosts(posts.map(post => {
      if (post.id === id) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: user.name,
          authorId: user.id,
          content,
          date: new Date().toLocaleDateString()
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    addRewardPoints(5, 'commenting on a post');
  };

  const handleShare = (id: string) => {
    addRewardPoints(7, 'sharing a post');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
    toast({ 
      title: `Welcome ${userData.isAdmin ? 'Admin' : 'to Cognitio+'}!`, 
      description: userData.isAdmin ? 'You have full system access.' : 'You can now participate and earn rewards.' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <BlogHeader
        onCreatePost={handleCreatePost}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        availableTags={availableTags}
        user={user}
        onLogin={() => setShowLogin(true)}
        onSettings={() => setShowSettings(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <RewardBadges user={user} />
          </div>
          <div className="lg:col-span-3">
            <DragDropContainer
              posts={filteredPosts}
              onReorder={setPosts}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onApprove={handleApprovePost}
              onReact={handleReact}
              onAddComment={handleAddComment}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>

      <BlogEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        post={editingPost}
        onSave={handleSavePost}
      />

      {showLogin && (
        <LoginPage
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
        onUpdateUser={setUser}
      />
    </div>
  );
};

export default BlogApp;
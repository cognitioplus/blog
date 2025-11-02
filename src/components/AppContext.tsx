import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rewards, setRewards] = useState({ points: 0, badges: [] });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsAdmin(data.user?.email === 'hello@cognitioplus.com');
    });
  }, []);

  return (
    <AppContext.Provider value={{ user, isAdmin, rewards, setRewards }}>
      {children}
    </AppContext.Provider>
  );
};

import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  points: number;
  badges: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  reactions: { [key: string]: number };
  approved: boolean;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  replies?: Comment[];
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  isAdmin: () => boolean;
  canEditPost: (post: BlogPost) => boolean;
  canDeletePost: (post: BlogPost) => boolean;
  addRewardPoints: (points: number, action: string) => void;
  trackAnalytics: (eventType: string, metadata?: any) => void;
  savePost: (post: BlogPost) => Promise<void>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  user: null,
  setUser: () => {},
  posts: [],
  setPosts: () => {},
  isAdmin: () => false,
  canEditPost: () => false,
  canDeletePost: () => false,
  addRewardPoints: () => {},
  trackAnalytics: () => {},
  savePost: async () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const isAdmin = () => {
    return user?.email === 'hello@cognitioplus.com' && user?.isAdmin === true;
  };

  const canEditPost = (post: BlogPost) => {
    return isAdmin() || (user && post.authorId === user.id);
  };

  const canDeletePost = (post: BlogPost) => {
    return isAdmin() || (user && post.authorId === user.id);
  };

  const addRewardPoints = (points: number, action: string) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      toast({
        title: "Points Earned!",
        description: `+${points} points for ${action}`,
      });
    }
  };

  const trackAnalytics = async (eventType: string, metadata: any = {}) => {
    if (user) {
      try {
        await supabase
          .from('analytics')
          .insert({
            event_type: eventType,
            user_id: user.id,
            metadata
          });
      } catch (error) {
        console.error('Error tracking analytics:', error);
      }
    }
  };

  const savePost = async (post: BlogPost) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('posts')
          .upsert({
            id: post.id,
            title: post.title,
            content: post.content,
            author_id: user.id,
            tags: post.tags,
            approved: isAdmin() ? true : false,
            image: post.image,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        
        setPosts(prevPosts => {
          const existingIndex = prevPosts.findIndex(p => p.id === post.id);
          if (existingIndex >= 0) {
            const updated = [...prevPosts];
            updated[existingIndex] = post;
            return updated;
          } else {
            return [...prevPosts, post];
          }
        });
        
        trackAnalytics('post_saved', { postId: post.id, title: post.title });
        toast({
          title: "Success",
          description: "Post saved successfully"
        });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        user,
        setUser,
        posts,
        setPosts,
        isAdmin,
        canEditPost,
        canDeletePost,
        addRewardPoints,
        trackAnalytics,
        savePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
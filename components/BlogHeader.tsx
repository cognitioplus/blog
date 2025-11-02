import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, TrendingUp, Calendar, User, Heart, Brain, Leaf, Settings, LogIn } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  badges: string[];
  points: number;
  level: number;
}

interface BlogHeaderProps {
  onCreatePost: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  availableTags: string[];
  user: User | null;
  onLogin: () => void;
  onSettings: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  onCreatePost,
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagSelect,
  availableTags,
  user,
  onLogin,
  onSettings
}) => {
  const defaultTags = ['Growth', 'Resilience', 'Wellness', 'Well-Being', 'Mental Health', 'Psychosocial Support'];
  const displayTags = availableTags.length > 0 ? availableTags : defaultTags;

  return (
    <div className="bg-gradient-to-r from-cognitio-purple to-cognitio-magenta text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-oswald font-bold mb-2">Cognitio+ Blog</h1>
            <p className="text-white/80 text-lg font-montserrat">Empowering Growth Through Mental Wellness & Resilience</p>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right mr-3">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-white/70">{user.points} pts • Level {user.level}</p>
                </div>
                <Avatar className="w-10 h-10 border-2 border-white/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button 
                  onClick={onSettings}
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button 
                onClick={onLogin}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-cognitio-purple"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white font-condensed"
              />
            </div>
          </div>
          
          <Button 
            onClick={onCreatePost}
            className="bg-cognitio-yellow text-cognitio-black hover:bg-cognitio-yellow/90 font-semibold px-6 font-condensed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={selectedTag === '' ? 'default' : 'secondary'}
            className={`cursor-pointer transition-colors font-condensed ${
              selectedTag === '' 
                ? 'bg-cognitio-yellow text-cognitio-black' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => onTagSelect('')}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            All Posts
          </Badge>
          {displayTags.slice(0, 6).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'secondary'}
              className={`cursor-pointer transition-colors font-condensed ${
                selectedTag === tag 
                  ? 'bg-cognitio-yellow text-cognitio-black' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              onClick={() => onTagSelect(tag)}
            >
              {tag === 'Mental Health' && <Brain className="h-3 w-3 mr-1" />}
              {tag === 'Wellness' && <Heart className="h-3 w-3 mr-1" />}
              {tag === 'Growth' && <Leaf className="h-3 w-3 mr-1" />}
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-white/80 font-condensed">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Latest Updates</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Community Driven</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;

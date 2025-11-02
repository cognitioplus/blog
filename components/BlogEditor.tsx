import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BlogPost } from '@/contexts/AppContext';
import { useAppContext } from '@/contexts/AppContext';
import ImageUpload from './ImageUpload';

interface BlogEditorProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
}

const suggestedTags = [
  'Growth', 'Resilience', 'Wellness', 'Well-Being', 
  'Mental Health', 'Psychosocial Support', 'Mindfulness',
  'Self-Care', 'Personal Development', 'Emotional Intelligence'
];

const BlogEditor: React.FC<BlogEditorProps> = ({ isOpen, onClose, post, onSave }) => {
  const { user, isAdmin } = useAppContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setTags(post.tags);
      setImage(post.image);
      setApproved(post.approved);
    } else {
      setTitle('');
      setContent('');
      setAuthor(user?.name || '');
      setTags([]);
      setImage(undefined);
      setApproved(isAdmin()); // Admin posts auto-approved
    }
  }, [post, user, isAdmin]);

  const handleSave = async () => {
    if (!user) return;
    
    const postData: Partial<BlogPost> = {
      id: post?.id || Date.now().toString(),
      title,
      content,
      author: user.name,
      authorId: user.id,
      tags,
      image,
      date: post?.date || new Date().toLocaleDateString(),
      likes: post?.likes || 0,
      comments: post?.comments || [],
      reactions: post?.reactions || { likes: 0, loves: 0, smiles: 0 },
      approved: isAdmin() ? approved : false // Only admin can set approval
    };
    
    onSave(postData);
    onClose();
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(newTag);
    }
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to create or edit posts.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  const isEditing = !!post;
  const canEdit = !isEditing || isAdmin() || (user && post?.authorId === user.id);

  if (isEditing && !canEdit) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You can only edit your own posts {!isAdmin() && '(or be an admin)'}.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-cognitio-dark">
            {isEditing ? 'Edit Post' : 'Create New Post'}
            {isAdmin() && (
              <span className="text-sm font-normal text-cognitio-primary ml-2">(Admin Mode)</span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="font-oswald text-cognitio-dark">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="font-montserrat mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="author" className="font-oswald text-cognitio-dark">Author</Label>
            <Input
              id="author"
              value={user.name}
              disabled
              className="font-montserrat mt-2 bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">Author is automatically set to your name</p>
          </div>
          
          <ImageUpload
            currentImage={image}
            onImageChange={setImage}
            onImageRemove={() => setImage(undefined)}
          />
          
          <div>
            <Label htmlFor="content" className="font-oswald text-cognitio-dark">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              className="font-montserrat mt-2 min-h-[200px] resize-none"
              rows={10}
            />
          </div>
          
          <div>
            <Label className="font-oswald text-cognitio-dark">Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-cognitio-primary text-white font-roboto"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2 mb-3">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="font-montserrat"
              />
              <Button 
                onClick={() => addTag(newTag)}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestedTags.filter(tag => !tags.includes(tag)).map((tag) => (
                <Button
                  key={tag}
                  onClick={() => addTag(tag)}
                  variant="ghost"
                  size="sm"
                  className="text-xs font-roboto text-cognitio-primary hover:bg-cognitio-primary/10"
                >
                  + {tag}
                </Button>
              ))}
            </div>
          </div>
          
          {isAdmin() && (
            <div className="flex items-center space-x-2 p-4 bg-cognitio-accent/10 rounded-lg">
              <input
                type="checkbox"
                id="approved"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="approved" className="font-roboto">
                Approve post for public viewing
              </Label>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-cognitio-primary hover:bg-cognitio-secondary font-roboto"
              disabled={!title.trim() || !content.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditor;

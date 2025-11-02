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

interface PostEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost;
  onSave: (post: BlogPost) => void;
}

const PostEditModal: React.FC<PostEditModalProps> = ({ isOpen, onClose, post, onSave }) => {
  const { user, isAdmin } = useAppContext();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState<string[]>(post.tags);
  const [newTag, setNewTag] = useState('');
  const [image, setImage] = useState<string | undefined>(post.image);
  const [approved, setApproved] = useState(post.approved);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = title !== post.title || 
                   content !== post.content || 
                   JSON.stringify(tags) !== JSON.stringify(post.tags) ||
                   image !== post.image ||
                   approved !== post.approved;
    setHasChanges(changed);
  }, [title, content, tags, image, approved, post]);

  const handleSave = () => {
    const updatedPost: BlogPost = {
      ...post,
      title,
      content,
      tags,
      image,
      approved: isAdmin() ? approved : post.approved
    };
    onSave(updatedPost);
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

  const canEdit = user && (isAdmin() || post.authorId === user.id);

  if (!canEdit) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to edit this post.
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
            Edit Post {isAdmin() && !post.approved && '(Pending Approval)'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="font-oswald text-cognitio-dark">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-montserrat mt-2"
            />
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
              className="font-montserrat mt-2 min-h-[200px]"
              rows={10}
            />
          </div>
          
          <div>
            <Label className="font-oswald text-cognitio-dark">Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-cognitio-primary text-white">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-300">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                placeholder="Add a tag..."
                className="font-montserrat"
              />
              <Button onClick={() => addTag(newTag)} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {isAdmin() && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="approved"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="approved" className="font-roboto">Approved for public viewing</Label>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button 
              onClick={handleSave}
              className="bg-cognitio-primary hover:bg-cognitio-secondary"
              disabled={!hasChanges || !title.trim() || !content.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditModal;

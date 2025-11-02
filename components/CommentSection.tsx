import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar?: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  isOpen: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment, isOpen }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h4 className="text-lg font-oswald font-semibold mb-4 text-gray-900">
        Comments ({comments.length})
      </h4>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-3 font-montserrat resize-none"
          rows={3}
        />
        <Button 
          type="submit" 
          disabled={!newComment.trim()}
          className="bg-cognitio-primary hover:bg-cognitio-secondary font-roboto"
        >
          <Send className="w-4 h-4 mr-2" />
          Post Comment
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="border-l-4 border-l-cognitio-accent">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-cognitio-primary text-white text-sm">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-oswald font-medium text-sm text-gray-900">
                      {comment.author}
                    </h5>
                    <span className="text-xs text-gray-500 font-roboto">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-700 font-montserrat text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

import React from 'react';
import { BlogPost as BlogPostComponent } from './BlogPost';
import { useAppContext, BlogPost } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trash2, Edit } from 'lucide-react';

interface DragDropContainerProps {
  posts: BlogPost[];
  onReorder: (posts: BlogPost[]) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReact: (id: string, type: 'like' | 'love' | 'smile') => void;
  onAddComment: (id: string, content: string) => void;
  onShare: (id: string) => void;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  posts,
  onReorder,
  onEdit,
  onDelete,
  onApprove,
  onReact,
  onAddComment,
  onShare
}) => {
  const { isAdmin, canEditPost, canDeletePost } = useAppContext();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      const newPosts = [...posts];
      const draggedPost = newPosts[dragIndex];
      newPosts.splice(dragIndex, 1);
      newPosts.splice(dropIndex, 0, draggedPost);
      onReorder(newPosts);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-oswald text-gray-600 mb-2">No posts found</h3>
        <p className="text-gray-500 font-montserrat">Try adjusting your search or filter criteria, or create a new post.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          draggable={isAdmin()}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${
            isAdmin() ? 'cursor-move' : ''
          } ${!post.approved ? 'border-l-4 border-yellow-400' : ''}`}
        >
          {/* Admin Controls */}
          {isAdmin() && (
            <div className="bg-red-50 border border-red-200 rounded-t-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-800">
                  Admin Controls
                </span>
                {!post.approved && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Pending Approval
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {!post.approved && (
                  <Button
                    size="sm"
                    onClick={() => onApprove(post.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(post)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(post.id)}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
          
          {/* User Edit Controls */}
          {!isAdmin() && canEditPost(post) && (
            <div className="bg-blue-50 border border-blue-200 rounded-t-lg p-2 flex items-center justify-between">
              <span className="text-sm text-blue-800">Your Post</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(post)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {canDeletePost(post) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(post.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}

          <BlogPostComponent
            post={post}
            onEdit={onEdit}
            onReact={onReact}
            onAddComment={onAddComment}
            onShare={onShare}
          />
        </div>
      ))}
    </div>
  );
};

export default DragDropContainer;

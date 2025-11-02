import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ThumbsUp, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Reactions {
  likes: number;
  loves: number;
  smiles: number;
}

interface EmojiReactionsProps {
  reactions: Reactions;
  onReact: (type: 'like' | 'love' | 'smile') => void;
  userReactions?: { like?: boolean; love?: boolean; smile?: boolean };
}

const EmojiReactions: React.FC<EmojiReactionsProps> = ({ 
  reactions, 
  onReact, 
  userReactions = {} 
}) => {
  const reactionButtons = [
    {
      type: 'like' as const,
      icon: ThumbsUp,
      count: reactions.likes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      activeColor: 'bg-blue-100 text-blue-700'
    },
    {
      type: 'love' as const,
      icon: Heart,
      count: reactions.loves,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      activeColor: 'bg-red-100 text-red-700'
    },
    {
      type: 'smile' as const,
      icon: Smile,
      count: reactions.smiles,
      color: 'text-cognitio-accent',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      activeColor: 'bg-yellow-100 text-cognitio-accent'
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {reactionButtons.map(({ type, icon: Icon, count, color, bgColor, activeColor }) => {
        const isActive = userReactions[type];
        return (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => onReact(type)}
            className={cn(
              "h-8 px-3 rounded-full transition-all duration-200 font-roboto text-xs",
              isActive ? activeColor : `${bgColor} hover:scale-105`,
              isActive ? "shadow-sm" : ""
            )}
          >
            <Icon className={cn("w-4 h-4 mr-1", isActive ? "" : color)} />
            <span className="font-medium">{count}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default EmojiReactions;

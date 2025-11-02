import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Heart, MessageCircle, Share, Trophy } from 'lucide-react';

interface RewardSystemProps {
  user: any;
  onUpdateUser: (user: any) => void;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ user, onUpdateUser }) => {
  const awardPoints = (points: number, badge?: string) => {
    if (!user) return;
    
    const newPoints = user.points + points;
    const newLevel = Math.floor(newPoints / 100) + 1;
    const updatedBadges = badge && !user.badges.includes(badge) 
      ? [...user.badges, badge] 
      : user.badges;
    
    onUpdateUser({
      ...user,
      points: newPoints,
      level: newLevel,
      badges: updatedBadges
    });
  };

  const handleReaction = () => {
    awardPoints(3, user.points >= 50 ? 'Reactor' : undefined);
  };

  const handleComment = () => {
    awardPoints(5, user.points >= 100 ? 'Commenter' : undefined);
  };

  const handleShare = () => {
    awardPoints(7, user.points >= 150 ? 'Sharer' : undefined);
  };

  const handlePost = () => {
    awardPoints(10, user.points >= 200 ? 'Content Creator' : undefined);
  };

  return {
    awardPoints,
    handleReaction,
    handleComment,
    handleShare,
    handlePost
  };
};

export const RewardBadges: React.FC<{ user: any }> = ({ user }) => {
  if (!user) return null;

  const badgeIcons: Record<string, any> = {
    'New Member': Star,
    'Reactor': Heart,
    'Commenter': MessageCircle,
    'Sharer': Share,
    'Content Creator': Award,
    'Community Leader': Trophy
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-cognitio-purple">Your Progress</h3>
          <div className="text-right">
            <p className="text-sm font-semibold">{user.points} Points</p>
            <p className="text-xs text-gray-600">Level {user.level}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge: string, index: number) => {
            const IconComponent = badgeIcons[badge] || Star;
            return (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <IconComponent className="h-3 w-3" />
                {badge}
              </Badge>
            );
          })}
        </div>
        
        <div className="mt-3 text-xs text-gray-600">
          <p>• React to posts: +3 points</p>
          <p>• Comment on posts: +5 points</p>
          <p>• Share posts: +7 points</p>
          <p>• Create posts: +10 points</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSystem;
// components/BlogPost.tsx
import React from 'react';
import CommentSection from './CommentSection';
import EmojiReactions from './EmojiReactions';
import ShareModal from './ShareModal';

export default function BlogPost({ post }: { post: any }) {
  return (
    <article className="blog-post">
      <h1>{post.title}</h1>
      <EmojiReactions />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <ShareModal />
      <CommentSection />
    </article>
  );
}
import React, { useState, createContext, useContext } from 'react';
import { Shield, Settings, User, LogOut, Edit3, Upload, MessageCircle, ThumbsUp, Share2, BarChart3, Users, Eye, Star, Moon, Sun, Menu, X } from 'lucide-react';

// ===== THEME CONTEXT =====
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({
  children
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);
  return <ThemeContext.Provider value={{
    darkMode,
    toggleTheme
  }}>
      <div className={darkMode ? 'dark' : ''}>
        {window.__textTrack.var(children, "src/App.tsx_expr_0", "src/App.tsx", 17)}
      </div>
    </ThemeContext.Provider>;
};

// ===== AUTH CONTEXT =====
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState({
    role: 'admin',
    name: 'Admin User'
  });
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{
    user,
    logout
  }}>
      {window.__textTrack.var(children, "src/App.tsx_expr_1", "src/App.tsx", 37)}
    </AuthContext.Provider>;
};

// ===== COMPONENTS =====

// LoginPage.tsx
const LoginPage = ({
  onLogin
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onLogin({
      role: 'admin',
      name: 'Admin User'
    });
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white text-black" data-editor-uid="88bf33f3-dee6-4d8b-a7d9-1491f4963899" data-editor-name="h2" data-component-path="src/App.tsx" data-component-line="68" data-static="true" data-editor-content="%7B%22text%22%3A%22Admin%20Login%22%2C%22className%22%3A%22text-2xl%20font-bold%20mb-6%20text-center%20dark%3Atext-white%22%7D">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" required />
          </div>
          <div className="mb-6">
            <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors" data-editor-uid="25bf027b-819a-41e1-8bc5-8a5cb9e820f4" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="86" data-static="true" data-editor-content="%7B%22text%22%3A%22Sign%20In%22%2C%22className%22%3A%22w-full%20bg-blue-600%20hover%3Abg-blue-700%20text-white%20py-3%20rounded-lg%20font-medium%20transition-colors%22%7D">
            Sign In
          </button>
        </form>
      </div>
    </div>;
};

// SettingsModal.tsx
const SettingsModal = ({
  isOpen,
  onClose
}) => {
  const {
    darkMode,
    toggleTheme
  } = useTheme();
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold dark:text-white" data-editor-uid="a139b10f-3055-4ea7-89db-a4a705ad18af" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="108" data-static="true" data-editor-content="%7B%22text%22%3A%22Settings%22%2C%22className%22%3A%22text-xl%20font-bold%20dark%3Atext-white%22%7D">Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="dark:text-white" data-editor-uid="25997c57-4a6d-48aa-8b12-e3077697740f" data-editor-name="span" data-component-path="src/App.tsx" data-component-line="116" data-static="true" data-editor-content="%7B%22text%22%3A%22Dark%20Mode%22%2C%22className%22%3A%22dark%3Atext-white%22%7D">Dark Mode</span>
            <button onClick={toggleTheme} className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>;
};

// ShareModal.tsx
const ShareModal = ({
  isOpen,
  onClose,
  url
}) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold dark:text-white" data-editor-uid="55fb266a-f6a8-4909-a121-4c8707403c37" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="142" data-static="true" data-editor-content="%7B%22text%22%3A%22Share%20Post%22%2C%22className%22%3A%22text-xl%20font-bold%20dark%3Atext-white%22%7D">Share Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <input type="text" value={url} readOnly className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white" />
        </div>
        <button onClick={handleCopy} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2" data-editor-uid="9a897d90-5b56-415f-9e3b-88072500b10b" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="156" data-static="true" data-editor-content="%7B%22text%22%3A%22Copy%20Link%22%2C%22className%22%3A%22w-full%20bg-blue-600%20hover%3Abg-blue-700%20text-white%20py-2%20rounded-lg%20flex%20items-center%20justify-center%20gap-2%22%7D">
          <Share2 className="w-4 h-4" /> Copy Link
        </button>
      </div>
    </div>;
};

// PostEditModal.tsx
const PostEditModal = ({
  isOpen,
  onClose,
  post,
  onSave
}) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      id: post?.id,
      title,
      content
    });
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold dark:text-white">{post ? 'Edit Post' : 'Create Post'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" required />
          </div>
          <div className="mb-6">
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Post content" rows="6" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" required />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium" data-editor-uid="fcee9f45-4a2f-4368-aaba-641bf9a03756" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="212" data-static="true" data-editor-content="%7B%22text%22%3A%22Save%20Post%22%2C%22className%22%3A%22bg-blue-600%20hover%3Abg-blue-700%20text-white%20py-2%20px-4%20rounded-lg%20font-medium%22%7D">
              Save Post
            </button>
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white" data-editor-uid="b044cd06-d5df-4cec-abcb-5bf38c749d40" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="218" data-static="true" data-editor-content="%7B%22text%22%3A%22Cancel%22%2C%22className%22%3A%22bg-gray-200%20hover%3Abg-gray-300%20text-gray-800%20py-2%20px-4%20rounded-lg%20font-medium%20dark%3Abg-gray-700%20dark%3Ahover%3Abg-gray-600%20dark%3Atext-white%22%7D">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>;
};

// ImageUpload.tsx
const ImageUpload = ({
  onUpload
}) => {
  return <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-4" data-editor-uid="0f5f41a4-0321-4248-b22e-74bb7343f0aa" data-editor-name="p" data-component-path="src/App.tsx" data-component-line="237" data-static="true" data-editor-content="%7B%22text%22%3A%22Drag%20%26%20drop%20image%20or%20click%20to%20upload%22%2C%22className%22%3A%22text-gray-600%20dark%3Atext-gray-400%20mb-4%22%7D">Drag & drop image or click to upload</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg" data-editor-uid="c81ddf9a-ef24-4df2-a56d-2c9a8d734743" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="238" data-static="true" data-editor-content="%7B%22text%22%3A%22Choose%20File%22%2C%22className%22%3A%22bg-blue-600%20hover%3Abg-blue-700%20text-white%20py-2%20px-4%20rounded-lg%22%7D">
        Choose File
      </button>
    </div>;
};

// EmojiReactions.tsx
const EmojiReactions = () => {
  const reactions = [{
    emoji: '👍',
    count: 12
  }, {
    emoji: '❤️',
    count: 8
  }, {
    emoji: '😂',
    count: 3
  }, {
    emoji: '😮',
    count: 5
  }];
  return <div className="flex gap-2 mb-4">
      {reactions.map((reaction, index) => <button key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <span>{reaction.emoji}</span>
          <span className="text-sm">{reaction.count}</span>
        </button>)}
    </div>;
};

// CommentSection.tsx
const CommentSection = () => {
  const [comments, setComments] = useState([{
    id: 1,
    author: 'John Doe',
    content: 'Great post!',
    time: '2 hours ago'
  }, {
    id: 2,
    author: 'Jane Smith',
    content: 'Thanks for sharing this!',
    time: '1 hour ago'
  }]);
  const [newComment, setNewComment] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        author: 'You',
        content: newComment,
        time: 'Just now'
      }]);
      setNewComment('');
    }
  };
  return <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." rows="3" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
        <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg" data-editor-uid="1bb31cd2-02a9-4bf5-8302-e46dd36939e0" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="302" data-static="true" data-editor-content="%7B%22text%22%3A%22Post%20Comment%22%2C%22className%22%3A%22mt-2%20bg-blue-600%20hover%3Abg-blue-700%20text-white%20py-2%20px-4%20rounded-lg%22%7D">
          Post Comment
        </button>
      </form>
      
      <div className="space-y-4">
        {comments.map(comment => <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium dark:text-white">{comment.author}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</span>
            </div>
            <p className="dark:text-gray-300">{comment.content}</p>
          </div>)}
      </div>
    </div>;
};

// BlogPost.tsx
const BlogPost = ({
  post
}) => {
  const [showShare, setShowShare] = useState(false);
  return <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3 dark:text-white">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
        
        <EmojiReactions />
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" data-editor-uid="61c2a227-ba12-4984-91b8-2d21340fa5d2" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="338" data-static="true" data-editor-content="%7B%22text%22%3A%22Comment%22%2C%22className%22%3A%22flex%20items-center%20gap-2%20text-gray-600%20hover%3Atext-blue-600%20dark%3Atext-gray-400%20dark%3Ahover%3Atext-blue-400%22%7D">
            <MessageCircle className="w-4 h-4" /> Comment
          </button>
          <button onClick={() => setShowShare(true)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" data-editor-uid="b043100a-2a25-4c0a-9dee-935730ff12ab" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="341" data-static="true" data-editor-content="%7B%22text%22%3A%22Share%22%2C%22className%22%3A%22flex%20items-center%20gap-2%20text-gray-600%20hover%3Atext-blue-600%20dark%3Atext-gray-400%20dark%3Ahover%3Atext-blue-400%22%7D">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
      
      <CommentSection />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} url={window.location.href} />
    </article>;
};

// BlogHeader.tsx
const BlogHeader = ({
  onNewPost,
  onSettings
}) => {
  const {
    user
  } = useAuth();
  return <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold dark:text-white" data-editor-uid="7dc05082-0f43-4708-a729-22d3b12b4c37" data-editor-name="h1" data-component-path="src/App.tsx" data-component-line="370" data-static="true" data-editor-content="%7B%22text%22%3A%22SecureBlog%20Admin%22%2C%22className%22%3A%22text-xl%20font-bold%20dark%3Atext-white%22%7D">SecureBlog Admin</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onNewPost} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" data-editor-uid="dc8556b3-97da-49a8-9bb2-d09ef50eb7bb" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="374" data-static="true" data-editor-content="%7B%22text%22%3A%22New%20Post%22%2C%22className%22%3A%22flex%20items-center%20gap-2%20bg-blue-600%20hover%3Abg-blue-700%20text-white%20px-4%20py-2%20rounded-lg%22%7D">
              <Edit3 className="w-4 h-4" /> New Post
            </button>
            <button onClick={onSettings} className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.[0]}
              </div>
              <span className="hidden sm:inline dark:text-white">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>;
};

// BlogEditor.tsx
const BlogEditor = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white" data-editor-uid="065355a4-7877-4d68-9819-8b80d89e1dc8" data-editor-name="h2" data-component-path="src/App.tsx" data-component-line="403" data-static="true" data-editor-content="%7B%22text%22%3A%22Create%20New%20Post%22%2C%22className%22%3A%22text-xl%20font-bold%20mb-4%20dark%3Atext-white%22%7D">Create New Post</h2>
      <ImageUpload />
      <div className="mt-4">
        <input type="text" placeholder="Title" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 dark:text-white" />
        <textarea placeholder="Content" rows="8" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white" data-editor-uid="90196de2-9525-4152-a7e9-1e806c5a5986" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="417" data-static="true" data-editor-content="%7B%22text%22%3A%22Cancel%22%2C%22className%22%3A%22px-4%20py-2%20bg-gray-200%20hover%3Abg-gray-300%20text-gray-800%20rounded-lg%20dark%3Abg-gray-700%20dark%3Ahover%3Abg-gray-600%20dark%3Atext-white%22%7D">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg" data-editor-uid="c224f85c-430d-4d4d-b442-bf5bb8bca0a4" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="420" data-static="true" data-editor-content="%7B%22text%22%3A%22Publish%22%2C%22className%22%3A%22px-4%20py-2%20bg-blue-600%20hover%3Abg-blue-700%20text-white%20rounded-lg%22%7D">
            Publish
          </button>
        </div>
      </div>
    </div>;
};

// DragDropContainer.tsx
const DragDropContainer = ({
  children
}) => {
  return <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-700/50">
      {window.__textTrack.var(children, "src/App.tsx_expr_34", "src/App.tsx", 351)}
    </div>;
};

// RewardSystem.tsx
const RewardSystem = () => {
  return <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-3">
        <Star className="w-8 h-8" />
        <h3 className="text-xl font-bold" data-editor-uid="2566085d-76e1-4040-928e-5a545e39bad0" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="444" data-static="true" data-editor-content="%7B%22text%22%3A%22Reward%20Points%22%2C%22className%22%3A%22text-xl%20font-bold%22%7D">Reward Points</h3>
      </div>
      <p className="mb-4" data-editor-uid="1dbe085e-e9ad-44e8-a703-3c4e8395879a" data-editor-name="p" data-component-path="src/App.tsx" data-component-line="446" data-static="true" data-editor-content="%7B%22text%22%3A%22You%20have%201%2C250%20points!%20Redeem%20for%20premium%20features.%22%2C%22className%22%3A%22mb-4%22%7D">You have 1,250 points! Redeem for premium features.</p>
      <button className="bg-white text-orange-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg" data-editor-uid="2c162a15-13cc-4d92-97d3-545c1f74da4d" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="447" data-static="true" data-editor-content="%7B%22text%22%3A%22View%20Rewards%22%2C%22className%22%3A%22bg-white%20text-orange-600%20hover%3Abg-gray-100%20font-medium%20py-2%20px-4%20rounded-lg%22%7D">
        View Rewards
      </button>
    </div>;
};
// ContentModeration.tsx
const ContentModeration = () => {
  const reports = [{
    id: 1,
    type: 'Spam',
    content: 'Promotional post detected',
    status: 'Pending'
  }, {
    id: 2,
    type: 'Inappropriate',
    content: 'Offensive language reported',
    status: 'Resolved'
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white" data-editor-uid="ce1894a2-4e30-45f8-ac4b-7d2d943fc8b8" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="462" data-static="true" data-editor-content="%7B%22text%22%3A%22Content%20Moderation%22%2C%22className%22%3A%22text-lg%20font-semibold%20mb-4%20dark%3Atext-white%22%7D">Content Moderation</h3>
      <div className="space-y-3">
        {reports.map(report => <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium dark:text-white">{report.type}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{report.content}</div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'}`}>
              {report.status}
            </span>
          </div>)}
      </div>
    </div>;
};
// UserManagement.tsx
const UserManagement = () => {
  const users = [{
    id: 1,
    name: 'John Doe',
    role: 'Editor',
    status: 'Active'
  }, {
    id: 2,
    name: 'Jane Smith',
    role: 'Author',
    status: 'Active'
  }, {
    id: 3,
    name: 'Bob Johnson',
    role: 'Viewer',
    status: 'Inactive'
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold dark:text-white" data-editor-uid="af380d5e-4d5d-4835-80eb-2c2f0ae6ff3d" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="494" data-static="true" data-editor-content="%7B%22text%22%3A%22User%20Management%22%2C%22className%22%3A%22text-lg%20font-semibold%20dark%3Atext-white%22%7D">User Management</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm" data-editor-uid="b47effcf-ef94-4b4c-ade1-1aae91dbf365" data-editor-name="button" data-component-path="src/App.tsx" data-component-line="495" data-static="true" data-editor-content="%7B%22text%22%3A%22Add%20User%22%2C%22className%22%3A%22bg-blue-600%20hover%3Abg-blue-700%20text-white%20px-3%20py-1%20rounded-lg%20text-sm%22%7D">
          Add User
        </button>
      </div>
      <div className="space-y-3">
        {users.map(user => <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium dark:text-white">{user.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{user.role}</div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}`}>
              {user.status}
            </span>
          </div>)}
      </div>
    </div>;
};

// SystemAnalytics.tsx
const SystemAnalytics = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white" data-editor-uid="9183f716-fcc3-474c-97e7-56a53b99bfde" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="524" data-static="true" data-editor-content="%7B%22text%22%3A%22System%20Analytics%22%2C%22className%22%3A%22text-lg%20font-semibold%20mb-4%20dark%3Atext-white%22%7D">System Analytics</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-editor-uid="a212a09f-2b79-4c0f-8f6c-3a31c73cd1c3" data-editor-name="div" data-component-path="src/App.tsx" data-component-line="527" data-static="true" data-editor-content="%7B%22text%22%3A%221%2C247%22%2C%22className%22%3A%22text-2xl%20font-bold%20text-blue-600%20dark%3Atext-blue-400%22%7D">1,247</div>
          <div className="text-sm text-gray-600 dark:text-gray-400" data-editor-uid="6b8ca7e0-8aa9-4ad2-95db-91b0ad9d4677" data-editor-name="div" data-component-path="src/App.tsx" data-component-line="528" data-static="true" data-editor-content="%7B%22text%22%3A%22Total%20Posts%22%2C%22className%22%3A%22text-sm%20text-gray-600%20dark%3Atext-gray-400%22%7D">Total Posts</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-editor-uid="d8e61c44-0ae5-4870-832a-d03fe41c2651" data-editor-name="div" data-component-path="src/App.tsx" data-component-line="531" data-static="true" data-editor-content="%7B%22text%22%3A%22892%22%2C%22className%22%3A%22text-2xl%20font-bold%20text-green-600%20dark%3Atext-green-400%22%7D">892</div>
          <div className="text-sm text-gray-600 dark:text-gray-400" data-editor-uid="da4b9f68-8bf8-4aa6-892b-6c7c8f88f729" data-editor-name="div" data-component-path="src/App.tsx" data-component-line="532" data-static="true" data-editor-content="%7B%22text%22%3A%22Active%20Users%22%2C%22className%22%3A%22text-sm%20text-gray-600%20dark%3Atext-gray-400%22%7D">Active Users</div>
        </div>
      </div>
      <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <BarChart3 className="w-8 h-8 text-gray-400" />
      </div>
    </div>;
};

// AdminPanel.tsx
const AdminPanel = () => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SystemAnalytics />
      <ContentModeration />
      <UserManagement />
      <RewardSystem />
    </div>;
};

// BlogApp.tsx
const BlogApp = () => {
  const [posts] = useState([{
    id: 1,
    title: 'Security Best Practices',
    content: 'Learn essential security practices for modern applications...'
  }, {
    id: 2,
    title: 'AI Integration Guide',
    content: 'How to effectively integrate AI assistants into your workflow...'
  }]);
  return <div className="space-y-6">
      {posts.map(post => <BlogPost key={post.id} post={post} />)}
    </div>;
};

// AppLayout.tsx
const AppLayout = ({
  children,
  showEditor = false,
  onNewPost,
  onSettings
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navItems = [{
    name: 'Dashboard',
    icon: Shield
  }, {
    name: 'Blog',
    icon: Edit3
  }, {
    name: 'Analytics',
    icon: BarChart3
  }, {
    name: 'Users',
    icon: Users
  }, {
    name: 'Moderation',
    icon: Eye
  }];
  return <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <BlogHeader onNewPost={onNewPost} onSettings={onSettings} />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white dark:bg-gray-800 shadow-lg w-64 min-h-screen fixed lg:relative z-40 transition-transform duration-300 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4">
            <nav className="space-y-2">
              {navItems.map((item, index) => <a key={index} href="#" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>)}
            </nav>
            
            <div className="absolute bottom-4 left-4 right-4">
              <button onClick={logout} className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span data-editor-uid="793efa05-2466-4539-99e5-d5ed6e534a0c" data-editor-name="span" data-component-path="src/App.tsx" data-component-line="612" data-static="true" data-editor-content="%7B%22text%22%3A%22Logout%22%2C%22className%22%3A%22%22%7D">Logout</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Mobile Menu Overlay */}
        {showMobileMenu && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setShowMobileMenu(false)}></div>}
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {showEditor ? <BlogEditor /> : children}
          </div>
        </main>
        
        {/* Qwen Chat Sidebar */}
        <div className="hidden xl:block w-96 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold dark:text-white" data-editor-uid="6d9949b1-70e6-4f52-af2c-4c834090183e" data-editor-name="h3" data-component-path="src/App.tsx" data-component-line="636" data-static="true" data-editor-content="%7B%22text%22%3A%22AI%20Assistant%22%2C%22className%22%3A%22font-semibold%20dark%3Atext-white%22%7D">AI Assistant</h3>
          </div>
          <div className="h-full">
            <iframe src="https://chat.qwen.ai/s/deploy/16321bfe-9a72-4c2a-b7fd-4972938bbf81" width="100%" height="calc(100vh - 4rem)" frameBorder="0" title="Qwen AI Assistant" className="border-0" />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <button onClick={() => setShowMobileMenu(true)} className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50">
        <Menu className="w-6 h-6" />
      </button>
    </div>;
};

// ===== MAIN APP =====
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const handleLogin = user => {
    setAuthenticated(true);
  };
  const handleNewPost = () => {
    setEditingPost(null);
    setShowPostModal(true);
  };
  const handleSavePost = post => {
    console.log('Saving post:', post);
    setShowPostModal(false);
  };
  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }
  return <ThemeProvider>
      <AuthProvider>
        <AppLayout showEditor={showEditor} onNewPost={handleNewPost} onSettings={() => setShowSettings(true)}>
          <AdminPanel />
          <BlogApp />
        </AppLayout>
        
        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
        
        <PostEditModal isOpen={showPostModal} onClose={() => setShowPostModal(false)} post={editingPost} onSave={handleSavePost} />
      </AuthProvider>
    </ThemeProvider>;
};
export default App;
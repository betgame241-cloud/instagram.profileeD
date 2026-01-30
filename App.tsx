
import React, { useState, useEffect, useCallback } from 'react';
import { ProfileData, Post, Story } from './types';
import ProfileHeader from './components/ProfileHeader';
import StoryBar from './components/StoryBar';
import PostGrid from './components/PostGrid';
import EditProfileModal from './components/EditProfileModal';
import CreatePostModal from './components/CreatePostModal';
import CreateStoryModal from './components/CreateStoryModal';
import { Camera, PlusSquare, Moon, Sun, Grid, Bookmark, UserSquare, CheckCircle2 } from 'lucide-react';

type TabType = 'posts' | 'saved' | 'tagged';
type ViewMode = 'personal' | 'public';

const INITIAL_PROFILE: ProfileData = {
  username: 'creative_mind',
  name: 'Alex Rivera',
  bio: 'Digital Creator | Explorer 📍\nBuilding beautiful experiences with code and design.\n✨ Open to collaborations!',
  avatar: 'https://picsum.photos/seed/alex/300/300',
  postsCount: 9,
  followersCount: 1250,
  followingCount: 450
};

const generateMockPosts = (seed: string, count: number): Post[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    url: `https://picsum.photos/seed/${seed}${i}/600/600`,
    caption: `Publicación ${i + 1}`,
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 50)
  }));
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('personal');
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [posts, setPosts] = useState<Post[]>(generateMockPosts('post', 9));
  const [savedPosts] = useState<Post[]>(generateMockPosts('save', 9));
  const [taggedPosts] = useState<Post[]>(generateMockPosts('tag', 9));

  const [stories, setStories] = useState<Story[]>([
    { id: 's1', url: 'https://picsum.photos/seed/s1/150/150', link: 'https://google.com' },
    { id: 's2', url: 'https://picsum.photos/seed/s2/150/150', link: 'https://github.com' },
  ]);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

  // Detect public view from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'public') {
      setViewMode('public');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleUpdateProfile = (newData: ProfileData) => {
    setProfile(newData);
    setIsEditProfileOpen(false);
  };

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setProfile(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
    setIsCreatePostOpen(false);
  };

  const handleAddStory = (newStory: Story) => {
    // New stories are added to the beginning so they appear first in the bar
    setStories([newStory, ...stories]);
    setIsCreateStoryOpen(false);
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'personal' ? 'public' : 'personal';
    setViewMode(newMode);
    // Secret toast feedback
    setToastMessage(`Modo ${newMode === 'personal' ? 'Personal' : 'Público'} activado`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleShareProfile = useCallback(() => {
    const publicUrl = `${window.location.origin}/?view=public`;
    navigator.clipboard.writeText(publicUrl).then(() => {
      setToastMessage('Enlace de perfil público copiado');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  }, []);

  const getCurrentPosts = () => {
    switch (activeTab) {
      case 'saved': return savedPosts;
      case 'tagged': return taggedPosts;
      default: return posts;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black text-white' : 'bg-[#fafafa] text-black'} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 h-16 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Secret toggle on clicking the logo */}
            <h1 
              onClick={toggleViewMode}
              className="text-3xl font-brand pt-2 tracking-wide cursor-pointer select-none active:scale-95 transition-transform"
            >
              Instagram
            </h1>
          </div>
          
          <div className="flex items-center gap-5">
            {/* Moon icon hidden in Public Mode */}
            {viewMode === 'personal' && (
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:scale-110 transition-transform p-1">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
              </button>
            )}

            {viewMode === 'personal' && (
              <>
                <button onClick={() => setIsCreatePostOpen(true)} className="hover:scale-110 transition-transform">
                  <PlusSquare className="w-6 h-6" />
                </button>
                <button onClick={() => setIsCreateStoryOpen(true)} className="hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={profile.avatar} alt="Me" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader 
          profile={profile} 
          viewMode={viewMode}
          onEditClick={() => setIsEditProfileOpen(true)} 
          onShareClick={handleShareProfile}
          onAvatarChange={(newUrl) => setProfile(prev => ({ ...prev, avatar: newUrl }))}
        />

        <div className="mb-8">
          <StoryBar 
            stories={stories} 
            viewMode={viewMode}
            onAddStory={() => setIsCreateStoryOpen(true)} 
          />
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-800 flex justify-center gap-12">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-1 py-4 border-t -mt-[1px] text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'posts' 
                ? 'border-black dark:border-white text-black dark:text-white' 
                : 'border-transparent text-gray-400'
            }`}
          >
            <Grid className="w-3 h-3" /> Publicaciones
          </button>
          
          {viewMode === 'personal' && (
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1 py-4 border-t -mt-[1px] text-xs font-semibold tracking-widest uppercase transition-all ${
                activeTab === 'saved' 
                  ? 'border-black dark:border-white text-black dark:text-white' 
                  : 'border-transparent text-gray-400'
              }`}
            >
              <Bookmark className="w-3 h-3" /> Guardado
            </button>
          )}

          <button 
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center gap-1 py-4 border-t -mt-[1px] text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'tagged' 
                ? 'border-black dark:border-white text-black dark:text-white' 
                : 'border-transparent text-gray-400'
            }`}
          >
            <UserSquare className="w-3 h-3" /> Etiquetadas
          </button>
        </div>

        {/* Posts Grid */}
        <PostGrid posts={getCurrentPosts()} />
      </main>

      {/* Modals - Only accessible in personal mode */}
      {viewMode === 'personal' && isEditProfileOpen && (
        <EditProfileModal 
          profile={profile} 
          onClose={() => setIsEditProfileOpen(false)} 
          onSave={handleUpdateProfile} 
        />
      )}

      {viewMode === 'personal' && isCreatePostOpen && (
        <CreatePostModal 
          onClose={() => setIsCreatePostOpen(false)} 
          onSave={handleAddPost} 
        />
      )}

      {viewMode === 'personal' && isCreateStoryOpen && (
        <CreateStoryModal 
          onClose={() => setIsCreateStoryOpen(false)} 
          onSave={handleAddStory} 
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
};

export default App;
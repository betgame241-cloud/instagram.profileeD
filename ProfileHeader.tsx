
import React, { useRef } from 'react';
import { ProfileData } from '../types';
import { Camera, UserPlus, ChevronDown } from 'lucide-react';

interface Props {
  profile: ProfileData;
  viewMode: 'personal' | 'public';
  onEditClick: () => void;
  onShareClick: () => void;
  onAvatarChange: (url: string) => void;
}

const ProfileHeader: React.FC<Props> = ({ profile, viewMode, onEditClick, onShareClick, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (viewMode === 'personal') {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAvatarChange(url);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-20 items-center md:items-start mb-10 px-4 md:px-0">
      {/* Avatar Container */}
      <div 
        className={`relative group flex-shrink-0 ${viewMode === 'personal' ? 'cursor-pointer' : 'cursor-default'}`} 
        onClick={handleAvatarClick}
      >
        <div className="w-[77px] h-[77px] md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src={profile.avatar} 
              alt={profile.username} 
              className={`w-full h-full object-cover transition-all ${viewMode === 'personal' ? 'group-hover:brightness-75' : ''}`}
            />
          </div>
        </div>
        {viewMode === 'personal' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-6 h-6 md:w-8 md:h-8" />
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
        />
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col gap-4 w-full">
        {/* Row 1: Username Only (Removed Settings) */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <h2 className="text-xl font-normal dark:text-white">{profile.username}</h2>
        </div>

        {/* Row 2: Buttons (Personal vs Public) */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {viewMode === 'personal' ? (
            <>
              <button 
                onClick={onEditClick}
                className="flex-1 md:flex-none px-4 py-1.5 bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] text-sm font-semibold rounded-lg transition-colors dark:text-white"
              >
                Editar perfil
              </button>
              <button 
                onClick={onShareClick}
                className="flex-1 md:flex-none px-4 py-1.5 bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] text-sm font-semibold rounded-lg transition-colors dark:text-white"
              >
                Compartir perfil
              </button>
              <button 
                className="px-2 py-1.5 bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] rounded-lg transition-colors dark:text-white"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 md:flex-none px-6 py-1.5 bg-[#0095f6] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors">
                Seguir
              </button>
              <button className="flex-1 md:flex-none px-6 py-1.5 bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] text-sm font-semibold rounded-lg transition-colors dark:text-white">
                Mensaje
              </button>
              <button className="px-2 py-1.5 bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] rounded-lg transition-colors dark:text-white">
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Row 3: Stats (Desktop) */}
        <div className="hidden md:flex justify-start gap-10">
          <div className="flex gap-1">
            <span className="font-semibold">{profile.postsCount}</span>
            <span className="text-gray-600 dark:text-gray-400">publicaciones</span>
          </div>
          <div className="flex gap-1 cursor-pointer">
            <span className="font-semibold">{profile.followersCount}</span>
            <span className="text-gray-600 dark:text-gray-400">seguidores</span>
          </div>
          <div className="flex gap-1 cursor-pointer">
            <span className="font-semibold">{profile.followingCount}</span>
            <span className="text-gray-600 dark:text-gray-400">seguidos</span>
          </div>
        </div>

        {/* Row 4: Name & Bio */}
        <div className="text-left">
          <h1 className="font-semibold text-sm dark:text-white">{profile.name}</h1>
          <p className="text-sm whitespace-pre-line text-gray-800 dark:text-gray-300 mt-0.5">{profile.bio}</p>
        </div>

        {/* Mobile Stats */}
        <div className="flex md:hidden justify-around border-t border-gray-200 dark:border-gray-800 pt-4 mt-2">
           <div className="flex flex-col items-center">
            <span className="font-semibold dark:text-white">{profile.postsCount}</span>
            <span className="text-gray-400 text-xs">publicaciones</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold dark:text-white">{profile.followersCount}</span>
            <span className="text-gray-400 text-xs">seguidores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold dark:text-white">{profile.followingCount}</span>
            <span className="text-gray-400 text-xs">seguidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

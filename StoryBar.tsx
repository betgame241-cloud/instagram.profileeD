
import React from 'react';
import { Story } from '../types';
import { Plus } from 'lucide-react';

interface Props {
  stories: Story[];
  viewMode: 'personal' | 'public';
  onAddStory: () => void;
}

const StoryBar: React.FC<Props> = ({ stories, viewMode, onAddStory }) => {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
      {/* Add Story Button - Only show in personal mode */}
      {viewMode === 'personal' && (
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer" onClick={onAddStory}>
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 dark:border-gray-800 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-[#121212] flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Añadir</span>
        </div>
      )}

      {/* Rendered Stories - Always visible */}
      {stories.map(story => (
        <div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
          <a href={story.link} target="_blank" rel="noopener noreferrer" className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden">
                <img src={story.url} alt="Story" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </a>
          <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate w-16 text-center">Historias</span>
        </div>
      ))}
    </div>
  );
};

export default StoryBar;

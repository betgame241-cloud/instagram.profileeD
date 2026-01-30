
import React from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Grid } from 'lucide-react';

interface Props {
  posts: Post[];
}

const PostGrid: React.FC<Props> = ({ posts }) => {
  // We ensure there are at least 9 spots to visualize the 3x3 layout if requested, 
  // although our data generation now handles this.
  
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600">
        <div className="w-16 h-16 border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center mb-4">
          <Grid className="w-8 h-8" />
        </div>
        <p className="text-xl font-bold">No hay contenido aún</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-8 mt-1">
      {posts.map((post, index) => (
        <div key={post.id || index} className="relative aspect-square group cursor-pointer bg-gray-200 dark:bg-[#121212] overflow-hidden">
          <img 
            src={post.url} 
            alt={post.caption} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 md:gap-8 text-white font-bold">
            <div className="flex items-center gap-1 md:gap-2">
              <Heart className="fill-white w-4 h-4 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <MessageCircle className="fill-white w-4 h-4 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;

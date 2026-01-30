
import React, { useState, useRef } from 'react';
import { Post } from '../types';
import { X, Image as ImageIcon } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (post: Post) => void;
}

const CreatePostModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCreate = () => {
    if (!previewUrl) return;
    const newPost: Post = {
      id: Math.random().toString(36).substring(7),
      url: previewUrl,
      caption: caption,
      likes: 0,
      comments: 0
    };
    onSave(newPost);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#262626] w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <button onClick={onClose} className="p-1 dark:text-white"><X className="w-5 h-5" /></button>
          <h2 className="font-semibold dark:text-white">Nueva publicación</h2>
          <button 
            onClick={handleCreate}
            disabled={!previewUrl}
            className={`font-semibold text-sm transition-colors ${previewUrl ? 'text-[#0095f6] hover:text-blue-700' : 'text-gray-300'}`}
          >
            Compartir
          </button>
        </div>

        <div className="p-0">
          {!previewUrl ? (
            <div 
              className="aspect-square bg-gray-50 dark:bg-black flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#121212] transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Seleccionar de la galería</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="aspect-square w-full bg-black flex items-center justify-center">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-4 border-t dark:border-gray-800">
                <textarea 
                  placeholder="Escribe un pie de foto..."
                  className="w-full resize-none border-none focus:ring-0 text-sm h-24 bg-transparent dark:text-white"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

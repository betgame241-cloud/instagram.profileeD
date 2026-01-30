
import React, { useState, useRef } from 'react';
import { Story } from '../types';
import { X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (story: Story) => void;
}

const CreateStoryModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [externalLink, setExternalLink] = useState('');
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
    const newStory: Story = {
      id: Math.random().toString(36).substring(7),
      url: previewUrl,
      link: externalLink || undefined
    };
    onSave(newStory);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#262626] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <button onClick={onClose} className="p-1 dark:text-white"><X className="w-5 h-5" /></button>
          <h2 className="font-semibold dark:text-white">Añadir a historia</h2>
          <button 
            onClick={handleCreate}
            disabled={!previewUrl}
            className={`font-semibold text-sm ${previewUrl ? 'text-[#0095f6]' : 'text-gray-300'}`}
          >
            Subir
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-6">
          <div 
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gray-50 dark:bg-black border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 group relative overflow-hidden transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-2">Imagen de Galería</span>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
              <LinkIcon className="w-3 h-3" />
              <span className="text-xs font-semibold uppercase tracking-wider">Enlace Externo (Opcional)</span>
            </div>
            <input 
              type="url" 
              placeholder="https://tu-sitio.com"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all dark:text-white"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center px-4 leading-relaxed">
            Sube una foto y añade un enlace. Los usuarios verán el enlace al abrir tu historia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;

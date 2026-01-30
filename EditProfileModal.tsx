
import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X } from 'lucide-react';

interface Props {
  profile: ProfileData;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
}

const EditProfileModal: React.FC<Props> = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState<ProfileData>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#262626] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-[#363636] rounded-full">
            <X className="w-5 h-5 dark:text-white" />
          </button>
          <h2 className="font-semibold text-base dark:text-white">Editar perfil</h2>
          <button 
            form="edit-form" 
            className="text-[#0095f6] font-semibold text-sm hover:text-blue-700 transition-colors"
          >
            Listo
          </button>
        </div>

        <form id="edit-form" onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Nombre de usuario</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-gray-400 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Nombre</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-gray-400 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Presentación (Bio)</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-gray-400 resize-none dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Publicaciones</label>
              <input 
                type="number" 
                value={formData.postsCount}
                onChange={(e) => setFormData({ ...formData, postsCount: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md text-sm dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Seguidores</label>
              <input 
                type="number" 
                value={formData.followersCount}
                onChange={(e) => setFormData({ ...formData, followersCount: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md text-sm dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Seguidos</label>
              <input 
                type="number" 
                value={formData.followingCount}
                onChange={(e) => setFormData({ ...formData, followingCount: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md text-sm dark:text-white"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

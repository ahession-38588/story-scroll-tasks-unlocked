
import React, { useState } from 'react';
import { Plus, Scroll } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-cinzel font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Quest</span>
          <Scroll className="w-5 h-5" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Scroll className="w-6 h-6 text-amber-700" />
            <h3 className="font-cinzel font-bold text-xl text-amber-900">Create New Quest</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-crimson font-semibold text-amber-800 mb-2">
                Quest Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none bg-white/80 font-crimson"
                placeholder="Enter your quest title..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block font-crimson font-semibold text-amber-800 mb-2">
                Quest Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none bg-white/80 font-crimson resize-none"
                rows={3}
                placeholder="Describe your quest..."
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-cinzel font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Create Quest
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-cinzel font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;

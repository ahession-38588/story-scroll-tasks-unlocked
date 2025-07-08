
import React from 'react';
import { Book, Sparkles } from 'lucide-react';

interface StoryProgressProps {
  completedTasks: number;
  totalTasks: number;
}

const StoryProgress: React.FC<StoryProgressProps> = ({ completedTasks, totalTasks }) => {
  const progress = (completedTasks / totalTasks) * 100;
  
  const getStoryTitle = () => {
    if (completedTasks === 0) return "The Quest Begins...";
    if (completedTasks <= 2) return "Chapter I: The Awakening";
    if (completedTasks <= 4) return "Chapter II: The Journey";
    if (completedTasks <= 6) return "Chapter III: Trials of Wisdom";
    return "Chapter IV: The Enchanted Realm";
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Book className="w-6 h-6 text-purple-700" />
        <h2 className="font-cinzel font-bold text-xl text-purple-900">
          {getStoryTitle()}
        </h2>
        <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm font-crimson text-purple-700 mb-2">
          <span>Story Progress</span>
          <span>{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {completedTasks === totalTasks && (
        <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border border-emerald-300 animate-fade-in">
          <p className="font-cinzel font-bold text-emerald-800 text-lg mb-2">
            🎉 Quest Complete! 🎉
          </p>
          <p className="font-crimson italic text-emerald-700">
            You have unlocked the full story of the Enchanted Realm. Your journey through productivity has revealed the magic within!
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryProgress;

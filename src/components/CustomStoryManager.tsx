
import React, { useState, useEffect } from 'react';
import { Book, Sparkles, Upload } from 'lucide-react';

interface StorySegment {
  id: string;
  text: string;
  unlockOrder: number;
}

interface CustomStoryManagerProps {
  completedTasks: number;
  totalTasks: number;
}

const CustomStoryManager: React.FC<CustomStoryManagerProps> = ({ completedTasks, totalTasks }) => {
  const [customStory, setCustomStory] = useState<StorySegment[]>([]);
  const [unlockedSegments, setUnlockedSegments] = useState<StorySegment[]>([]);

  useEffect(() => {
    // Load custom story from localStorage
    const savedStory = localStorage.getItem('custom-story-data');
    if (savedStory) {
      try {
        const storyData = JSON.parse(savedStory);
        setCustomStory(storyData);
      } catch (error) {
        console.error('Failed to load custom story:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (customStory.length === 0) return;

    // Calculate how many segments to unlock based on completed tasks
    const segmentsToUnlock = Math.floor((completedTasks / totalTasks) * customStory.length);
    
    // Sort story segments by unlock order and take the first N segments
    const sortedSegments = [...customStory].sort((a, b) => a.unlockOrder - b.unlockOrder);
    const newUnlockedSegments = sortedSegments.slice(0, Math.max(1, segmentsToUnlock));
    
    setUnlockedSegments(newUnlockedSegments);
  }, [completedTasks, totalTasks, customStory]);

  const getStoryTitle = () => {
    if (customStory.length === 0) return "No Custom Story";
    if (completedTasks === 0) return "Your Story Begins...";
    
    const progress = (completedTasks / totalTasks) * 100;
    if (progress <= 25) return "Chapter I: The Opening";
    if (progress <= 50) return "Chapter II: The Journey";
    if (progress <= 75) return "Chapter III: The Trials";
    return "Chapter IV: The Conclusion";
  };

  if (customStory.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Upload className="w-6 h-6 text-amber-700" />
          <h2 className="font-cinzel font-bold text-xl text-amber-900">
            Custom Story
          </h2>
        </div>
        <p className="font-crimson text-amber-700">
          Upload your own story to see it unlock as you complete tasks!
        </p>
      </div>
    );
  }

  const progress = (unlockedSegments.length / customStory.length) * 100;

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
          <span>{unlockedSegments.length}/{customStory.length} segments unlocked</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {unlockedSegments.map((segment, index) => (
          <div 
            key={segment.id}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {segment.unlockOrder}
              </span>
              <p className="font-crimson text-emerald-800 leading-relaxed">
                ✨ {segment.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {unlockedSegments.length === customStory.length && (
        <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border border-emerald-300 animate-fade-in mt-4">
          <p className="font-cinzel font-bold text-emerald-800 text-lg mb-2">
            🎉 Story Complete! 🎉
          </p>
          <p className="font-crimson italic text-emerald-700">
            You have unlocked your entire custom adventure. Well done, brave storyteller!
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomStoryManager;

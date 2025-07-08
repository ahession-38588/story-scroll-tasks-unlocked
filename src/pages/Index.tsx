
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Castle, Sparkles, ArrowLeft, FileText } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import StoryProgress from '../components/StoryProgress';
import AddTaskForm from '../components/AddTaskForm';
import StoryUpload from '../components/StoryUpload';
import CustomStoryManager from '../components/CustomStoryManager';
import { useTasks } from '../hooks/useTasks';

const storyData = {
  'enchanted-forest': {
    title: 'The Enchanted Forest',
    subtitle: 'Journey through mystical woodlands',
    icon: '🌲'
  },
  'crystal-kingdom': {
    title: 'The Crystal Kingdom',
    subtitle: 'Discover shimmering crystal realms',
    icon: '👑'
  },
  'mystic-academy': {
    title: 'Mystic Academy',
    subtitle: 'Learn the ancient arts of magic',
    icon: '🪄'
  },
  'dragon-peaks': {
    title: 'Dragon Peaks',
    subtitle: 'Scale legendary mountains',
    icon: '🏰'
  }
};

const Index = () => {
  const { storyId } = useParams();
  const { tasks, toggleTask, addTask } = useTasks();
  const completedTasks = tasks.filter(task => task.completed).length;
  const [showCustomStory, setShowCustomStory] = useState(false);
  
  const currentStory = storyData[storyId as keyof typeof storyData] || storyData['enchanted-forest'];

  const handleStoryUploaded = () => {
    setShowCustomStory(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-crimson">Back to Realms</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-4xl">{currentStory.icon}</span>
            <h1 className="font-cinzel font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600">
              {currentStory.title}
            </h1>
            <Sparkles className="w-12 h-12 text-amber-700 animate-sparkle" />
          </div>
          <p className="font-crimson text-xl text-amber-700 leading-relaxed max-w-2xl mx-auto">
            {currentStory.subtitle}. Your productivity becomes the key to unlocking mystical realms and ancient wisdom.
          </p>
        </div>

        {/* Story Progress */}
        <div className="mb-8">
          <StoryProgress completedTasks={completedTasks} totalTasks={tasks.length} />
        </div>

        {/* Custom Story Upload & Display */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cinzel font-bold text-2xl text-amber-900 flex items-center space-x-2">
              <FileText className="w-6 h-6" />
              <span>Your Custom Story</span>
            </h2>
            <button
              onClick={() => setShowCustomStory(!showCustomStory)}
              className="font-crimson text-amber-700 hover:text-amber-800 transition-colors"
            >
              {showCustomStory ? 'Hide' : 'Show'} Custom Story
            </button>
          </div>
          
          {showCustomStory && (
            <div className="space-y-6">
              <StoryUpload onStoryUploaded={handleStoryUploaded} />
              <CustomStoryManager 
                completedTasks={completedTasks} 
                totalTasks={tasks.length} 
              />
            </div>
          )}
        </div>

        {/* Add Task Form */}
        <AddTaskForm onAddTask={addTask} />

        {/* Tasks Grid */}
        <div className="space-y-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-xl p-8 shadow-lg">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-pulse" />
                <h3 className="font-cinzel font-bold text-2xl text-purple-900 mb-3">
                  Your Quest Awaits
                </h3>
                <p className="font-crimson text-purple-700 text-lg">
                  Create your first quest to begin your magical journey through the enchanted realms of productivity.
                </p>
              </div>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="font-crimson italic text-amber-600 text-sm">
            ✨ May your tasks light the way to magical discoveries ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

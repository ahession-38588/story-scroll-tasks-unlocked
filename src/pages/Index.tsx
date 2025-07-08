
import React from 'react';
import { Castle, Sparkles } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import StoryProgress from '../components/StoryProgress';
import AddTaskForm from '../components/AddTaskForm';
import { useTasks } from '../hooks/useTasks';

const Index = () => {
  const { tasks, toggleTask, addTask } = useTasks();
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Castle className="w-12 h-12 text-amber-700" />
            <h1 className="font-cinzel font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600">
              Mystic Quest
            </h1>
            <Sparkles className="w-12 h-12 text-amber-700 animate-sparkle" />
          </div>
          <p className="font-crimson text-xl text-amber-700 leading-relaxed max-w-2xl mx-auto">
            Embark on a magical journey where every completed task unveils a piece of an enchanted story. 
            Your productivity becomes the key to unlocking mystical realms and ancient wisdom.
          </p>
        </div>

        {/* Story Progress */}
        <div className="mb-8">
          <StoryProgress completedTasks={completedTasks} totalTasks={tasks.length} />
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

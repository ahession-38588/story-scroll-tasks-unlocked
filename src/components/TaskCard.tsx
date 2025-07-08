
import React from 'react';
import { Check } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  storyFragment: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <div 
      className={`task-card relative p-6 rounded-lg border-2 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
        task.completed 
          ? 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-400 shadow-lg shadow-amber-200/50' 
          : 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300 hover:shadow-md'
      }`}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          task.completed 
            ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-200/50' 
            : 'border-amber-400 hover:border-amber-500'
        }`}>
          {task.completed && <Check className="w-5 h-5 text-white" />}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-cinzel font-semibold text-lg mb-2 transition-all duration-300 ${
            task.completed ? 'text-amber-800 line-through' : 'text-amber-900'
          }`}>
            {task.title}
          </h3>
          <p className={`font-crimson text-amber-700 mb-3 ${
            task.completed ? 'opacity-75' : ''
          }`}>
            {task.description}
          </p>
          
          {task.completed && (
            <div className="story-reveal bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-md p-4 animate-fade-in">
              <p className="font-crimson italic text-emerald-800 text-sm leading-relaxed">
                ✨ {task.storyFragment}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {task.completed && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white text-xs">✨</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

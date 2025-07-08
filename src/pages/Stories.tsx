
import React from 'react';
import { Link } from 'react-router-dom';
import { Castle, Sparkles, BookOpen, TreePine, Crown, Wand2 } from 'lucide-react';

const stories = [
  {
    id: 'enchanted-forest',
    title: 'The Enchanted Forest',
    description: 'Journey through mystical woodlands where ancient trees hold forgotten secrets and magical creatures guide your path.',
    icon: TreePine,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-100 to-green-200',
    tasks: 8
  },
  {
    id: 'crystal-kingdom',
    title: 'The Crystal Kingdom',
    description: 'Discover a realm of shimmering crystals and floating islands, where light magic illuminates your quest.',
    icon: Crown,
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-100 to-indigo-200',
    tasks: 6
  },
  {
    id: 'mystic-academy',
    title: 'Mystic Academy',
    description: 'Learn the ancient arts of magic and wisdom in halls where knowledge transforms into power.',
    icon: Wand2,
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-100 to-cyan-200',
    tasks: 10
  },
  {
    id: 'dragon-peaks',
    title: 'Dragon Peaks',
    description: 'Scale legendary mountains where dragons soar and treasures beyond imagination await the brave.',
    icon: Castle,
    gradient: 'from-red-500 to-orange-600',
    bgGradient: 'from-red-100 to-orange-200',
    tasks: 7
  }
];

const Stories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <BookOpen className="w-12 h-12 text-amber-700" />
            <h1 className="font-cinzel font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600">
              Mystic Realms
            </h1>
            <Sparkles className="w-12 h-12 text-amber-700 animate-sparkle" />
          </div>
          <p className="font-crimson text-xl text-amber-700 leading-relaxed max-w-3xl mx-auto">
            Choose your mystical adventure! Each realm offers unique quests and magical stories that unfold as you complete your tasks. 
            Which enchanted world calls to your spirit?
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {stories.map((story) => {
            const IconComponent = story.icon;
            return (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="group block"
              >
                <div className={`relative p-8 rounded-xl border-2 border-amber-300 bg-gradient-to-br ${story.bgGradient} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden`}>
                  {/* Magical sparkle effect on hover */}
                  <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                    <span className="text-white text-xs flex items-center justify-center h-full">✨</span>
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${story.gradient} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-cinzel font-bold text-2xl text-amber-900 mb-2">
                        {story.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-amber-600">
                        <span>{story.tasks} quests</span>
                        <span>•</span>
                        <span>Magical adventure</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="font-crimson text-amber-800 text-lg leading-relaxed mb-4">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-crimson italic text-amber-600 text-sm">
                      Begin your journey...
                    </span>
                    <div className="flex items-center space-x-1 text-amber-600 group-hover:text-amber-700 transition-colors">
                      <span className="text-sm font-crimson">Enter realm</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-crimson italic text-amber-600 text-sm">
            ✨ Each realm holds unique magical stories waiting to be discovered ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;


import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  storyFragment: string;
}

const storyFragments = [
  "Deep in the Whispering Woods, ancient trees began to glow with ethereal light...",
  "A mystical portal shimmered into existence, revealing glimpses of distant magical realms...",
  "The Elder Sage nodded approvingly, sensing your growing connection to the arcane energies...",
  "Crystal flowers bloomed in your wake, their petals singing ancient melodies of power...",
  "The Guardian Dragon stirred from its slumber, recognizing a worthy ally in you...",
  "Starlight danced through the canopy, weaving itself into a crown of celestial wisdom...",
  "The Heart of the Forest pulsed with renewed life, responding to your dedicated spirit...",
  "Ancient runes on forgotten stones began to glow, revealing secrets lost to time..."
];

const defaultTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Complete Morning Meditation",
    description: "Start your day with 10 minutes of mindful breathing",
    completed: false,
    storyFragment: storyFragments[0]
  },
  {
    id: uuidv4(),
    title: "Organize Sacred Workspace",
    description: "Clear and arrange your desk for focused work",
    completed: false,
    storyFragment: storyFragments[1]
  },
  {
    id: uuidv4(),
    title: "Study Ancient Texts",
    description: "Read for 30 minutes to expand your knowledge",
    completed: false,
    storyFragment: storyFragments[2]
  },
  {
    id: uuidv4(),
    title: "Tend to Life's Garden",
    description: "Water plants or spend time in nature",
    completed: false,
    storyFragment: storyFragments[3]
  },
  {
    id: uuidv4(),
    title: "Practice Creative Arts",
    description: "Express yourself through drawing, writing, or music",
    completed: false,
    storyFragment: storyFragments[4]
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('mystic-quest-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(defaultTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mystic-quest-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      storyFragment: storyFragments[Math.floor(Math.random() * storyFragments.length)]
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return {
    tasks,
    toggleTask,
    addTask,
    removeTask
  };
};

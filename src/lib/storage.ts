export interface Task {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

export interface FocusSession {
  id: string;
  duration: number;
  taskId?: string;
  startTime: string;
  endTime?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface WeeklyData {
  day: string;
  tasks: number;
  focusMinutes: number;
}

export interface UserStats {
  level: number;
  progress: number;
  streak: number;
  focusMinutes: number;
  tasksCompleted: number;
  achievements: Achievement[];
  weeklyData: WeeklyData[];
}

export interface Settings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
}

export interface AppData {
  tasks: Task[];
  focusSessions: FocusSession[];
  userStats: UserStats;
  settings: Settings;
}

const defaultSettings: Settings = {
  workDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true,
};

const defaultAchievements: Achievement[] = [
  { id: '1', title: 'First Task', description: 'Complete your first task', icon: 'CheckCircle2', unlocked: false },
  { id: '2', title: '7 Day Streak', description: 'Complete tasks for 7 days in a row', icon: 'Flame', unlocked: false },
  { id: '3', title: 'Focus Master', description: 'Complete 10 focus sessions', icon: 'Timer', unlocked: false },
  { id: '4', title: 'Early Bird', description: 'Start a task before 8 AM', icon: 'Sun', unlocked: false },
  { id: '5', title: 'Night Owl', description: 'Complete a task after 10 PM', icon: 'Moon', unlocked: false },
];

const defaultWeeklyData: WeeklyData[] = [
  { day: 'Mon', tasks: 0, focusMinutes: 0 },
  { day: 'Tue', tasks: 0, focusMinutes: 0 },
  { day: 'Wed', tasks: 0, focusMinutes: 0 },
  { day: 'Thu', tasks: 0, focusMinutes: 0 },
  { day: 'Fri', tasks: 0, focusMinutes: 0 },
  { day: 'Sat', tasks: 0, focusMinutes: 0 },
  { day: 'Sun', tasks: 0, focusMinutes: 0 },
];

const defaultData: AppData = {
  tasks: [],
  focusSessions: [],
  userStats: {
    level: 1,
    progress: 0,
    streak: 0,
    focusMinutes: 0,
    tasksCompleted: 0,
    achievements: defaultAchievements,
    weeklyData: defaultWeeklyData,
  },
  settings: defaultSettings,
};

export const getData = (): AppData => {
  const stored = localStorage.getItem('betterFocusData');
  if (stored) {
    const parsed = JSON.parse(stored);
    return {
      ...defaultData,
      ...parsed,
      userStats: {
        ...defaultData.userStats,
        ...parsed.userStats,
        achievements: parsed.userStats?.achievements || defaultAchievements,
        weeklyData: parsed.userStats?.weeklyData || defaultWeeklyData,
      },
      settings: { ...defaultSettings, ...parsed.settings },
    };
  }
  return defaultData;
};

const saveData = (data: AppData) => {
  localStorage.setItem('betterFocusData', JSON.stringify(data));
};

export const getTasks = (): Task[] => {
  return getData().tasks;
};

export const addTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  const data = getData();
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.tasks.push(newTask);
  saveData(data);
  return newTask;
};

export const updateTask = (id: string, updates: Partial<Task>) => {
  const data = getData();
  const taskIndex = data.tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    const wasCompleted = data.tasks[taskIndex].completed;
    const isNowCompleted = updates.completed ?? wasCompleted;
    
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updates };
    
    if (!wasCompleted && isNowCompleted) {
      data.userStats.tasksCompleted++;
      data.userStats.progress = Math.min((data.userStats.progress + 10) % 100, 99);
      if (data.userStats.progress === 0) {
        data.userStats.level++;
      }
      data.tasks[taskIndex].completedAt = new Date().toISOString();
    }
    
    saveData(data);
  }
};

export const deleteTaskFromStorage = (id: string) => {
  const data = getData();
  data.tasks = data.tasks.filter((t) => t.id !== id);
  saveData(data);
};

export const addFocusSession = (session: Omit<FocusSession, 'id'>): FocusSession => {
  const data = getData();
  const newSession: FocusSession = {
    ...session,
    id: Date.now().toString(),
  };
  data.focusSessions.push(newSession);
  data.userStats.focusMinutes += Math.round(session.duration / 60);
  saveData(data);
  return newSession;
};

export const getSettings = (): Settings => {
  return getData().settings;
};

export const updateSettings = (updates: Partial<Settings>) => {
  const data = getData();
  data.settings = { ...data.settings, ...updates };
  saveData(data);
};

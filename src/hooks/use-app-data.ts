import { useState, useCallback, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: number;
  completedAt?: number;
  focusMinutes?: number;
}

export interface Achievement {
  id: number;
  name: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: number;
  icon: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  currentLevelXp: number;
  maxLevelXp: number;
  streak: number;
  longestStreak: number;
  tasksCompleted: number;
  focusMinutes: number;
  lastActiveDate: number;
  bodyDoublingMinutes: number;
}

export interface DailyStats {
  date: string;
  tasksCompleted: number;
  focusMinutes: number;
  sessionsCompleted: number;
}

export interface FocusSession {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  type: 'work' | 'break';
  completed: boolean;
  notes?: string;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  targetDays: number; // days per week
  createdAt: number;
  completedDates: string[]; // ISO date strings
  color: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  defaultFocusDuration: number;
  defaultBreakDuration: number;
  language: string;
}

const STORAGE_KEY = 'betterfocus_data';
const DEFAULT_SETTINGS: UserSettings = {
  theme: 'auto',
  soundEnabled: true,
  notificationsEnabled: true,
  defaultFocusDuration: 25,
  defaultBreakDuration: 5,
  language: 'en',
};

const DEFAULT_USER_PROGRESS: UserProgress = {
  level: 1,
  xp: 0,
  currentLevelXp: 0,
  maxLevelXp: 100,
  streak: 0,
  longestStreak: 0,
  tasksCompleted: 0,
  focusMinutes: 0,
  lastActiveDate: Date.now(),
  bodyDoublingMinutes: 0,
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: 'First Steps', desc: 'Complete your first task', unlocked: false, icon: '🎯' },
  { id: 2, name: 'Week Warrior', desc: '7-day streak', unlocked: false, icon: '🔥' },
  { id: 3, name: 'Focus Master', desc: '50+ focus sessions', unlocked: false, icon: '⏱️' },
  { id: 4, name: 'Task Champion', desc: 'Complete 100 tasks', unlocked: false, icon: '💯' },
  { id: 5, name: 'Consistency King', desc: '30-day streak', unlocked: false, icon: '👑' },
  { id: 6, name: 'Night Owl', desc: 'Complete task after 10pm', unlocked: false, icon: '🦉' },
  { id: 7, name: 'Speed Demon', desc: 'Complete 5 tasks in one day', unlocked: false, icon: '⚡' },
  { id: 8, name: 'Focus Beast', desc: '300+ total focus minutes', unlocked: false, icon: '🚀' },
  { id: 9, name: 'Breathing Buddha', desc: 'Complete 10 breathing exercises', unlocked: false, icon: '🧘' },
  { id: 10, name: 'Co-worker Champion', desc: '60 minutes in body doubling sessions', unlocked: false, icon: '👥' },
];

export const useAppData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setTasks(data.tasks || []);
        setUserProgress(data.userProgress || DEFAULT_USER_PROGRESS);
        setAchievements(data.achievements || DEFAULT_ACHIEVEMENTS);
        setDailyStats(data.dailyStats || []);
        setFocusSessions(data.focusSessions || []);
        setHabits(data.habits || []);
        setSettings(data.settings || DEFAULT_SETTINGS);
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    } else {
      // Initialize with sample data
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Complete onboarding',
          notes: '',
          completed: true,
          priority: 'high',
          createdAt: Date.now() - 86400000,
          completedAt: Date.now() - 43200000,
          focusMinutes: 15,
        },
        {
          id: '2',
          title: 'Try the focus timer',
          notes: 'Pomodoro technique',
          completed: false,
          priority: 'medium',
          createdAt: Date.now() - 3600000,
        },
        {
          id: '3',
          title: 'Add your first real task',
          notes: 'Start building your task list',
          completed: false,
          priority: 'medium',
          createdAt: Date.now() - 1800000,
        },
      ];
      const sampleHabits: Habit[] = [
        {
          id: '1',
          name: 'Morning Exercise',
          description: 'Start your day with movement',
          frequency: 'daily',
          targetDays: 7,
          createdAt: Date.now(),
          completedDates: [],
          color: 'bg-blue-500',
        },
        {
          id: '2',
          name: 'Read',
          description: 'Read for at least 15 minutes',
          frequency: 'daily',
          targetDays: 7,
          createdAt: Date.now(),
          completedDates: [],
          color: 'bg-purple-500',
        },
      ];
      setTasks(sampleTasks);
      setHabits(sampleHabits);
      setUserProgress({ ...DEFAULT_USER_PROGRESS, tasksCompleted: 1, xp: 50, currentLevelXp: 50 });
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          tasks,
          userProgress,
          achievements,
          dailyStats,
          focusSessions,
          habits,
          settings,
        })
      );
    }
  }, [tasks, userProgress, achievements, dailyStats, focusSessions, habits, settings, isLoaded]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          // Award XP when completing a task
          if (!t.completed && updates.completed) {
            const xpGain = t.priority === 'high' ? 25 : t.priority === 'medium' ? 15 : 10;
            awardXP(xpGain, t.priority);
            recordTaskCompletion(t);
          }
          return updated;
        }
        return t;
      })
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const awardXP = useCallback((amount: number, priority?: 'high' | 'medium' | 'low') => {
    setUserProgress((prev) => {
      const newXp = prev.currentLevelXp + amount;
      if (newXp >= prev.maxLevelXp) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: prev.xp + amount,
          currentLevelXp: newXp - prev.maxLevelXp,
          maxLevelXp: Math.floor(prev.maxLevelXp * 1.1),
        };
      }
      return {
        ...prev,
        xp: prev.xp + amount,
        currentLevelXp: newXp,
      };
    });
  }, []);

  const recordTaskCompletion = useCallback((task: Task) => {
    setUserProgress((prev) => {
      const today = new Date().toDateString();
      const lastActive = new Date(prev.lastActiveDate).toDateString();
      let newStreak = prev.streak;

      // Update streak
      if (today !== lastActive) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastActive === yesterday) {
          newStreak = prev.streak + 1;
        } else {
          newStreak = 1;
        }
      }

      return {
        ...prev,
        tasksCompleted: prev.tasksCompleted + 1,
        streak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastActiveDate: Date.now(),
      };
    });

    // Record daily stats
    const today = new Date().toISOString().split('T')[0];
    setDailyStats((prev) => {
      const todayStats = prev.find((s) => s.date === today);
      if (todayStats) {
        return prev.map((s) =>
          s.date === today ? { ...s, tasksCompleted: s.tasksCompleted + 1 } : s
        );
      }
      return [
        ...prev,
        {
          date: today,
          tasksCompleted: 1,
          focusMinutes: 0,
          sessionsCompleted: 0,
        },
      ];
    });

    // Check and unlock achievements
    checkAchievements();
  }, []);

  const recordFocusSession = useCallback((minutes: number) => {
    setUserProgress((prev) => ({
      ...prev,
      focusMinutes: prev.focusMinutes + minutes,
    }));

    awardXP(Math.ceil(minutes / 5)); // 1 XP per 5 minutes focused

    // Record daily stats
    const today = new Date().toISOString().split('T')[0];
    setDailyStats((prev) => {
      const todayStats = prev.find((s) => s.date === today);
      if (todayStats) {
        return prev.map((s) =>
          s.date === today
            ? { ...s, focusMinutes: s.focusMinutes + minutes, sessionsCompleted: s.sessionsCompleted + 1 }
            : s
        );
      }
      return [
        ...prev,
        {
          date: today,
          tasksCompleted: 0,
          focusMinutes: minutes,
          sessionsCompleted: 1,
        },
      ];
    });

    checkAchievements();
  }, [awardXP]);

  const recordBodyDoublingSession = useCallback((minutes: number) => {
    setUserProgress((prev) => ({
      ...prev,
      bodyDoublingMinutes: prev.bodyDoublingMinutes + minutes,
    }));
    awardXP(Math.ceil(minutes / 10)); // 1 XP per 10 minutes
    checkAchievements();
  }, [awardXP]);

  const checkAchievements = useCallback(() => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        switch (achievement.id) {
          case 1: // First Steps
            shouldUnlock = userProgress.tasksCompleted >= 1;
            break;
          case 2: // Week Warrior
            shouldUnlock = userProgress.streak >= 7;
            break;
          case 3: // Focus Master
            shouldUnlock = userProgress.focusMinutes >= 2500; // 50 * 50 min sessions
            break;
          case 4: // Task Champion
            shouldUnlock = userProgress.tasksCompleted >= 100;
            break;
          case 5: // Consistency King
            shouldUnlock = userProgress.longestStreak >= 30;
            break;
          case 6: // Night Owl
            shouldUnlock = new Date().getHours() >= 22;
            break;
          case 7: // Speed Demon
            const today = new Date().toISOString().split('T')[0];
            shouldUnlock = dailyStats.find((s) => s.date === today)?.tasksCompleted >= 5;
            break;
          case 8: // Focus Beast
            shouldUnlock = userProgress.focusMinutes >= 300;
            break;
          case 9: // Breathing Buddha
            // This would need a counter for breathing exercises
            shouldUnlock = false;
            break;
          case 10: // Co-worker Champion
            shouldUnlock = userProgress.bodyDoublingMinutes >= 60;
            break;
        }

        if (shouldUnlock) {
          return { ...achievement, unlocked: true, unlockedAt: Date.now() };
        }
        return achievement;
      })
    );
  }, [userProgress, dailyStats]);

  const getWeeklyStats = useCallback(() => {
    const stats = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split('T')[0];
      const dayStat = dailyStats.find((s) => s.date === dateStr) || {
        date: dateStr,
        tasksCompleted: 0,
        focusMinutes: 0,
        sessionsCompleted: 0,
      };
      stats.push({
        day: days[date.getDay() === 0 ? 6 : date.getDay() - 1],
        tasks: dayStat.tasksCompleted,
        minutes: dayStat.focusMinutes,
      });
    }
    return stats;
  }, [dailyStats]);

  const recordFocusSessionData = useCallback((session: Omit<FocusSession, 'id'>) => {
    const newSession: FocusSession = {
      ...session,
      id: Date.now().toString(),
    };
    setFocusSessions((prev) => [newSession, ...prev]);
    return newSession;
  }, []);

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: Date.now(),
      completedDates: [],
    };
    setHabits((prev) => [newHabit, ...prev]);
    return newHabit;
  }, []);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const completeHabitToday = useCallback((id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id && !h.completedDates.includes(today)) {
          return { ...h, completedDates: [...h.completedDates, today] };
        }
        return h;
      })
    );
    awardXP(10);
  }, [awardXP]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const exportData = useCallback(() => {
    return {
      tasks,
      userProgress,
      achievements,
      dailyStats,
      focusSessions,
      habits,
      settings,
      exportDate: new Date().toISOString(),
    };
  }, [tasks, userProgress, achievements, dailyStats, focusSessions, habits, settings]);

  const importData = useCallback(
    (data: any) => {
      try {
        if (data.tasks) setTasks(data.tasks);
        if (data.userProgress) setUserProgress(data.userProgress);
        if (data.achievements) setAchievements(data.achievements);
        if (data.dailyStats) setDailyStats(data.dailyStats);
        if (data.focusSessions) setFocusSessions(data.focusSessions);
        if (data.habits) setHabits(data.habits);
        if (data.settings) setSettings(data.settings);
        return true;
      } catch (e) {
        console.error('Import failed:', e);
        return false;
      }
    },
    []
  );

  const resetAllData = useCallback(() => {
    setTasks([]);
    setUserProgress(DEFAULT_USER_PROGRESS);
    setAchievements(DEFAULT_ACHIEVEMENTS);
    setDailyStats([]);
    setFocusSessions([]);
    setHabits([]);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    // State
    tasks,
    userProgress,
    achievements,
    dailyStats,
    focusSessions,
    habits,
    settings,
    isLoaded,

    // Task operations
    addTask,
    updateTask,
    deleteTask,

    // Progress operations
    awardXP,
    recordTaskCompletion,
    recordFocusSession,
    recordBodyDoublingSession,

    // Focus session operations
    recordFocusSessionData,

    // Habit operations
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabitToday,

    // Settings operations
    updateSettings,

    // Data operations
    exportData,
    importData,
    resetAllData,

    // Queries
    getWeeklyStats,
    getCompletedTasksToday: () => tasks.filter((t) => t.completed && t.completedAt && new Date(t.completedAt).toDateString() === new Date().toDateString()).length,
    getTodayTasks: () => tasks.filter((t) => !t.completed),
    getCompletedTasks: () => tasks.filter((t) => t.completed),
  };
};

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppDataContext';
import { Bell, Clock, Zap, AlertCircle } from 'lucide-react';

export const SmartReminders: React.FC = () => {
  const appContext = useAppContext();
  const [reminders, setReminders] = useState<any[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Generate smart reminders based on user behavior and tasks
    const newReminders: any[] = [];

    // Reminder 1: Morning motivation if no tasks completed today
    const today = new Date().toDateString();
    const completedToday = appContext.tasks.filter(t => t.completedAt && new Date(t.completedAt).toDateString() === today).length;
    if (completedToday === 0 && new Date().getHours() < 12) {
      newReminders.push({
        id: 'morning-motivation',
        type: 'motivation',
        title: 'Good morning, Focus Warrior! 🌅',
        message: "Let's start with one small task to build momentum.",
        icon: Zap,
        color: 'bg-yellow-500/20',
      });
    }

    // Reminder 2: Pending tasks warning
    const uncompletedTasks = appContext.getTodayTasks().length;
    if (uncompletedTasks > 5) {
      newReminders.push({
        id: 'task-overload',
        type: 'warning',
        title: `${uncompletedTasks} tasks waiting 📋`,
        message: 'Try focusing on your top 3 priorities. You can do this!',
        icon: AlertCircle,
        color: 'bg-orange-500/20',
      });
    }

    // Reminder 3: Break time suggestion
    const currentHour = new Date().getHours();
    if (currentHour === 12 || currentHour === 17 || currentHour === 20) {
      newReminders.push({
        id: 'break-time-' + currentHour,
        type: 'break',
        title: 'Time for a break! ☕',
        message: 'You\'ve been going strong. Take a few minutes to recharge.',
        icon: Clock,
        color: 'bg-blue-500/20',
      });
    }

    // Reminder 4: Focus session suggestion
    if (appContext.userProgress.focusMinutes < 60 && currentHour > 8 && currentHour < 18) {
      newReminders.push({
        id: 'focus-session',
        type: 'suggestion',
        title: 'Ready for a focus session? ⏱️',
        message: 'Start a Pomodoro session to tackle your tasks more effectively.',
        icon: Clock,
        color: 'bg-green-500/20',
      });
    }

    // Reminder 5: Streak encouragement
    if (appContext.userProgress.streak > 0 && appContext.userProgress.streak % 7 === 0) {
      newReminders.push({
        id: 'streak-celebration',
        type: 'celebration',
        title: `${appContext.userProgress.streak}-day streak! 🔥`,
        message: 'You\'re on fire! Keep the momentum going!',
        icon: Zap,
        color: 'bg-red-500/20',
      });
    }

    // Reminder 6: Breathing exercise suggestion
    if (currentHour > 14 && currentHour < 17) {
      newReminders.push({
        id: 'breathing-exercise',
        type: 'mindfulness',
        title: 'Feeling overwhelmed? 🧘',
        message: 'Try a quick breathing exercise to calm your mind.',
        icon: Clock,
        color: 'bg-purple-500/20',
      });
    }

    // Filter out dismissed reminders
    setReminders(newReminders.filter(r => !dismissedIds.has(r.id)));
  }, [appContext.tasks, appContext.userProgress, dismissedIds]);

  const dismissReminder = (id: string) => {
    const newDismissed = new Set(dismissedIds);
    newDismissed.add(id);
    setDismissedIds(newDismissed);
  };

  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {reminders.slice(0, 3).map((reminder) => {
        const Icon = reminder.icon;
        return (
          <Card key={reminder.id} className={`p-4 glass border-border/50 ${reminder.color}`}>
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{reminder.title}</h4>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {reminder.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{reminder.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissReminder(reminder.id)}
                className="h-6 w-6 p-0 shrink-0"
              >
                ×
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

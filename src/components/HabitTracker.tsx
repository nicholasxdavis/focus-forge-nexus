import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppDataContext';
import { CheckCircle2, Circle, Plus, X, Flame } from 'lucide-react';

const COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-teal-500',
];

export const HabitTracker: React.FC = () => {
  const appContext = useAppContext();
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily' as const,
    color: COLORS[0],
  });

  const handleAddHabit = () => {
    if (formData.name.trim()) {
      appContext.addHabit({
        name: formData.name,
        description: formData.description,
        frequency: formData.frequency,
        targetDays: formData.frequency === 'daily' ? 7 : 4,
        color: formData.color,
      });
      setFormData({ name: '', description: '', frequency: 'daily', color: COLORS[0] });
      setShowAddHabit(false);
    }
  };

  const getHabitStreak = (habit: any) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today) ? 1 : 0;
  };

  const getCompletionPercentage = (habit: any) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedInPeriod = habit.completedDates.filter((date: string) => {
      const d = new Date(date);
      return d >= sevenDaysAgo && d <= today;
    }).length;

    return Math.round((completedInPeriod / 7) * 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Daily Habits</h2>
        <Button
          onClick={() => setShowAddHabit(true)}
          size="sm"
          variant="outline"
          className="border-primary/30 hover:border-primary"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Habit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {appContext.habits.map((habit) => (
          <Card key={habit.id} className="p-4 glass border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => appContext.completeHabitToday(habit.id)}
                    className="flex-shrink-0"
                  >
                    {habit.completedDates.includes(new Date().toISOString().split('T')[0]) ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div>
                    <h3 className="font-semibold text-sm">{habit.name}</h3>
                    {habit.description && (
                      <p className="text-xs text-muted-foreground">{habit.description}</p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => appContext.deleteHabit(habit.id)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">This Week</span>
                <span className="text-xs font-medium">{getCompletionPercentage(habit)}%</span>
              </div>
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full ${habit.color} transition-all duration-300`}
                  style={{ width: `${getCompletionPercentage(habit)}%` }}
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              {getHabitStreak(habit) > 0 && (
                <Badge variant="secondary" className="text-xs">
                  <Flame className="h-3 w-3 mr-1" />
                  Today
                </Badge>
              )}
              <Badge variant="outline" className="text-xs capitalize">
                {habit.frequency}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Habit Dialog */}
      <Dialog open={showAddHabit} onOpenChange={setShowAddHabit}>
        <DialogContent className="sm:max-w-md glass border-primary/20">
          <DialogHeader>
            <DialogTitle>Add a New Habit</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Morning Exercise"
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., 30 minutes of walking"
              />
            </div>

            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({ ...formData, frequency: e.target.value as 'daily' | 'weekly' })
                }
                className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div>
              <Label>Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`h-8 rounded-lg ${color} ${
                      formData.color === color
                        ? 'ring-2 ring-offset-2 ring-primary'
                        : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowAddHabit(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHabit} className="bg-gradient-primary">
                Add Habit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';
import {
  getData,
  addTask,
  updateTask,
  deleteTaskFromStorage,
  type Task
} from '@/lib/storage';
import {
  Zap,
  Plus,
  CheckCircle2,
  Circle,
  Edit,
  Trash2,
  Calendar,
  Menu,
  X,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

export default function Tasks() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    priority: 'medium' as Task['priority'],
    completed: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load tasks from localStorage with animation delay
    const data = getData();
    setTasks(data.tasks);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: t('errors.taskNameRequired'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingTask) {
        updateTask(editingTask.id, formData);
        toast({
          title: t('notifications.taskUpdated'),
          description: formData.title,
        });
      } else {
        addTask(formData);
        toast({
          title: t('notifications.taskAdded'),
          description: formData.title,
        });
      }

      // Reload tasks
      const data = getData();
      setTasks(data.tasks);

      setFormData({ title: '', notes: '', priority: 'medium', completed: false });
      setShowAddDialog(false);
      setEditingTask(null);
    } catch (error) {
      toast({
        title: t('errors.generic'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
      const data = getData();
      setTasks(data.tasks);
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    deleteTaskFromStorage(id);
    const data = getData();
    setTasks(data.tasks);
    toast({
      title: t('notifications.taskDeleted'),
      description: task?.title,
    });
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      notes: task.notes,
      priority: task.priority,
      completed: task.completed,
    });
    setShowAddDialog(true);
  };

  const todayTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const TaskItem = ({ task }: { task: Task }) => (
    <Card className="p-4 glass hover-lift border-border/50 animate-fade-in transition-all duration-200">
      <div className="flex items-start gap-3">
        <button onClick={() => toggleTask(task.id)} className="mt-1">
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium mb-1 ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.notes && (
            <p className="text-sm text-muted-foreground mb-2">{task.notes}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={
              task.priority === 'high'
                ? 'destructive'
                : task.priority === 'medium'
                ? 'default'
                : 'secondary'
            }
            className="text-xs"
          >
            {task.priority}
          </Badge>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => startEdit(task)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteTask(task.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="font-bold text-lg">BetterFocus</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('tasks.title')}</h1>
          <Button
            onClick={() => {
              setEditingTask(null);
              setFormData({ title: '', notes: '', priority: 'medium', completed: false });
              setShowAddDialog(true);
            }}
            className="bg-gradient-primary glow-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('tasks.addNew')}
          </Button>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="today" className="transition-all duration-200">{t('tasks.today')}</TabsTrigger>
            <TabsTrigger value="all" className="transition-all duration-200">{t('tasks.all')}</TabsTrigger>
            <TabsTrigger value="completed" className="transition-all duration-200">{t('tasks.completed')}</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todayTasks.length === 0 ? (
              <Card className="p-12 glass text-center animate-fade-in">
                <Circle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No active tasks. Take a break or add a new one!</p>
              </Card>
            ) : (
              todayTasks.map((task, idx) => (
                <div key={task.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <TaskItem task={task} />
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.length === 0 ? (
              <Card className="p-12 glass text-center animate-fade-in">
                <CheckCircle2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No completed tasks yet. Get started!</p>
              </Card>
            ) : (
              completedTasks.map((task, idx) => (
                <div key={task.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <TaskItem task={task} />
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="glass border-primary/20">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? t('tasks.edit') : t('tasks.addNew')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">{t('tasks.taskName')}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What needs to be done?"
                required
              />
            </div>

            <div>
              <Label htmlFor="priority">{t('tasks.priority')}</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task['priority']) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t('tasks.high')}</SelectItem>
                  <SelectItem value="medium">{t('tasks.medium')}</SelectItem>
                  <SelectItem value="low">{t('tasks.low')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">{t('tasks.notes')}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any details..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowAddDialog(false);
                  setEditingTask(null);
                }}
              >
                {t('tasks.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-primary transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  t('tasks.save')
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

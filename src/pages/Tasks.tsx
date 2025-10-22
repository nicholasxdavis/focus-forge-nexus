import { useState } from 'react';
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
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export default function Tasks() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      notes: 'Check budget and timeline',
      completed: false,
      priority: 'high',
      dueDate: '2025-11-01',
    },
    {
      id: '2',
      title: 'Schedule team meeting',
      notes: '',
      completed: false,
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Update documentation',
      notes: 'Add new API endpoints',
      completed: true,
      priority: 'low',
    },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    priority: 'medium' as Task['priority'],
    dueDate: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, ...formData }
            : t
        )
      );
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        completed: false,
        ...formData,
      };
      setTasks([...tasks, newTask]);
    }

    setFormData({ title: '', notes: '', priority: 'medium', dueDate: '' });
    setShowAddDialog(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      notes: task.notes,
      priority: task.priority,
      dueDate: task.dueDate || '',
    });
    setShowAddDialog(true);
  };

  const todayTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const TaskItem = ({ task }: { task: Task }) => (
    <Card className="p-4 glass hover-lift border-border/50">
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
            {task.dueDate && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </Badge>
            )}
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
            onClick={() => deleteTask(task.id)}
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
              setFormData({ title: '', notes: '', priority: 'medium', dueDate: '' });
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
            <TabsTrigger value="today">{t('tasks.today')}</TabsTrigger>
            <TabsTrigger value="all">{t('tasks.all')}</TabsTrigger>
            <TabsTrigger value="completed">{t('tasks.completed')}</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todayTasks.length === 0 ? (
              <Card className="p-12 glass text-center">
                <p className="text-muted-foreground">No active tasks. Take a break or add a new one!</p>
              </Card>
            ) : (
              todayTasks.map((task) => <TaskItem key={task.id} task={task} />)
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.length === 0 ? (
              <Card className="p-12 glass text-center">
                <p className="text-muted-foreground">No completed tasks yet. Get started!</p>
              </Card>
            ) : (
              completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
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
              <Label htmlFor="dueDate">{t('tasks.dueDate')}</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
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
              <Button type="submit" className="bg-gradient-primary">
                {t('tasks.save')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { TutorialTooltip } from '@/components/TutorialTooltip';
import { RatingPopup } from '@/components/RatingPopup';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  getData,
  addTask as addTaskToStorage,
  updateTask,
  getTasks,
  type Task
} from '@/lib/storage';
import {
  Zap,
  Plus,
  CheckCircle2,
  Circle,
  Timer,
  Trophy,
  Flame,
  Target,
  Menu,
  X,
  Calendar,
  Brain,
  Heart,
  TrendingUp,
  Star,
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStats, setUserStats] = useState(getData().userStats);

  useEffect(() => {
    // Load data from localStorage
    const data = getData();
    setTasks(data.tasks);
    setUserStats(data.userStats);

    // Check if user is new
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    // Show tutorial after onboarding
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenOnboarding && !hasSeenTutorial) {
      setTimeout(() => setShowTutorial(true), 1000);
    }

    // Show rating popup after some usage
    const sessionCount = parseInt(localStorage.getItem('sessionCount') || '0');
    if (sessionCount > 5 && !localStorage.getItem('hasRated')) {
      setTimeout(() => setShowRating(true), 10000);
    }

    // Increment session count
    localStorage.setItem('sessionCount', String(sessionCount + 1));
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    setTimeout(() => setShowTutorial(true), 500);
  };

  const handleTutorialNext = () => {
    if (tutorialStep < 3) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTaskToStorage({
      title: newTask,
      notes: '',
      completed: false,
      priority: 'medium',
    });
    setTasks(getTasks());
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
      setTasks(getTasks());
      setUserStats(getData().userStats);
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      {showOnboarding && <OnboardingFlow onComplete={handleOnboardingComplete} />}

      {/* Rating Popup */}
      {showRating && <RatingPopup onClose={() => setShowRating(false)} />}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
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

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-200`}
        >
          <nav className="p-4 space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                {t('nav.dashboard')}
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="ghost" className="w-full justify-start">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Tasks
              </Button>
            </Link>
            <Link to="/focus">
              <Button variant="ghost" className="w-full justify-start">
                <Timer className="mr-2 h-4 w-4" />
                Focus Mode
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="ghost" className="w-full justify-start">
                <Trophy className="mr-2 h-4 w-4" />
                Progress
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {t('dashboard.welcome')}, Focus Warrior! 🎯
              </h1>
              <p className="text-muted-foreground">Let's make today productive.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <TutorialTooltip
                isActive={showTutorial && tutorialStep === 3}
                content={t('tutorial.step4')}
                position="bottom"
                onNext={handleTutorialNext}
              >
                <Card className="p-6 glass hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t('dashboard.yourStreak')}</span>
                    <Flame className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{userStats.streak}</p>
                  <p className="text-xs text-muted-foreground">{t('dashboard.days')}</p>
                </Card>
              </TutorialTooltip>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('dashboard.level')}</span>
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{userStats.level}</p>
                <Progress value={userStats.progress} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1">{userStats.progress}% to next level</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('dashboard.focusTime')}</span>
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{userStats.focusMinutes}</p>
                <p className="text-xs text-muted-foreground">{t('dashboard.minutes')}</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Tasks Done</span>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{completedTasks}/{tasks.length}</p>
                <Progress value={progressPercent} className="mt-2 h-2" />
              </Card>
            </div>

            {/* Quick Add Task */}
            <TutorialTooltip
              isActive={showTutorial && tutorialStep === 1}
              content={t('tutorial.step2')}
              position="bottom"
              onNext={handleTutorialNext}
            >
              <Card className="p-6 glass">
                <div className="flex gap-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder={t('dashboard.quickAdd')}
                    className="flex-1 bg-background/50"
                  />
                  <Button onClick={handleAddTask} className="bg-gradient-primary glow-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard.addTask')}
                  </Button>
                </div>
              </Card>
            </TutorialTooltip>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="overview">
                  <Target className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="wellness">
                  <Heart className="h-4 w-4 mr-2" />
                  Wellness
                </TabsTrigger>
                <TabsTrigger value="insights">
                  <Brain className="h-4 w-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="goals">
                  <Star className="h-4 w-4 mr-2" />
                  Goals
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <TutorialTooltip
                  isActive={showTutorial && tutorialStep === 0}
                  content={t('tutorial.step1')}
                  position="top"
                  onNext={handleTutorialNext}
                >
                  <Card className="p-6 glass">
                    <h2 className="text-2xl font-bold mb-4">{t('dashboard.todayTasks')}</h2>
                    {tasks.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">{t('dashboard.noTasks')}</p>
                    ) : (
                      <div className="space-y-2">
                        {tasks.slice(0, 5).map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
                            )}
                            <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </span>
                            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                              {task.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </TutorialTooltip>

                <TutorialTooltip
                  isActive={showTutorial && tutorialStep === 2}
                  content={t('tutorial.step3')}
                  position="top"
                  onNext={handleTutorialNext}
                >
                  <Card className="p-8 glass bg-gradient-glow text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Focus?</h2>
                    <p className="text-muted-foreground mb-6">
                      Start a focus session and crush your tasks with visual timers and breaks.
                    </p>
                    <Link to="/focus">
                      <Button size="lg" className="bg-gradient-primary glow-primary">
                        <Timer className="mr-2 h-5 w-5" />
                        {t('dashboard.startFocus')}
                      </Button>
                    </Link>
                  </Card>
                </TutorialTooltip>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="space-y-6">
                <Card className="p-6 glass">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">All Tasks</h2>
                    <Badge variant="outline">{tasks.length} total</Badge>
                  </div>
                  {tasks.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No tasks yet. Add your first one!</p>
                  ) : (
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
                          )}
                          <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </span>
                          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="space-y-6">
                <Card className="p-6 glass">
                  <h2 className="text-2xl font-bold mb-4">Weekly Overview</h2>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                      <div key={day} className="text-center">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{day}</div>
                        <div className={`h-20 rounded-lg flex items-center justify-center ${idx === new Date().getDay() - 1 ? 'bg-primary/20 border-2 border-primary' : 'bg-muted/30'}`}>
                          <div className="text-center">
                            <div className="text-lg font-bold">{new Date().getDate() - new Date().getDay() + idx + 1}</div>
                            <div className="text-xs text-muted-foreground">
                              {tasks.filter(t => t.completed).length > idx ? `${idx + 1} tasks` : '—'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 glass">
                  <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Sample deadline {i}</div>
                          <div className="text-sm text-muted-foreground">Due in {i + 1} days</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Wellness Tab */}
              <TabsContent value="wellness" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 glass">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-bold">Daily Mood</h2>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {['😊', '🙂', '😐', '😔', '😢'].map((emoji, idx) => (
                        <button
                          key={idx}
                          className="text-4xl p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 glass">
                    <div className="flex items-center gap-3 mb-4">
                      <Timer className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-bold">Break Timer</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">Take regular breaks to stay fresh</p>
                    <Button className="w-full bg-gradient-primary glow-primary">
                      Start 5-min Break
                    </Button>
                  </Card>
                </div>

                <Card className="p-6 glass">
                  <h2 className="text-xl font-bold mb-4">Breathing Exercises</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Box Breathing', 'Deep Breathing', '4-7-8 Technique'].map((exercise) => (
                      <div key={exercise} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="font-medium mb-2">{exercise}</div>
                        <div className="text-sm text-muted-foreground">2 min session</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-6 glass">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Peak Focus Time</span>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">10 AM - 12 PM</p>
                  </Card>

                  <Card className="p-6 glass">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Avg Session Length</span>
                      <Timer className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">23 minutes</p>
                  </Card>

                  <Card className="p-6 glass">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Task Completion</span>
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">78%</p>
                  </Card>
                </div>

                <Card className="p-6 glass">
                  <h2 className="text-xl font-bold mb-4">Weekly Patterns</h2>
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
                      <div key={day}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{day}</span>
                          <span className="text-sm text-muted-foreground">{(idx + 3) * 20}%</span>
                        </div>
                        <Progress value={(idx + 3) * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 glass">
                  <h2 className="text-xl font-bold mb-4">AI Recommendations</h2>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium mb-1">Try morning focus sessions</div>
                          <div className="text-sm text-muted-foreground">Your productivity peaks between 9-11 AM</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium mb-1">Schedule breaks</div>
                          <div className="text-sm text-muted-foreground">Take a 5-min break every 25 minutes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals" className="space-y-6">
                <Card className="p-6 glass">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Active Goals</h2>
                    <Button size="sm" className="bg-gradient-primary glow-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      New Goal
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Complete 50 tasks', current: 23, target: 50 },
                      { title: '100 hours of focus', current: 47, target: 100 },
                      { title: '30-day streak', current: userStats.streak, target: 30 },
                    ].map((goal, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 glass">
                    <h2 className="text-xl font-bold mb-4">Weekly Target</h2>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{completedTasks}/20</div>
                      <p className="text-muted-foreground mb-4">Tasks completed this week</p>
                      <Progress value={(completedTasks / 20) * 100} className="h-3" />
                    </div>
                  </Card>

                  <Card className="p-6 glass">
                    <h2 className="text-xl font-bold mb-4">Monthly Focus</h2>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{userStats.focusMinutes}/500</div>
                      <p className="text-muted-foreground mb-4">Minutes focused this month</p>
                      <Progress value={(userStats.focusMinutes / 500) * 100} className="h-3" />
                    </div>
                  </Card>
                </div>

                <Card className="p-6 glass text-center">
                  <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Stay Motivated!</h2>
                  <p className="text-muted-foreground">
                    You're making great progress. Keep crushing those goals!
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  Zap,
  Trophy,
  Flame,
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Menu,
  X,
  Brain,
  Sparkles,
  Timer,
} from 'lucide-react';

export default function Progress() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data - in production this would come from a database
  const [userData] = useState({
    level: 8,
    xp: 3450,
    totalXP: 4000,
    streak: 14,
    longestStreak: 28,
    tasksCompleted: 127,
    focusMinutes: 1842,
    achievements: [
      { id: 1, name: 'First Steps', desc: 'Complete your first task', unlocked: true, icon: '🎯' },
      { id: 2, name: 'Week Warrior', desc: '7-day streak', unlocked: true, icon: '🔥' },
      { id: 3, name: 'Focus Master', desc: '100 focus sessions', unlocked: true, icon: '⏱️' },
      { id: 4, name: 'Century Club', desc: 'Complete 100 tasks', unlocked: true, icon: '💯' },
      { id: 5, name: 'Early Bird', desc: 'Start session before 8am', unlocked: true, icon: '🌅' },
      { id: 6, name: 'Night Owl', desc: 'Complete task after 10pm', unlocked: true, icon: '🦉' },
      { id: 7, name: 'Consistency King', desc: '30-day streak', unlocked: false, icon: '👑' },
      { id: 8, name: 'Zen Master', desc: '50 mindfulness sessions', unlocked: false, icon: '🧘' },
      { id: 9, name: 'Productivity Pro', desc: 'Reach level 10', unlocked: false, icon: '⚡' },
    ],
    weeklyData: [
      { day: 'Mon', tasks: 8, minutes: 125 },
      { day: 'Tue', tasks: 12, minutes: 180 },
      { day: 'Wed', tasks: 10, minutes: 150 },
      { day: 'Thu', tasks: 15, minutes: 210 },
      { day: 'Fri', tasks: 9, minutes: 135 },
      { day: 'Sat', tasks: 6, minutes: 90 },
      { day: 'Sun', tasks: 7, minutes: 105 },
    ],
    recentMilestones: [
      { date: '2 days ago', text: 'Reached Level 8!', icon: '🎉' },
      { date: '1 week ago', text: 'Unlocked "Focus Master"', icon: '⏱️' },
      { date: '2 weeks ago', text: 'Completed 100th task!', icon: '💯' },
    ],
  });

  const xpProgress = ((userData.xp % 1000) / 1000) * 100;
  const nextLevel = Math.floor(userData.xp / 1000) + 1;
  const xpNeeded = (nextLevel * 1000) - userData.xp;

  const maxTasks = Math.max(...userData.weeklyData.map(d => d.tasks));
  const maxMinutes = Math.max(...userData.weeklyData.map(d => d.minutes));

  return (
    <div className="min-h-screen bg-background">
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
                <Clock className="mr-2 h-4 w-4" />
                Focus Mode
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="default" className="w-full justify-start bg-primary">
                <Trophy className="mr-2 h-4 w-4" />
                Progress
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="h-10 w-10 text-primary" />
                Your Progress
              </h1>
              <p className="text-muted-foreground">Track your journey to better focus and productivity</p>
            </div>

            {/* Level & XP Card */}
            <Card className="p-8 glass bg-gradient-glow border-primary/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 relative">
                  <div className="text-center">
                    <Trophy className="h-12 w-12 text-background mx-auto mb-1" />
                    <span className="text-3xl font-bold text-background">{userData.level}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary border-4 border-card flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-background" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">Level {userData.level}</h2>
                  <p className="text-muted-foreground mb-4">
                    {xpNeeded} XP until Level {nextLevel}
                  </p>
                  <ProgressBar value={xpProgress} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {userData.xp.toLocaleString()} / {userData.totalXP.toLocaleString()} XP
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <Flame className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{userData.streak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{userData.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks Done</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Focus Time</span>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{userData.focusMinutes}</p>
                <p className="text-xs text-muted-foreground">minutes ({(userData.focusMinutes / 60).toFixed(1)} hours)</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Longest Streak</span>
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{userData.longestStreak}</p>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">
                  {userData.achievements.filter(a => a.unlocked).length}/{userData.achievements.length}
                </p>
                <p className="text-xs text-muted-foreground">unlocked</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{userData.weeklyData.reduce((sum, d) => sum + d.tasks, 0)}</p>
                <p className="text-xs text-muted-foreground">tasks completed</p>
              </Card>
            </div>

            {/* Tabs for detailed views */}
            <Tabs defaultValue="week" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>

              {/* This Week Tab */}
              <TabsContent value="week" className="space-y-4">
                <Card className="p-6 glass">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Weekly Activity
                  </h3>
                  <div className="space-y-6">
                    {/* Tasks Chart */}
                    <div>
                      <p className="text-sm font-medium mb-3 text-muted-foreground">Tasks Completed</p>
                      <div className="space-y-2">
                        {userData.weeklyData.map((day, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-8 text-muted-foreground">{day.day}</span>
                            <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-gradient-primary flex items-center justify-end pr-2 transition-all duration-500"
                                style={{ width: `${(day.tasks / maxTasks) * 100}%` }}
                              >
                                <span className="text-xs font-medium text-background">{day.tasks}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Focus Minutes Chart */}
                    <div>
                      <p className="text-sm font-medium mb-3 text-muted-foreground">Focus Minutes</p>
                      <div className="space-y-2">
                        {userData.weeklyData.map((day, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-8 text-muted-foreground">{day.day}</span>
                            <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-primary/70 flex items-center justify-end pr-2 transition-all duration-500"
                                style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                              >
                                <span className="text-xs font-medium text-background">{day.minutes}m</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card className="p-6 glass">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Achievements ({userData.achievements.filter(a => a.unlocked).length}/{userData.achievements.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`p-4 ${
                          achievement.unlocked
                            ? 'glass border-primary/30 hover-lift'
                            : 'bg-muted/20 border-border/30 opacity-60'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{achievement.icon}</div>
                          <h4 className="font-semibold mb-1">{achievement.name}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                          {achievement.unlocked && (
                            <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Milestones Tab */}
              <TabsContent value="milestones">
                <Card className="p-6 glass">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Recent Milestones
                  </h3>
                  <div className="space-y-4">
                    {userData.recentMilestones.map((milestone, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gradient-glow border border-primary/20 hover-lift"
                      >
                        <div className="text-3xl">{milestone.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium">{milestone.text}</p>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Motivational CTA */}
            <Card className="p-8 glass bg-gradient-glow text-center border-primary/20">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Keep Going! 🚀</h2>
              <p className="text-muted-foreground mb-6">
                You're {xpNeeded} XP away from Level {nextLevel}. Complete more tasks to level up!
              </p>
              <Link to="/tasks">
                <Button size="lg" className="bg-gradient-primary glow-primary">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  View My Tasks
                </Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

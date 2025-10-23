import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAppContext } from '@/context/AppDataContext';
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
} from 'lucide-react';

export default function Progress() {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    setWeeklyData(appContext.getWeeklyStats());
  }, [appContext.dailyStats]);

  const maxTasks = Math.max(...weeklyData.map(d => d.tasks), 1);
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 1);

  const unlockedAchievements = appContext.achievements.filter(a => a.unlocked);

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
                Your Progress
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

            {/* Level Card */}
            <Card className="p-8 glass bg-gradient-glow border-primary/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <div className="text-center">
                    <Trophy className="h-10 w-10 text-background mx-auto mb-1" />
                    <span className="text-3xl font-bold text-background">{appContext.userProgress.level}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">Level {appContext.userProgress.level}</h2>
                  <p className="text-muted-foreground mb-3">
                    {appContext.userProgress.maxLevelXp - appContext.userProgress.currentLevelXp} XP until Level {appContext.userProgress.level + 1}
                  </p>
                  <ProgressBar value={appContext.userProgress.currentLevelXp / appContext.userProgress.maxLevelXp * 100} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round((appContext.userProgress.currentLevelXp / appContext.userProgress.maxLevelXp) * 100)}% complete
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
                    <Flame className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold">{appContext.userProgress.streak}</p>
                    <p className="text-xs text-muted-foreground">Days</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
                    <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold">{appContext.userProgress.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
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
                <p className="text-3xl font-bold">{appContext.userProgress.focusMinutes}</p>
                <p className="text-xs text-muted-foreground">minutes ({(appContext.userProgress.focusMinutes / 60).toFixed(1)} hours)</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Longest Streak</span>
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{appContext.userProgress.longestStreak}</p>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">
                  {unlockedAchievements.length}/{appContext.achievements.length}
                </p>
                <p className="text-xs text-muted-foreground">unlocked</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{weeklyData.reduce((sum, d) => sum + d.tasks, 0)}</p>
                <p className="text-xs text-muted-foreground">tasks completed</p>
              </Card>
            </div>

            {/* Tabs for detailed views */}
            <Tabs defaultValue="week" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="xp">XP & Levels</TabsTrigger>
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
                        {weeklyData.map((day, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-8 text-muted-foreground">{day.day}</span>
                            <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-gradient-primary flex items-center justify-end pr-2 transition-all duration-500"
                                style={{ width: `${(day.tasks / maxTasks) * 100}%` }}
                              >
                                {day.tasks > 0 && <span className="text-xs font-medium text-background">{day.tasks}</span>}
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
                        {weeklyData.map((day, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-8 text-muted-foreground">{day.day}</span>
                            <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-primary/70 flex items-center justify-end pr-2 transition-all duration-500"
                                style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                              >
                                {day.minutes > 0 && <span className="text-xs font-medium text-background">{day.minutes}m</span>}
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
                    Achievements ({unlockedAchievements.length}/{appContext.achievements.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appContext.achievements.map((achievement) => (
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

              {/* XP & Levels Tab */}
              <TabsContent value="xp">
                <Card className="p-6 glass">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    XP & Level Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-gradient-glow border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Total XP Earned</p>
                        <p className="text-4xl font-bold text-primary">{appContext.userProgress.xp}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-glow border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Current Level</p>
                        <p className="text-4xl font-bold text-primary">{appContext.userProgress.level}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">How to Earn XP</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>✓ Complete a task: +10-25 XP (based on priority)</p>
                        <p>✓ Focus session: +5 XP per 5 minutes</p>
                        <p>✓ Breathing exercise: +5 XP</p>
                        <p>✓ Body doubling: +1 XP per 10 minutes</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Level Progression</h4>
                      <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const level = i + 1;
                          const isCurrentOrPast = level <= appContext.userProgress.level;
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                  isCurrentOrPast
                                    ? 'bg-primary text-background'
                                    : 'bg-muted/30 text-muted-foreground'
                                }`}
                              >
                                {level}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  Level {level} {level === appContext.userProgress.level && '(Current)'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {level === appContext.userProgress.level
                                    ? `${appContext.userProgress.maxLevelXp - appContext.userProgress.currentLevelXp} XP until next level`
                                    : `${level * 100} total XP to reach`}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* CTA */}
            <Card className="p-8 glass bg-gradient-glow text-center border-primary/20">
              <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">You're Doing Great! 🚀</h2>
              <p className="text-muted-foreground mb-6">
                Keep completing tasks and focus sessions to reach Level {appContext.userProgress.level + 1}
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary glow-primary">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Back to Dashboard
                </Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

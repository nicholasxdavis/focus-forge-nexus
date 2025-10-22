import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  Zap,
  Trophy,
  Target,
  Timer,
  CheckCircle2,
  Flame,
  Star,
  Award,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';

export default function ProgressPage() {
  const { t } = useTranslation();

  const stats = {
    level: 12,
    xp: 2340,
    xpToNext: 3000,
    streak: 23,
    totalFocusTime: 1245,
    tasksCompleted: 187,
    weeklyFocusTime: 420,
  };

  const achievements = [
    { icon: Flame, title: 'Week Warrior', desc: '7-day streak', unlocked: true },
    { icon: Star, title: 'Focus Master', desc: '100 hours focused', unlocked: true },
    { icon: Award, title: 'Task Crusher', desc: 'Complete 100 tasks', unlocked: true },
    { icon: Trophy, title: 'Level 10', desc: 'Reach level 10', unlocked: true },
    { icon: Target, title: 'Perfect Week', desc: 'Complete all tasks for a week', unlocked: false },
    { icon: TrendingUp, title: 'Consistency King', desc: '30-day streak', unlocked: false },
  ];

  const weeklyData = [
    { day: 'Mon', minutes: 65 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 80 },
    { day: 'Thu', minutes: 55 },
    { day: 'Fri', minutes: 90 },
    { day: 'Sat', minutes: 40 },
    { day: 'Sun', minutes: 45 },
  ];

  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));

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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Keep crushing it, focus warrior! 🚀</p>
          </div>

          {/* Level Card */}
          <Card className="p-8 glass bg-gradient-glow border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
                  {stats.level}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Level {stats.level}</h2>
                  <p className="text-sm text-muted-foreground">Focus Master</p>
                </div>
              </div>
              <Trophy className="h-12 w-12 text-primary animate-glow-pulse" />
            </div>
            <Progress value={(stats.xp / stats.xpToNext) * 100} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {stats.xp} / {stats.xpToNext} XP to Level {stats.level + 1}
            </p>
          </Card>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{stats.streak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Focus Time</span>
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{Math.floor(stats.totalFocusTime / 60)}</p>
              <p className="text-xs text-muted-foreground">hours</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Tasks Completed</span>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{stats.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">all time</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">This Week</span>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{Math.floor(stats.weeklyFocusTime / 60)}</p>
              <p className="text-xs text-muted-foreground">hours focused</p>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card className="p-6 glass">
            <h2 className="text-xl font-bold mb-6">This Week's Focus</h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-primary rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(day.minutes / maxMinutes) * 160}px` }}
                      title={`${day.minutes} minutes`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, i) => (
                <Card
                  key={i}
                  className={`p-6 glass hover-lift ${
                    achievement.unlocked
                      ? 'border-primary/30 bg-primary/5'
                      : 'opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <achievement.icon
                        className={`h-6 w-6 ${
                          achievement.unlocked ? 'text-background' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Unlocked!
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

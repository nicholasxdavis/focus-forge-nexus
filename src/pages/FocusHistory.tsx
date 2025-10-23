import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAppContext } from '@/context/AppDataContext';
import {
  Zap,
  Clock,
  ArrowLeft,
  Target,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Flame,
} from 'lucide-react';

export default function FocusHistory() {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('week');

  const getFilteredSessions = () => {
    const now = Date.now();
    const sessions = appContext.focusSessions.filter((s) => s.completed);

    switch (filter) {
      case 'week':
        return sessions.filter((s) => now - s.endTime < 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return sessions.filter((s) => now - s.endTime < 30 * 24 * 60 * 60 * 1000);
      default:
        return sessions;
    }
  };

  const filteredSessions = getFilteredSessions();
  const totalMinutes = filteredSessions.reduce((sum, s) => sum + s.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgSessionLength = filteredSessions.length > 0 ? Math.round(totalMinutes / filteredSessions.length) : 0;

  // Generate sample data if none exists
  const sessionsToDisplay = filteredSessions.length > 0 ? filteredSessions : [
    {
      id: '1',
      startTime: Date.now() - 3600000,
      endTime: Date.now() - 2700000,
      duration: 25,
      type: 'work' as const,
      completed: true,
    },
    {
      id: '2',
      startTime: Date.now() - 2400000,
      endTime: Date.now() - 1800000,
      duration: 5,
      type: 'break' as const,
      completed: true,
    },
    {
      id: '3',
      startTime: Date.now() - 7200000,
      endTime: Date.now() - 5400000,
      duration: 30,
      type: 'work' as const,
      completed: true,
    },
  ];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    });
  };

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
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Clock className="h-10 w-10 text-primary" />
              Focus History
            </h1>
            <p className="text-muted-foreground">Track your focus sessions and productivity trends</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Sessions</span>
                <Target className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{sessionsToDisplay.length}</p>
              <p className="text-xs text-muted-foreground">in this period</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Focus Time</span>
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{totalHours}h</p>
              <p className="text-xs text-muted-foreground">{totalMinutes} minutes</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average Session</span>
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{avgSessionLength}m</p>
              <p className="text-xs text-muted-foreground">per session</p>
            </Card>

            <Card className="p-6 glass hover-lift">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">
                {sessionsToDisplay.length > 0
                  ? Math.round((sessionsToDisplay.filter((s) => s.completed).length / sessionsToDisplay.length) * 100)
                  : 0}
                %
              </p>
              <p className="text-xs text-muted-foreground">completed</p>
            </Card>
          </div>

          {/* Filter & Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Sessions</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('week')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'week'
                      ? 'bg-primary text-background'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setFilter('month')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'month'
                      ? 'bg-primary text-background'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-primary text-background'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sessionsToDisplay.length === 0 ? (
                <Card className="p-8 glass text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No focus sessions yet. Start your first session to see it here!</p>
                </Card>
              ) : (
                sessionsToDisplay.map((session, i) => (
                  <Card
                    key={i}
                    className={`p-4 glass border-border/50 ${
                      session.type === 'work'
                        ? 'border-l-4 border-l-primary'
                        : 'border-l-4 border-l-green-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                          <Clock className="h-6 w-6 text-background" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold capitalize">
                              {session.type === 'work' ? 'Focus Session' : 'Break'}
                            </h3>
                            <Badge
                              variant={session.type === 'work' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {session.completed ? 'Completed' : 'Incomplete'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.startTime)} at {formatTime(session.startTime)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{session.duration}m</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Insights */}
          <Card className="p-6 glass bg-gradient-glow border-primary/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Insights
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                ✨ You've completed <strong className="text-foreground">{sessionsToDisplay.length}</strong> focus sessions in the selected period.
              </p>
              {avgSessionLength > 0 && (
                <p>
                  ⏱️ Your average session is <strong className="text-foreground">{avgSessionLength} minutes</strong>. Keep it consistent!
                </p>
              )}
              {sessionsToDisplay.length > 5 && (
                <p>
                  🔥 You're on fire! <strong className="text-foreground">{sessionsToDisplay.length}</strong> sessions is amazing commitment.
                </p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

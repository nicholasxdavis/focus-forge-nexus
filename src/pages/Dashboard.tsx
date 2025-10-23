import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { TutorialTooltip } from '@/components/TutorialTooltip';
import { RatingPopup } from '@/components/RatingPopup';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BodyDoublingSession } from '@/components/BodyDoublingSession';
import { SmartReminders } from '@/components/SmartReminders';
import { useAppContext } from '@/context/AppDataContext';
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
  Mic,
  Loader2,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showBodyDoubling, setShowBodyDoubling] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setNewTask(transcript.trim());
        }
        setIsListening(false);
      };
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      setRecognition(recognitionInstance);
    }

    // Check if user is new
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenOnboarding && !hasSeenTutorial) {
      setTimeout(() => setShowTutorial(true), 1000);
    }

    const sessionCount = parseInt(localStorage.getItem('sessionCount') || '0');
    if (sessionCount > 5 && !localStorage.getItem('hasRated')) {
      setTimeout(() => setShowRating(true), 10000);
    }

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

  const addTask = () => {
    if (!newTask.trim()) return;
    appContext.addTask({
      title: newTask,
      notes: '',
      completed: false,
      priority: 'medium',
    });
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    const task = appContext.tasks.find((t) => t.id === id);
    if (task) {
      appContext.updateTask(id, { 
        completed: !task.completed,
        completedAt: !task.completed ? Date.now() : undefined
      });
    }
  };

  const startVoiceCapture = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const todayTasks = appContext.getTodayTasks();
  const completedTasks = appContext.getCompletedTasksToday();
  const progressPercent = appContext.tasks.length > 0 ? (completedTasks / appContext.tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      {showOnboarding && <OnboardingFlow onComplete={handleOnboardingComplete} />}

      {/* Rating Popup */}
      {showRating && <RatingPopup onClose={() => setShowRating(false)} />}

      {/* Body Doubling Session */}
      <BodyDoublingSession open={showBodyDoubling} onOpenChange={setShowBodyDoubling} />

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
              <Button variant="ghost" className="w-full justify-start bg-primary/10">
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
                Your Progress
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
                  <p className="text-3xl font-bold">{appContext.userProgress.streak}</p>
                  <p className="text-xs text-muted-foreground">{t('dashboard.days')}</p>
                </Card>
              </TutorialTooltip>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('dashboard.level')}</span>
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{appContext.userProgress.level}</p>
                <Progress value={appContext.userProgress.currentLevelXp / appContext.userProgress.maxLevelXp * 100} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {appContext.userProgress.maxLevelXp - appContext.userProgress.currentLevelXp} XP to next level
                </p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('dashboard.focusTime')}</span>
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{appContext.userProgress.focusMinutes}</p>
                <p className="text-xs text-muted-foreground">{t('dashboard.minutes')}</p>
              </Card>

              <Card className="p-6 glass hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Tasks Done</span>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{appContext.userProgress.tasksCompleted}</p>
                <Progress value={Math.min(progressPercent, 100)} className="mt-2 h-2" />
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
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    placeholder={t('dashboard.quickAdd')}
                    className="flex-1 bg-background/50"
                  />
                  <Button onClick={addTask} className="bg-gradient-primary glow-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard.addTask')}
                  </Button>
                  <Button
                    onClick={startVoiceCapture}
                    variant="outline"
                    size="icon"
                    className={isListening ? 'bg-red-500/20 border-red-500' : ''}
                    title="Capture task by voice"
                  >
                    {isListening ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 {isListening ? 'Listening...' : 'Click the mic to capture tasks by voice'}
                </p>
              </Card>
            </TutorialTooltip>

            {/* Today's Tasks */}
            <TutorialTooltip
              isActive={showTutorial && tutorialStep === 0}
              content={t('tutorial.step1')}
              position="top"
              onNext={handleTutorialNext}
            >
              <Card className="p-6 glass">
                <h2 className="text-2xl font-bold mb-4">{t('dashboard.todayTasks')}</h2>
                {todayTasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t('dashboard.noTasks')}</p>
                ) : (
                  <div className="space-y-2">
                    {todayTasks.map((task) => (
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
                        <span
                          className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            task.priority === 'high'
                              ? 'destructive'
                              : task.priority === 'medium'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TutorialTooltip>

            {/* CTA Section */}
            <TutorialTooltip
              isActive={showTutorial && tutorialStep === 2}
              content={t('tutorial.step3')}
              position="top"
              onNext={handleTutorialNext}
            >
              <Card className="p-8 glass bg-gradient-glow text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Focus?</h2>
                <p className="text-muted-foreground mb-6">
                  Start a focus session and crush your tasks with visual timers and breathing breaks.
                </p>
                <Link to="/focus">
                  <Button size="lg" className="bg-gradient-primary glow-primary">
                    <Timer className="mr-2 h-5 w-5" />
                    {t('dashboard.startFocus')}
                  </Button>
                </Link>
              </Card>
            </TutorialTooltip>

            {/* Body Doubling CTA */}
            <Card
              className="p-8 glass hover-lift cursor-pointer border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
              onClick={() => setShowBodyDoubling(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Users className="h-8 w-8 text-background" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Try Body Doubling</h3>
                    <p className="text-muted-foreground max-w-md">
                      Work alongside virtual co-workers. Perfect for ADHD brains that need that little push to stay focused.
                    </p>
                  </div>
                </div>
                <Button size="lg" variant="default" className="bg-gradient-primary glow-primary shrink-0">
                  Start
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

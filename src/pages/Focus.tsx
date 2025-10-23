import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAppContext } from '@/context/AppDataContext';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Wind,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function Focus() {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [breathingExercisesCompleted, setBreathingExercisesCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedMinutesRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (!isBreak) {
      // Work session completed
      const sessionMinutes = (Date.now() - startTimeRef.current) / 60000;
      accumulatedMinutesRef.current += workDuration; // Use configured duration, not actual
      appContext.recordFocusSession(workDuration);
      setSessionsCompleted((prev) => prev + 1);

      // Switch to break
      setIsBreak(true);
      setTimeLeft(breakDuration * 60);
    } else {
      // Break completed
      setIsBreak(false);
      setTimeLeft(workDuration * 60);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
    setSessionsCompleted(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = isBreak
    ? ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100
    : ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100;

  // Breathing exercise
  useEffect(() => {
    if (showBreathingExercise) {
      const phases: Array<'inhale' | 'hold' | 'exhale'> = ['inhale', 'hold', 'exhale'];
      const durations = { inhale: 4000, hold: 4000, exhale: 6000 };
      let currentPhaseIndex = 0;

      const breathingInterval = setInterval(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setBreathingPhase(phases[currentPhaseIndex]);
      }, durations[breathingPhase]);

      return () => clearInterval(breathingInterval);
    }
  }, [showBreathingExercise, breathingPhase]);

  const handleBreathingClose = () => {
    setShowBreathingExercise(false);
    if (breathingExercisesCompleted < 10) {
      setBreathingExercisesCompleted((prev) => prev + 1);
      appContext.awardXP(5); // Award XP for completing breathing exercise
    }
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{t('focus.title')}</h1>
            <p className="text-muted-foreground">{t('focus.selectTask')}</p>
          </div>

          {/* Timer Display */}
          <Card className="p-12 glass text-center space-y-6">
            <div className="relative">
              {/* Circular progress */}
              <div className="relative w-64 h-64 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercent / 100)}`}
                    className="transition-all duration-1000 glow-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold mb-2">{formatTime(timeLeft)}</div>
                  <Badge variant={isBreak ? 'secondary' : 'default'} className="text-sm">
                    {isBreak ? 'Break Time ☕' : 'Focus Time 🎯'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center flex-wrap">
              {!isRunning ? (
                <Button
                  size="lg"
                  onClick={handleStart}
                  className="bg-gradient-primary glow-primary px-8"
                >
                  <Play className="h-5 w-5 mr-2" fill="currentColor" />
                  {t('focus.startSession')}
                </Button>
              ) : (
                <Button size="lg" onClick={handlePause} variant="outline" className="px-8">
                  <Pause className="h-5 w-5 mr-2" />
                  {t('focus.pause')}
                </Button>
              )}
              <Button size="lg" onClick={handleReset} variant="ghost">
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground">Sessions Today</p>
                <p className="text-2xl font-bold">{sessionsCompleted}</p>
              </div>
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground">Total Focus Time</p>
                <p className="text-2xl font-bold">{appContext.userProgress.focusMinutes}m</p>
              </div>
            </div>
          </Card>

          {/* Settings */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 glass">
              <label className="block text-sm font-medium mb-2">{t('focus.workDuration')}</label>
              <Select
                value={workDuration.toString()}
                onValueChange={(value) => {
                  const newDuration = parseInt(value);
                  setWorkDuration(newDuration);
                  if (!isRunning && !isBreak) {
                    setTimeLeft(newDuration * 60);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="25">25 min (Pomodoro)</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 glass">
              <label className="block text-sm font-medium mb-2">{t('focus.breakDuration')}</label>
              <Select
                value={breakDuration.toString()}
                onValueChange={(value) => setBreakDuration(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </div>

          {/* Breathing Exercise CTA */}
          <Card
            className="p-6 glass hover-lift cursor-pointer"
            onClick={() => setShowBreathingExercise(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Wind className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('focus.breathe')}</h3>
                  <p className="text-sm text-muted-foreground">{t('focus.breatheDesc')}</p>
                </div>
              </div>
              <Button variant="outline">Start</Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Breathing Exercise Modal */}
      <Dialog open={showBreathingExercise} onOpenChange={setShowBreathingExercise}>
        <DialogContent className="sm:max-w-md glass border-primary/20 p-0 overflow-hidden">
          <div className="flex flex-col items-center justify-center min-h-screen sm:min-h-auto py-12 px-4 sm:p-12 text-center space-y-12 sm:space-y-8">
            <div className="relative">
              <div
                className={`w-40 h-40 mx-auto rounded-full bg-gradient-primary transition-all duration-1000 ${
                  breathingPhase === 'inhale'
                    ? 'scale-150 opacity-80'
                    : breathingPhase === 'hold'
                    ? 'scale-150 opacity-100'
                    : 'scale-100 opacity-60'
                }`}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold capitalize">{breathingPhase}</h2>
              <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                {breathingPhase === 'inhale' && 'Breathe in slowly through your nose...'}
                {breathingPhase === 'hold' && 'Hold your breath gently...'}
                {breathingPhase === 'exhale' && 'Exhale slowly through your mouth...'}
              </p>
            </div>

            <Button
              onClick={handleBreathingClose}
              variant="outline"
              className="w-full sm:w-auto mt-8 sm:mt-0"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

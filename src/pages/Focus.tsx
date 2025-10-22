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
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
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
    
    // Play completion sound (optional)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCuAzPLaizsIGGS56+ybTg4PWrHq8Kt2KAU6j9ryz3g0AyZ+zPPalT0LGnO96e6VQQoRYrfq6KJQEw1NqeHxtGIaBy6I1/DQYx4DK3vL8NqMPgkZbrzt8JVBChVvvOvqmVcKFGKz6OSzYRoEOI/Y8dFyLwMoesz02YI9CRVvvO7tl0QIFm256+udUQ0MUqnf7rVvHAU2jNrx2nwzAyluy/HeiFEKGmW75++gTAoQW7Pq65VZBQ9SqN/us2MaBS+H1/HReC4EJnLH89qJOwkWar3u8JlECRlpu+vsmE0LElyl5O+xYBsFN4zZ8sx1OQQkcMrz24I9BhhntPDoklQKEVqy5vCZVgoRXbPq7KFSDxNcr+Twm0IBF127SY7MjkuNS5BSlFWYWZ1cn2CiZKVoqm2tcbF0tHi4e7yAv4TDiMeNy5HPlNOY1+Dc5ODk6ejt7PH09tj6/f4AAA==');
    audio.play().catch(() => {});

    if (!isBreak) {
      setIsBreak(true);
      setTimeLeft(breakDuration * 60);
    } else {
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
                    {isBreak ? 'Break Time' : 'Focus Time'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
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
          </Card>

          {/* Settings */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 glass">
              <label className="block text-sm font-medium mb-2">{t('focus.workDuration')}</label>
              <Select
                value={workDuration.toString()}
                onValueChange={(value) => {
                  setWorkDuration(parseInt(value));
                  if (!isRunning && !isBreak) {
                    setTimeLeft(parseInt(value) * 60);
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
          <div className="p-12 text-center space-y-8">
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

            <div>
              <h2 className="text-4xl font-bold mb-2 capitalize">{breathingPhase}</h2>
              <p className="text-muted-foreground">
                {breathingPhase === 'inhale' && 'Breathe in slowly through your nose...'}
                {breathingPhase === 'hold' && 'Hold your breath gently...'}
                {breathingPhase === 'exhale' && 'Exhale slowly through your mouth...'}
              </p>
            </div>

            <Button
              onClick={() => setShowBreathingExercise(false)}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

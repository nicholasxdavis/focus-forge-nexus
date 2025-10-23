import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppContext } from '@/context/AppDataContext';
import {
  Users,
  Play,
  StopCircle,
  Clock,
} from 'lucide-react';

interface BodyDoublingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BodyDoublingSession: React.FC<BodyDoublingProps> = ({ open, onOpenChange }) => {
  const appContext = useAppContext();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [activeUsers, setActiveUsers] = useState(2);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setSessionTime(0);
    setActiveUsers(Math.floor(Math.random() * 5) + 1);
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    const minutes = Math.round(sessionTime / 60);
    if (minutes > 0) {
      appContext.recordBodyDoublingSession(minutes);
    }
    setSessionTime(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-primary/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Body Doubling Session
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Timer */}
          <Card className="p-8 glass bg-gradient-glow text-center">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Session Time</p>
              <p className="text-6xl font-bold text-primary font-mono">{formatTime(sessionTime)}</p>
            </div>

            {/* Active Users */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                <span className="font-bold text-foreground">{activeUsers}</span> co-workers active
              </p>
            </div>

            {/* Status */}
            <Badge variant={isSessionActive ? 'default' : 'secondary'} className="mb-6">
              {isSessionActive ? 'Session Active 🎯' : 'Ready to Start'}
            </Badge>

            {/* Controls */}
            <div className="flex gap-3 justify-center flex-wrap">
              {!isSessionActive ? (
                <Button
                  onClick={handleStartSession}
                  className="bg-gradient-primary glow-primary"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" fill="currentColor" />
                  Start Body Doubling
                </Button>
              ) : (
                <Button
                  onClick={handleEndSession}
                  variant="destructive"
                  size="lg"
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  End Session ({Math.round(sessionTime / 60)} min)
                </Button>
              )}
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-4 glass border-primary/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              What is Body Doubling?
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Body doubling is a powerful ADHD productivity technique where you work alongside others. The virtual co-working space simulates being with others, which helps many ADHD brains stay focused and accountable.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ No pressure to talk - just work together</p>
              <p>✓ Great for breaking procrastination</p>
              <p>✓ Earn XP for focused co-working time</p>
              <p>✓ Build a supportive community</p>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-4 glass border-primary/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground">Total Co-working Time</p>
                <p className="text-2xl font-bold">{appContext.userProgress.bodyDoublingMinutes}m</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground">Sessions This Week</p>
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 3) + 1}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

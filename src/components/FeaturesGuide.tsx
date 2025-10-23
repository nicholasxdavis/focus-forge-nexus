import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Timer,
  Trophy,
  Wind,
  Target,
  Brain,
  Mic,
  Users,
  CheckCircle2,
  TrendingUp,
  X,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Quick Task Capture',
    description: 'Voice or text - dump ideas before they vanish. Auto-organized into actionable tasks.',
    badge: '🗣️ Voice Ready',
  },
  {
    icon: Timer,
    title: 'Visual Focus Timers',
    description: 'See time instead of feeling lost in it. Customizable Pomodoro sessions that actually work.',
    badge: '⏱️ Pomodoro',
  },
  {
    icon: Trophy,
    title: 'Earn Rewards & Level Up',
    description: 'Points, badges, and celebrations for every win. Your brain craves dopamine—we deliver it.',
    badge: '✨ Gamified',
  },
  {
    icon: Wind,
    title: 'Mindfulness & Breathing',
    description: 'Quick resets when you\'re overwhelmed. Science-backed breathing exercises to refocus.',
    badge: '🧘 Wellness',
  },
  {
    icon: Users,
    title: 'Body Doubling Sessions',
    description: 'Work with virtual co-workers. Perfect for ADHD brains that need accountability and presence.',
    badge: '👥 Co-working',
  },
  {
    icon: Target,
    title: 'Flexible Organization',
    description: 'No rigid folders. Task priorities, notes, and a system that adapts to your natural style.',
    badge: '📋 Flexible',
  },
  {
    icon: CheckCircle2,
    title: 'Task Tracking',
    description: 'Unlimited projects and tasks. Track what matters and celebrate every completion.',
    badge: '✓ Unlimited',
  },
  {
    icon: TrendingUp,
    title: 'Detailed Analytics',
    description: 'See your progress with beautiful charts. Weekly stats, achievements, and personal records.',
    badge: '📊 Analytics',
  },
  {
    icon: Brain,
    title: 'Smart Reminders',
    description: 'Context-aware notifications that help when you need them most. No noise, only value.',
    badge: '🎯 Smart',
  },
];

interface FeaturesGuideProps {
  onClose?: () => void;
  compact?: boolean;
}

export const FeaturesGuide: React.FC<FeaturesGuideProps> = ({ onClose, compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <Card className="p-6 glass hover-lift border-primary/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          All Your ADHD-Friendly Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {FEATURES.slice(0, 6).map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <feature.icon className="h-4 w-4 text-primary shrink-0" />
              <p className="text-xs font-medium">{feature.title}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setExpanded(true)} variant="outline" size="sm" className="w-full">
          See All Features →
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your ADHD-Friendly Toolkit</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-muted-foreground">
        Everything you need to work WITH your ADHD brain, not against it. Here's what you can do:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Card key={i} className="p-4 glass hover-lift border-border/50 group">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="h-5 w-5 text-background" />
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">
                  {feature.badge}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 glass bg-gradient-glow border-primary/20">
        <p className="text-sm font-medium mb-2">💡 Pro Tip:</p>
        <p className="text-xs text-muted-foreground">
          You don't need to use everything at once. Start with what feels right, then explore as you get comfortable. There's no "wrong" way to use BetterFocus.
        </p>
      </Card>
    </div>
  );
};

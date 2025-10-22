import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TutorialTooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isActive: boolean;
  onNext: () => void;
}

export const TutorialTooltip = ({
  children,
  content,
  position = 'bottom',
  isActive,
  onNext,
}: TutorialTooltipProps) => {
  if (!isActive) return <>{children}</>;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative">
      {/* Highlight overlay */}
      <div className="relative z-50 animate-glow-pulse rounded-lg">
        {children}
      </div>

      {/* Tooltip */}
      <Card
        className={`absolute z-50 ${positionClasses[position]} w-80 p-4 glass border-primary/30 shadow-lg animate-fade-in`}
      >
        <p className="text-sm mb-3">{content}</p>
        <Button
          size="sm"
          onClick={onNext}
          className="w-full bg-gradient-primary text-sm"
        >
          Got it! →
        </Button>
      </Card>

      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onNext} />
    </div>
  );
};

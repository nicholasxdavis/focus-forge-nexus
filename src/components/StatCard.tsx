import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  highlight = false,
}: StatCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card
      className={`p-6 glass hover-lift transition-all duration-300 animate-fade-in ${
        highlight ? 'border-primary/50 shadow-[0_0_20px_rgba(13,213,200,0.15)]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className={`h-5 w-5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {subtitle && (
        <p className={`text-xs ${trend ? trendColors[trend] : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
    </Card>
  );
}

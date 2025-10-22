import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface RatingPopupProps {
  onClose: () => void;
}

export const RatingPopup = ({ onClose }: RatingPopupProps) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRate = (stars: number) => {
    setRating(stars);
    localStorage.setItem('hasRated', 'true');
    setTimeout(() => {
      if (stars >= 4) {
        // Redirect to app store or show thank you
        window.open('https://apps.apple.com', '_blank');
      }
      onClose();
    }, 500);
  };

  const handleLater = () => {
    localStorage.setItem('ratingPostponed', Date.now().toString());
    onClose();
  };

  const handleNever = () => {
    localStorage.setItem('hasRated', 'true');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-primary/20">
        <div className="text-center space-y-6 py-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-glow-pulse">
              <Heart className="h-8 w-8 text-background" fill="currentColor" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{t('rating.title')}</h2>
            <p className="text-muted-foreground">{t('rating.subtitle')}</p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRate(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-10 w-10 ${
                    (hoveredRating || rating) >= star
                      ? 'text-primary fill-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="animate-fade-in">
              <p className="text-sm text-primary font-medium">
                Thanks for the {rating} star{rating > 1 ? 's' : ''}! 🎉
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4">
            <Button
              onClick={handleLater}
              variant="outline"
              className="w-full"
            >
              {t('rating.later')}
            </Button>
            <Button
              onClick={handleNever}
              variant="ghost"
              className="w-full text-xs text-muted-foreground"
            >
              {t('rating.never')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

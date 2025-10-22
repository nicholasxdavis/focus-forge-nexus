import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Brain, Target, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [challenge, setChallenge] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const canProceed = () => {
    if (step === 1) return challenge !== '';
    if (step === 2) return name !== '';
    return true;
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-2xl glass border-primary/20 p-0 overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
        
        <div className="relative">
          {/* Progress Bar */}
          <div className="h-1 bg-muted">
            <div
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Brain className="h-8 w-8 text-background" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center">{t('onboarding.welcome')}</h2>
                <p className="text-xl text-center text-muted-foreground">{t('onboarding.step1Title')}</p>

                <RadioGroup value={challenge} onValueChange={setChallenge}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
                      <RadioGroupItem value="time" id="time" />
                      <Label htmlFor="time" className="flex-1 cursor-pointer">
                        {t('onboarding.step1Option1')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
                      <RadioGroupItem value="distraction" id="distraction" />
                      <Label htmlFor="distraction" className="flex-1 cursor-pointer">
                        {t('onboarding.step1Option2')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
                      <RadioGroupItem value="forget" id="forget" />
                      <Label htmlFor="forget" className="flex-1 cursor-pointer">
                        {t('onboarding.step1Option3')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="flex-1 cursor-pointer">
                        {t('onboarding.step1Option4')}
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Target className="h-8 w-8 text-background" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center">{t('onboarding.step2Title')}</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('onboarding.step2Name')}</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal">{t('onboarding.step2Goal')}</Label>
                    <Input
                      id="goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Get more work done without burning out"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-glow-pulse">
                    <Sparkles className="h-8 w-8 text-background" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold">{t('onboarding.step3Title')}</h2>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  {t('onboarding.step3Desc')}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={handleSkip}>
                {t('onboarding.skip')}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-primary glow-primary"
              >
                {step === 3 ? t('onboarding.finish') : t('onboarding.next')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

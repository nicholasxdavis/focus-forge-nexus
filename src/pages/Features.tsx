import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Brain, Timer, Trophy, Wind, Sparkles, Target, Zap, Users, Clock, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Features() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const mainFeatures = [
    {
      icon: Sparkles,
      title: t('features.quickCapture'),
      description: t('features.quickCaptureDesc'),
      benefits: [
        'Voice memo capture',
        'Instant text entry',
        'Auto-organization',
        'Tag suggestions',
      ],
    },
    {
      icon: Timer,
      title: t('features.focusTimer'),
      description: t('features.focusTimerDesc'),
      benefits: [
        'Visual countdown',
        'Custom work/break cycles',
        'Progress tracking',
        'Session history',
      ],
    },
    {
      icon: Trophy,
      title: t('features.gamification'),
      description: t('features.gamificationDesc'),
      benefits: [
        'XP & level system',
        'Achievement badges',
        'Daily streaks',
        'Leaderboards (optional)',
      ],
    },
    {
      icon: Wind,
      title: t('features.mindfulness'),
      description: t('features.mindfulnessDesc'),
      benefits: [
        'Guided breathing',
        '1-5 minute sessions',
        'Stress reduction',
        'Focus reset',
      ],
    },
    {
      icon: Target,
      title: t('features.flexible'),
      description: t('features.flexibleDesc'),
      benefits: [
        'Smart auto-tagging',
        'Adaptive sorting',
        'No rigid folders',
        'Chaos-friendly',
      ],
    },
    {
      icon: Brain,
      title: t('features.adaptive'),
      description: t('features.adaptiveDesc'),
      benefits: [
        'Pattern learning',
        'Personalized tips',
        'Optimal timing suggestions',
        'Task breakdown help',
      ],
    },
  ];

  const additionalFeatures = [
    { icon: Zap, title: 'Lightning Fast', desc: 'No lag, instant response' },
    { icon: Users, title: 'Body Doubling', desc: 'Virtual co-working sessions' },
    { icon: Clock, title: 'Time Blocking', desc: 'Visual daily planner' },
    { icon: Heart, title: 'Self-Care', desc: 'Built-in wellness reminders' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('features.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-8 glass hover-lift border-border/50 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <feature.icon className="h-7 w-7 text-background" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-18">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            And So Much More
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feat, i) => (
              <Card
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="p-6 glass text-center hover-lift border-border/50"
              >
                <feat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

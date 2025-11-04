import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import AOS from 'aos';

export default function Pricing() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    'Unlimited tasks & projects',
    'Visual focus timer (Pomodoro)',
    'Task capture (voice & text)',
    'Gamification (XP, levels, streaks)',
    'Mindfulness & breathing exercises',
    'Body doubling sessions',
    'Detailed analytics & progress tracking',
    'ADHD-friendly interface',
    'Mobile & desktop access',
    'Smart reminders',
    'Flexible organization system',
    'All future updates',
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Pricing - 100% Free Forever | BetterFocus"
        description="BetterFocus is completely free for everyone. All features, no limitations, no hidden fees. Productivity tools for ADHD brains should be accessible to all."
      />
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div data-aos="fade-up" className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              100% Free. Forever. 💚
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BetterFocus is completely free for everyone. We believe productivity tools for ADHD brains should be accessible to all. No tricks, no trials, no credit card required.
            </p>
          </div>

          <Card
            data-aos="fade-up"
            className="max-w-2xl mx-auto p-10 glass border-primary/30 shadow-[0_0_30px_rgba(13,213,200,0.15)]"
          >
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="text-7xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  $0
                </span>
                <span className="text-2xl text-muted-foreground ml-3">forever</span>
              </div>
              <p className="text-lg text-muted-foreground mb-2">
                Every feature. No limitations. No hidden fees.
              </p>
              <p className="text-sm text-primary font-medium">
                ✨ Full access to everything BetterFocus offers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/dashboard">
              <Button size="lg" className="w-full bg-gradient-primary glow-primary text-lg py-6 hover-lift transition-all duration-200">
                {t('nav.getStarted')} - It's Free! 🚀
              </Button>
            </Link>
          </Card>

          <div data-aos="fade-up" className="mt-16 text-center space-y-8">
            <Card className="max-w-2xl mx-auto p-8 glass bg-gradient-glow border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Love BetterFocus? ☕</h2>
              <p className="text-muted-foreground mb-6">
                If BetterFocus helps you thrive, consider buying us a coffee! Your support helps us keep the app free and constantly improving for the ADHD community.
              </p>
              <a 
                href="https://buymeacoffee.com/galore" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover-lift">
                  ☕ Support Us on Buy Me a Coffee
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-4">
                100% optional. BetterFocus stays free regardless.
              </p>
            </Card>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Why is BetterFocus free?</h3>
              <p className="text-muted-foreground mb-4">
                We built BetterFocus because we experienced the struggle of living with ADHD firsthand. We know that the people who need productivity tools the most often can't afford expensive subscriptions.
              </p>
              <p className="text-muted-foreground">
                Our mission is simple: make ADHD-friendly productivity accessible to everyone, everywhere. Your success is our reward. ❤️
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Questions? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

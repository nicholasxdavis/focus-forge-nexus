import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Brain, Timer, Trophy, Wind, Sparkles, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: t('features.quickCapture'),
      description: t('features.quickCaptureDesc'),
    },
    {
      icon: Timer,
      title: t('features.focusTimer'),
      description: t('features.focusTimerDesc'),
    },
    {
      icon: Trophy,
      title: t('features.gamification'),
      description: t('features.gamificationDesc'),
    },
    {
      icon: Wind,
      title: t('features.mindfulness'),
      description: t('features.mindfulnessDesc'),
    },
    {
      icon: Target,
      title: t('features.flexible'),
      description: t('features.flexibleDesc'),
    },
    {
      icon: Brain,
      title: t('features.adaptive'),
      description: t('features.adaptiveDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div data-aos="fade-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {t('hero.title')}{' '}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent glow-text">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary glow-primary text-lg px-8 py-6 hover-lift">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary hover-lift">
                  {t('hero.ctaSecondary')}
                </Button>
              </Link>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                ✨ {t('hero.trustedBy')}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>⭐⭐⭐⭐⭐ 4.9/5 rating</span>
                <span>•</span>
                <span>50,000+ active users</span>
                <span>•</span>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-6 glass hover-lift border-border/50 group"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
            Loved by the ADHD Community
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "BetterFocus finally gets it. No more fighting against my brain - this app works WITH me.", author: "Sarah M.", role: "Designer" },
              { quote: "The gamification is genius. I actually WANT to complete tasks now. Who knew productivity could be fun?", author: "Jake T.", role: "Developer" },
              { quote: "Visual timers + flexible organization = game changer. This is what ADHD productivity tools should be.", author: "Maya R.", role: "Student" },
            ].map((testimonial, i) => (
              <Card key={i} data-aos="fade-up" data-aos-delay={i * 100} className="p-6 glass border-border/50">
                <div className="mb-4 text-primary">⭐⭐⭐⭐⭐</div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card
            data-aos="zoom-in"
            className="max-w-4xl mx-auto p-12 glass bg-gradient-glow border-primary/20 text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{t('cta.ready')}</h2>
            <p className="text-xl text-muted-foreground">{t('cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary glow-primary text-lg px-8 py-6">
                  {t('cta.button')}
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">🎉 {t('cta.noCredit')}</p>
              <p className="text-xs text-muted-foreground">Join 50,000+ ADHD minds finding their flow</p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';
import AOS from 'aos';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      desc: 'Built by people who understand ADHD struggles firsthand.',
    },
    {
      icon: Target,
      title: 'Science-Backed',
      desc: 'Every feature grounded in neuroscience and proven strategies.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      desc: 'Shaped by feedback from thousands of ADHD minds.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'Constantly evolving with new research and insights.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div data-aos="fade-up" className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">BetterFocus</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to make productivity work for ADHD brains, not against them.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="prose prose-invert max-w-none space-y-6 mb-16">
            <Card className="p-8 glass border-border/50">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                BetterFocus was born from frustration. Our founder, diagnosed with ADHD as an adult, spent years trying
                every productivity app on the market—only to find they all assumed brains worked the same way.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Traditional to-do lists don't account for time blindness. Rigid schedules ignore fluctuating focus.
                Motivation hacks fail when dopamine dysregulation is real. So we decided to build something different.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                BetterFocus combines neuroscience research, ADHD coaching principles, and real user feedback to create
                a system that adapts to your brain—with visual timers, flexible organization, instant rewards, and
                gentle accountability.
              </p>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <Card
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="p-6 glass hover-lift border-border/50"
                >
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card data-aos="zoom-in" className="p-8 glass bg-gradient-glow border-primary/20 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We're just getting started. Join 50,000+ ADHD minds who've found their flow with BetterFocus. Your
                feedback shapes every update we ship.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary glow-primary">
                  Get Started Free
                </Button>
              </Link>
            </Card>

            <Card data-aos="fade-up" className="p-8 glass border-border/50">
              <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to You</h2>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Always Free
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    BetterFocus will always be 100% free. No paywalls, no premium tiers, no tricks.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Privacy First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is yours. We don't sell it, rent it, or share it. Period.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Constantly Improving
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly updates based on your feedback. We're building this together.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Built for You
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every feature is designed with ADHD brains in mind, not against them.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

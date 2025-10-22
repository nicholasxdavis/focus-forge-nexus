import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import AOS from 'aos';

export default function Pricing() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect to get started',
      features: [
        'Quick task capture',
        'Basic focus timer (25 min)',
        'Up to 20 tasks',
        'Daily achievements',
        'Mobile & desktop',
      ],
      cta: t('nav.getStarted'),
      popular: false,
    },
    {
      name: 'Pro',
      price: '$8',
      period: 'per month',
      description: 'For serious focus warriors',
      features: [
        'Everything in Free',
        'Unlimited tasks',
        'Custom timer lengths',
        'Advanced gamification',
        'Mindfulness exercises',
        'Body doubling sessions',
        'Detailed analytics',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: '$15',
      period: 'per user/month',
      description: 'For groups and families',
      features: [
        'Everything in Pro',
        'Shared workspaces',
        'Team accountability',
        'Admin dashboard',
        'Group focus sessions',
        'Family progress tracking',
        'Bulk billing',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div data-aos="fade-up" className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent {t('nav.pricing')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for your brain. Cancel anytime, no questions asked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`p-8 glass relative ${
                  plan.popular
                    ? 'border-primary/50 shadow-[0_0_30px_rgba(13,213,200,0.15)]'
                    : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary text-background text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/dashboard">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-primary glow-primary'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div data-aos="fade-up" className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include a 14-day free trial. No credit card required to start.
            </p>
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

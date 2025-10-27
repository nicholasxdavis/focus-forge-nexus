import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import AOS from 'aos';

export default function Privacy() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy - BetterFocus"
        description="BetterFocus privacy policy. Learn how we protect your data, what information we collect, and your privacy rights."
      />
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div data-aos="fade-up" className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Your privacy matters. Here's how we protect it.</p>
          </div>
          
          <Card data-aos="fade-up" data-aos-delay="100" className="p-8 glass border-border/50 prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-muted-foreground">
              <strong>Last updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              BetterFocus collects minimal information necessary to provide and improve our services.
              This includes:
            </p>
            <ul>
              <li>Account information (email, name)</li>
              <li>Usage data (tasks created, focus sessions)</li>
              <li>Device and browser information</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide and maintain the BetterFocus service</li>
              <li>Personalize your experience</li>
              <li>Improve our app features</li>
              <li>Communicate with you about updates</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. All data is
              encrypted in transit and at rest.
            </p>

            <h2>4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              We use cookies to improve your experience and analyze usage patterns. You can disable
              cookies in your browser settings.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              BetterFocus integrates with third-party services for analytics and infrastructure.
              These services have their own privacy policies.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              BetterFocus is not intended for children under 13. We do not knowingly collect
              information from children under 13.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              significant changes via email or in-app notification.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:privacy@betterfocus.app">privacy@betterfocus.app</a>
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

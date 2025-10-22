import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-8">Terms of Service</h1>
          
          <Card className="p-8 glass border-border/50 prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using BetterFocus, you accept and agree to be bound by these Terms of
              Service and our Privacy Policy.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              BetterFocus is a productivity application designed for individuals with ADHD. The
              service includes task management, focus timers, gamification, and mindfulness tools.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' use of the service</li>
              <li>Upload harmful code or malware</li>
            </ul>

            <h2>5. Subscription and Payment</h2>
            <p>
              Some features require a paid subscription. Subscriptions automatically renew unless
              cancelled. Refunds are provided according to our refund policy.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of BetterFocus are owned by us and protected
              by copyright, trademark, and other laws.
            </p>

            <h2>7. User Content</h2>
            <p>
              You retain ownership of content you create in BetterFocus. You grant us a license to
              use, store, and display your content as necessary to provide the service.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
              BetterFocus is provided as is without warranties of any kind. We do not guarantee that
              the service will be uninterrupted or error-free.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, or consequential damages
              arising from your use of BetterFocus.
            </p>

            <h2>10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our discretion, without
              notice, for conduct that violates these terms.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We may revise these terms from time to time. Continued use of BetterFocus after changes
              constitutes acceptance of the new terms.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:legal@betterfocus.app">legal@betterfocus.app</a>
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

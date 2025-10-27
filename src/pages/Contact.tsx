import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AOS from 'aos';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter your name.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: 'Message required',
        description: 'Please enter a message.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.message.length > 1000) {
      toast({
        title: 'Message too long',
        description: 'Please keep your message under 1000 characters.',
        variant: 'destructive',
      });
      return;
    }

    // Success
    toast({
      title: 'Message sent! 🎉',
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      value: 'support@betterfocus.app',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team',
      value: 'Available 9am-5pm EST',
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse FAQs and guides',
      value: 'help.betterfocus.app',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us - BetterFocus Support"
        description="Get in touch with the BetterFocus team. We're here to help with questions, feedback, or support. Typically respond within 24 hours."
      />
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div data-aos="fade-up" className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Have questions? Feedback? Just want to say hi? We'd love to hear from you.
            </p>
            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours. Your voice matters to us! 💚
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-6 glass text-center hover-lift border-border/50"
              >
                <method.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="text-sm font-medium text-primary">{method.value}</p>
              </Card>
            ))}
          </div>

          <Card data-aos="fade-up" className="p-8 glass border-border/50 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    maxLength={100}
                    className="transition-all focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    maxLength={255}
                    className="transition-all focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  maxLength={200}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  maxLength={1000}
                  className="transition-all focus:ring-2 focus:ring-primary resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary glow-primary hover-lift">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

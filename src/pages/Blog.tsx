import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import AOS from 'aos';

export default function Blog() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const blogPosts = [
    {
      title: '10 ADHD-Friendly Morning Routines That Actually Work',
      excerpt:
        'Discover science-backed morning routines designed specifically for ADHD brains. No rigid schedules, just flexible strategies that adapt to your energy levels.',
      category: 'Tips',
      readTime: '8 min',
      author: 'Dr. Sarah Chen',
      slug: 'adhd-morning-routines',
    },
    {
      title: 'Understanding Time Blindness: Why You Always Run Late',
      excerpt:
        'Time blindness is a real neurological phenomenon affecting most ADHD adults. Learn what it is, why it happens, and practical tools to manage it better.',
      category: 'Science',
      readTime: '6 min',
      author: 'Marcus Rivera',
      slug: 'time-blindness-explained',
    },
    {
      title: 'The Pomodoro Technique for ADHD: Does It Really Work?',
      excerpt:
        'We tested the Pomodoro Technique with 500 ADHD users. Here is what we learned about making timed work sessions actually helpful instead of stressful.',
      category: 'Research',
      readTime: '10 min',
      author: 'Dr. Jamie Lee',
      slug: 'pomodoro-adhd-research',
    },
    {
      title: 'How Gamification Hacks Your ADHD Brain (In a Good Way)',
      excerpt:
        'Your ADHD brain craves novelty and immediate rewards. Here is the neuroscience behind why points, badges, and levels can genuinely boost your productivity.',
      category: 'Science',
      readTime: '7 min',
      author: 'Dr. Sarah Chen',
      slug: 'gamification-neuroscience',
    },
    {
      title: '5 Breathing Exercises to Reset Your Focus in Under 3 Minutes',
      excerpt:
        'When your ADHD brain is scattered and overwhelmed, these quick breathing techniques can bring you back to baseline. Science-backed and surprisingly effective.',
      category: 'Mindfulness',
      readTime: '5 min',
      author: 'Alex Thompson',
      slug: 'focus-breathing-exercises',
    },
    {
      title: 'Task Paralysis: What It Is and How to Break Free',
      excerpt:
        'That frozen feeling when you have too many tasks and cannot start any of them? It is called task paralysis, and it is incredibly common with ADHD. Here is how to escape it.',
      category: 'Tips',
      readTime: '9 min',
      author: 'Marcus Rivera',
      slug: 'breaking-task-paralysis',
    },
    {
      title: 'The Best ADHD Productivity Tools (That Are Not Just To-Do Lists)',
      excerpt:
        'From body doubling apps to visual timers, we have curated a list of tools that actually understand how ADHD brains work. Plus our honest reviews of each.',
      category: 'Tools',
      readTime: '12 min',
      author: 'Jamie Park',
      slug: 'adhd-productivity-tools',
    },
    {
      title: 'Why Traditional Productivity Advice Fails ADHD Brains',
      excerpt:
        'Most productivity advice assumes neurotypical brain function. Here is why just focus does not work, and what to do instead when you have ADHD.',
      category: 'Science',
      readTime: '8 min',
      author: 'Dr. Jamie Lee',
      slug: 'why-traditional-advice-fails',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div data-aos="fade-up" className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">ADHD Productivity Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, research, and real talk about living and thriving with ADHD.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-6 glass hover-lift border-border/50 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {post.category}
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

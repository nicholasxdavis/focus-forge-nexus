import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/features', label: t('nav.features') },
    { path: '/about', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/pricing', label: t('nav.pricing') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary transition-transform group-hover:scale-110" fill="currentColor" />
              <div className="absolute inset-0 blur-lg bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              BetterFocus
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/dashboard">
              <Button className="bg-gradient-primary glow-primary">
                {t('nav.getStarted')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-primary glow-primary">
                  {t('nav.getStarted')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

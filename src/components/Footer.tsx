import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Zap className="h-8 w-8 text-primary" fill="currentColor" />
              <span className="text-xl font-bold">BetterFocus</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.features')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.guides')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BetterFocus. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

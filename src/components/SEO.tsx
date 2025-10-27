import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

export const SEO = ({ 
  title = 'BetterFocus - ADHD Productivity App Built For Your Brain',
  description = 'The #1 ADHD-friendly productivity app. Task management, focus timers, mindfulness tools, and gamification designed for neurodivergent minds. Free to start.',
  keywords = 'ADHD productivity, focus app, task management, ADHD tools, time management, mindfulness, neurodivergent, focus timer, pomodoro ADHD',
  canonicalUrl
}: SEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    const url = canonicalUrl || `https://betterfocus.app${location.pathname}`;
    if (canonical) {
      canonical.setAttribute('href', url);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', url);
  }, [title, description, keywords, canonicalUrl, location.pathname]);
  
  return null;
};

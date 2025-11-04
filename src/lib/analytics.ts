// Analytics helper functions for tracking user engagement
// Currently using localStorage for demo purposes
// Replace with your analytics service (Google Analytics, Mixpanel, etc.)

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
}

export const analytics = {
  // Track custom events
  track: (event: string, properties?: Record<string, any>) => {
    try {
      const analyticsEvent: AnalyticsEvent = {
        event,
        properties,
        timestamp: new Date().toISOString(),
      };
      
      // Store in localStorage for demo
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push(analyticsEvent);
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.shift();
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(events));
      
      // In production, send to your analytics service
      // Example: gtag('event', event, properties);
      // Example: mixpanel.track(event, properties);
      
      console.log('[Analytics]', event, properties);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Track page views
  pageView: (path: string) => {
    analytics.track('page_view', { path });
  },

  // Track user actions
  action: (action: string, category: string, label?: string) => {
    analytics.track('user_action', { action, category, label });
  },

  // Get all events (for debugging)
  getEvents: (): AnalyticsEvent[] => {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch {
      return [];
    }
  },

  // Clear all events
  clearEvents: () => {
    localStorage.removeItem('analytics_events');
  },
};

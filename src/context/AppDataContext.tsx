import React, { createContext, useContext } from 'react';
import { useAppData } from '@/hooks/use-app-data';

const AppDataContext = createContext<ReturnType<typeof useAppData> | null>(null);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = useAppData();

  if (!data.isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your data...</p>
        </div>
      </div>
    );
  }

  return <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppDataProvider');
  }
  return context;
};

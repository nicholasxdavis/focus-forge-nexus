import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAppContext } from '@/context/AppDataContext';
import {
  Zap,
  Settings as SettingsIcon,
  ArrowLeft,
  Bell,
  Volume2,
  Download,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function Settings() {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const data = appContext.exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `betterfocus-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            const data = JSON.parse(event.target.result);
            if (appContext.importData(data)) {
              alert('Data imported successfully!');
            } else {
              alert('Failed to import data. Please check the file format.');
            }
          } catch (error) {
            alert('Error reading file. Please ensure it\'s a valid BetterFocus backup.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    appContext.resetAllData();
    setShowResetConfirm(false);
    alert('All data has been reset. The page will now reload.');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="font-bold text-lg">BetterFocus</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <SettingsIcon className="h-10 w-10 text-primary" />
              Settings
            </h1>
            <p className="text-muted-foreground">Customize your BetterFocus experience</p>
          </div>

          {/* Preferences */}
          <Card className="p-6 glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Preferences
            </h2>

            <div className="space-y-6">
              {/* Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border">
                <div>
                  <h3 className="font-semibold mb-1">Smart Reminders</h3>
                  <p className="text-sm text-muted-foreground">Receive context-aware notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={appContext.settings.notificationsEnabled}
                  onChange={(e) =>
                    appContext.updateSettings({
                      notificationsEnabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded cursor-pointer"
                />
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Sound Effects</h3>
                    <p className="text-sm text-muted-foreground">Play sounds for session completion</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={appContext.settings.soundEnabled}
                  onChange={(e) =>
                    appContext.updateSettings({
                      soundEnabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded cursor-pointer"
                />
              </div>

              {/* Default Focus Duration */}
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <label className="font-semibold block mb-3">Default Focus Duration</label>
                <select
                  value={appContext.settings.defaultFocusDuration}
                  onChange={(e) =>
                    appContext.updateSettings({
                      defaultFocusDuration: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                >
                  <option value="15">15 minutes</option>
                  <option value="25">25 minutes (Pomodoro)</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              {/* Default Break Duration */}
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <label className="font-semibold block mb-3">Default Break Duration</label>
                <select
                  value={appContext.settings.defaultBreakDuration}
                  onChange={(e) =>
                    appContext.updateSettings({
                      defaultBreakDuration: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                >
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 glass">
            <h2 className="text-2xl font-bold mb-6">Data Management</h2>

            <div className="space-y-4">
              {/* Export */}
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors text-left"
              >
                <Download className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <h3 className="font-semibold">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Download your data as a JSON backup</p>
                </div>
              </button>

              {/* Import */}
              <button
                onClick={handleImport}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-colors text-left"
              >
                <Upload className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold">Import Data</h3>
                  <p className="text-sm text-muted-foreground">Restore from a previous backup</p>
                </div>
              </button>

              {/* Reset */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-colors text-left"
              >
                <Trash2 className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <h3 className="font-semibold">Reset All Data</h3>
                  <p className="text-sm text-muted-foreground">Delete everything and start fresh (irreversible)</p>
                </div>
              </button>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6 glass bg-gradient-glow border-primary/20">
            <h2 className="text-2xl font-bold mb-4">About BetterFocus</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Version:</strong> 1.0.0
              </p>
              <p>
                <strong>Status:</strong> <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Open Source</Badge>
              </p>
              <p className="mt-4">
                BetterFocus is a free, open-source productivity app designed specifically for ADHD brains. All your data is stored locally on your device—we never collect or sell it.
              </p>
              <p className="mt-4 pt-4 border-t border-border">
                Made with 💚 for the ADHD community. Completely free, forever.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Export Success Toast */}
      {showExportSuccess && (
        <div className="fixed bottom-4 right-4 p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-600 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Data exported successfully!
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <DialogContent className="sm:max-w-md glass border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Reset All Data?
            </DialogTitle>
            <DialogDescription>
              This will permanently delete all your tasks, progress, habits, and settings. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-muted-foreground">
              <p>You will lose:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All tasks and projects</li>
                <li>Your level, XP, and achievements</li>
                <li>All habits and focus history</li>
                <li>Your statistics and progress data</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReset} className="bg-red-600 hover:bg-red-700">
                Reset Everything
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

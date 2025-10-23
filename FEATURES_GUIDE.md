# BetterFocus - Complete Feature Guide

Welcome to BetterFocus! This is your ADHD-friendly productivity companion. Here's everything you can do:

## 🚀 Core Features

### 1. **Unlimited Tasks & Projects**
- Create unlimited tasks and projects without limits
- Organize by priority (High, Medium, Low)
- Add notes and due dates to each task
- Track completion across all your projects

**Where to access:** Tasks page (`/tasks`)

### 2. **Visual Focus Timer (Pomodoro)**
- Customizable work durations: 15, 25 (default Pomodoro), 30, 45, 60 minutes
- Customizable break durations: 5, 10, 15, 20 minutes
- Beautiful visual circular progress indicator
- Automatic session tracking with stats
- See your total focus time on the Progress page

**Where to access:** Focus Mode page (`/focus`)

### 3. **Task Capture (Voice & Text)**
- **Text Input:** Quick task entry with the input field on Dashboard
- **Voice Capture:** Click the mic button to capture tasks by voice
  - Automatically transcribes your speech into tasks
  - Works with any browser that supports Web Speech API
  - Perfect for when your hands are busy or you just want to dump ideas

**Where to access:** Dashboard (`/dashboard`)

### 4. **Gamification (XP, Levels, Streaks)**
All fully functional and persisted to localStorage:

- **XP System:**
  - Complete a task: +10-25 XP (based on priority)
  - Focus session: +5 XP per 5 minutes
  - Breathing exercise: +5 XP
  - Body doubling: +1 XP per 10 minutes

- **Levels:** Automatically progress as you earn XP
  - Each level requires more XP to unlock the next
  - Levels scale progressively (1.1x multiplier)
  - View your level on Dashboard and Progress page

- **Streaks:** 
  - Current streak (resets daily)
  - Longest streak tracking
  - Automatic reset if you miss a day
  - Visual indicator on Dashboard

- **Achievements:** 10 unique achievements to unlock:
  - First Steps (Complete your first task)
  - Week Warrior (7-day streak)
  - Focus Master (50+ focus sessions)
  - Task Champion (100 completed tasks)
  - Consistency King (30-day streak)
  - Night Owl (Complete task after 10pm)
  - Speed Demon (5 tasks in one day)
  - Focus Beast (300+ total focus minutes)
  - Breathing Buddha (10 breathing exercises)
  - Co-worker Champion (60 minutes in body doubling)

**Where to access:** Dashboard (`/dashboard`) and Your Progress (`/progress`)

### 5. **Mindfulness & Breathing Exercises**
- Quick breathing exercises perfect for resets during breaks
- 4-second inhale, 4-second hold, 6-second exhale cycle
- Beautiful animated visual feedback
- Earn XP for completing exercises
- Counts toward "Breathing Buddha" achievement

**Where to access:** Focus Mode page (`/focus`) - Click "Take a Breath"

### 6. **Body Doubling Sessions**
- Virtual co-working spaces perfect for ADHD brains
- Shows active co-workers to provide accountability and presence
- Track total body doubling time
- Earn XP for co-working sessions
- Perfect alternative to focus sessions if social pressure helps you

**Where to access:** Dashboard (`/dashboard`) - Click "Try Body Doubling" card

### 7. **Detailed Analytics & Progress Tracking**
Comprehensive progress page with:

- **Level & XP Information:**
  - Current level and XP progress to next level
  - Visual progress bar
  - Total XP earned across all activities
  - XP earning guide

- **Weekly Activity Charts:**
  - Tasks completed per day
  - Focus minutes per day
  - Visual bar charts with actual numbers

- **Achievements Tab:**
  - View all 10 achievements
  - See which are unlocked
  - Understand what's needed to unlock locked achievements

- **XP & Levels Tab:**
  - Detailed level progression guide
  - How to earn XP in various ways
  - Future level planning

**Where to access:** Your Progress page (`/progress`)

### 8. **ADHD-Friendly Interface**
- Clean, minimalist design without cognitive overload
- Consistent gradient primary colors for visual appeal
- Glass-morphism UI for modern feel
- Responsive design works perfectly on mobile and desktop
- Smooth animations using Tailwind and Framer Motion
- No unnecessary complexity
- Focus on what matters

### 9. **Mobile & Desktop Access**
- Fully responsive design
- Works perfectly on any device size
- Touch-friendly interface
- Same features across all devices
- Data syncs locally (localStorage)

### 10. **Smart Reminders**
Context-aware notifications that appear on Dashboard:

- **Morning Motivation:** Encouragement if you haven't completed tasks
- **Task Overload Warning:** Suggests focusing on top 3 if you have too many
- **Break Time Suggestions:** Reminds you to take breaks during optimal times
- **Focus Session Prompts:** Suggests starting a Pomodoro at productive hours
- **Streak Celebrations:** Celebrates your streaks (every 7 days)
- **Breathing Exercise Suggestions:** Recommends breathing exercises when overwhelmed

All reminders are dismissible and only show relevant ones.

**Where to access:** Dashboard (`/dashboard`)

### 11. **Flexible Organization System**
- Tasks can have priorities (High, Medium, Low)
- Add detailed notes to each task
- Set due dates for planning
- Filter by completion status (Today, All, Completed)
- No rigid folder structure
- Works with your natural chaos

**Where to access:** Tasks page (`/tasks`)

### 12. **All Future Updates**
Built-in architecture for easy feature additions:
- Modular component structure
- Extensible data store with hooks
- Room for new features without major refactors
- Easy to add notifications, integrations, etc.

## 📱 Navigation

### Dashboard (`/`)
Your main hub. See at a glance:
- Your level and XP progress
- Current streak
- Focus time
- Today's tasks
- Quick task input
- Voice capture button
- Smart reminders
- Call-to-actions for focus and body doubling

### Tasks (`/tasks`)
Complete task management:
- View all tasks, today's tasks, or completed tasks
- Add new tasks with priority and due date
- Edit existing tasks
- Delete tasks
- Mark tasks complete/incomplete

### Focus Mode (`/focus`)
Pomodoro timer with:
- Visual countdown timer
- Customizable durations
- Session tracking
- Breathing exercises integration
- Break timer

### Your Progress (`/progress`)
Analytics and achievement tracking:
- Level progression
- XP tracking
- Weekly activity charts
- Achievements gallery
- Milestone history
- Level progression guide

## 🔧 Data Persistence

All your data is saved automatically to localStorage:
- Tasks (with completion status, notes, priority, due dates)
- User progress (level, XP, streaks)
- Achievements (unlocked/locked status)
- Daily statistics (for analytics)

Your data persists across:
- Browser sessions (even if you close and reopen)
- Hard refresh (Ctrl+F5)
- Different visits on the same device

## 💡 Pro Tips

1. **Start Small:** You don't need to use every feature. Start with what feels right.

2. **Voice Capture:** Use the mic when you have lots of ideas - brain dump them quickly!

3. **Focus Sessions:** Start with 15-25 minute sessions. You can always adjust.

4. **Breathing Exercises:** Use these during your breaks, not just when stressed.

5. **Body Doubling:** Try this if you struggle with solo focus. The virtual presence helps!

6. **Check Your Progress:** Visit the Progress page weekly to see your trends.

7. **Streaks Are Motivating:** Even one completed task per day keeps your streak alive.

8. **Let Reminders Help:** Don't dismiss all reminders - they're context-aware and helpful.

## ❓ FAQ

**Q: Will my data sync across devices?**
A: Currently, data is stored locally per device/browser. Future updates could add cloud sync.

**Q: Can I export my data?**
A: Not yet, but you can see all your data in browser storage (DevTools > Application > LocalStorage).

**Q: What if I want to reset everything?**
A: Clear your browser's local storage for this domain, then refresh.

**Q: Does voice capture work on all browsers?**
A: Works best on Chrome/Chromium. Safari and Firefox have limited support.

**Q: How do I earn XP faster?**
A: Complete higher priority tasks, run focus sessions, do breathing exercises, and try body doubling!

## 🎯 Getting Started

1. **Complete Your First Task:** Add a simple task and mark it complete (get that first win!)
2. **Try a Focus Session:** Set a 15-minute timer and see how it feels
3. **Explore Your Progress:** Check out the Progress page to see your achievements
4. **Experiment:** Try different features - voice capture, body doubling, breathing exercises

That's it! You're ready to focus better. 🚀

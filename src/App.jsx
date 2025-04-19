import React from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Theme toggle component
const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

function AppContent() {
  const { darkMode } = useTheme();
  
  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <ThemeToggle />
      <h1>Pomodoro Timer</h1>
      <PomodoroTimer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 
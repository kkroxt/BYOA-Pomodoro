import React from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  return (
    <div className="app arcade-theme">
      <h1 className="arcade-title">POMODORO TIMER</h1>
      <PomodoroTimer />
    </div>
  );
}

export default App; 
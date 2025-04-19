import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';
import { useTheme } from '../context/ThemeContext';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const { darkMode } = useTheme();

  // Update document title with timer
  useEffect(() => {
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const modeText = mode === 'work' ? 'Work' : 'Break';
    document.title = `${formattedTime} - ${modeText} | Pomodoro Timer`;
    
    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [minutes, seconds, mode]);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          clearInterval(interval);
          const newMode = mode === 'work' ? 'break' : 'work';
          setMode(newMode);
          setMinutes(newMode === 'work' ? 25 : 5);
          setSeconds(0);
          
          // Play sound notification
          const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
          audio.play();
        }
      }, 1000);
    } else if (!isActive && (seconds !== 0 || minutes !== 0)) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  };

  return (
    <div className={`pomodoro-timer ${darkMode ? 'dark' : 'light'}`}>
      <div className={`timer-container ${mode} ${darkMode ? 'dark' : 'light'}`}>
        <button className={`mode-toggle ${darkMode ? 'dark' : 'light'}`} onClick={switchMode}>
          {mode === 'work' ? 'Break' : 'Work'}
        </button>
        <div className="timer">
          <div className="time">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="mode-indicator">
            {mode === 'work' ? 'Work Time' : 'Break Time'}
          </div>
        </div>
      </div>
      
      <div className="controls">
        <button className={darkMode ? 'dark' : 'light'} onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className={darkMode ? 'dark' : 'light'} onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer; 
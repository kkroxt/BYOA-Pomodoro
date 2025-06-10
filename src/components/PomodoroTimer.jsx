import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');

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
          clearInterval(interval);
          const newMode = mode === 'work' ? 'break' : 'work';
          setMode(newMode);
          setMinutes(newMode === 'work' ? 25 : 5);
          setSeconds(0);
          
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
    <div className="pomodoro-timer arcade">
      <div className={`timer-container ${mode}`}>
        <button className="mode-toggle arcade-button" onClick={switchMode}>
          {mode === 'work' ? 'BREAK' : 'WORK'}
        </button>
        <div className="timer">
          <div className="time">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="mode-indicator">
            {mode === 'work' ? 'WORK TIME' : 'BREAK TIME'}
          </div>
        </div>
      </div>
      
      <div className="controls">
        <button className="arcade-button" onClick={toggleTimer}>
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <button className="arcade-button" onClick={resetTimer}>RESET</button>
      </div>
    </div>
  );
};

export default PomodoroTimer; 
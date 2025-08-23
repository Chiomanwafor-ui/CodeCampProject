// app.js

const { useState, useEffect } = React;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);

  // format time mm:ss
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  // Handle break/session adjustment
  const handleBreak = (amount) => {
    if (!isRunning) {
      let newLength = breakLength + amount;
      if (newLength > 0 && newLength <= 60) {
        setBreakLength(newLength);
      }
    }
  };

  const handleSession = (amount) => {
    if (!isRunning) {
      let newLength = sessionLength + amount;
      if (newLength > 0 && newLength <= 60) {
        setSessionLength(newLength);
        setTimeLeft(newLength * 60);
      }
    }
  };

  // Timer start/stop
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
    } else {
      const newInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            document.getElementById("beep").play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);

      setIntervalId(newInterval);
      setIsRunning(true);
    }
  };

  // Reset
  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setIntervalId(null);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    let beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div id="clock-container">
      <h1>25 + 5 Clock</h1>
      <div id="controls">
        <div id="break-control">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={() => handleBreak(-1)}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleBreak(1)}>+</button>
        </div>
        <div id="session-control">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={() => handleSession(-1)}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleSession(1)}>+</button>
        </div>
      </div>

      <div id="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>

      <div id="actions">
        <button id="start_stop" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>

      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      ></audio>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

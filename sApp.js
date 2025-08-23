const { useState, useEffect, useRef } = React;

/**
 * Drum pad data (order MUST be Q W E | A S D | Z X C)
 * Each id is a unique description to show in #display
 * Each <audio> element id MUST be the key trigger (Q/W/E/...)
 */
const DRUMS = [
  {
    key: 'Q',
    keyCode: 81,
    id: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    keyCode: 87,
    id: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    keyCode: 69,
    id: 'Heater 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    keyCode: 65,
    id: 'Heater 4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    keyCode: 83,
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'D',
    keyCode: 68,
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    keyCode: 90,
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    keyCode: 88,
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    keyCode: 67,
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function DrumPad({ pad, onHit }) {
  const audioRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    onHit(pad.id);
    setPressed(true);
    // remove active state shortly after
    setTimeout(() => setPressed(false), 120);
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toUpperCase() === pad.key) {
        play();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pad.key]);

  return (
    <button
      className={`drum-pad${pressed ? ' active' : ''}`}
      id={pad.id}
      onClick={play}
      aria-label={`${pad.id} (${pad.key})`}
    >
      {pad.key}
      <audio
        className="clip"
        id={pad.key}
        ref={audioRef}
        src={pad.url}
        preload="auto"
      />
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('Ready');

  const handleHit = (label) => setDisplay(label);

  return (
    <div id="drum-machine">
      <h2 className="title">Drum Machine</h2>

      <div className="grid" aria-label="Drum pads">
        {DRUMS.map((pad) => (
          <DrumPad key={pad.key} pad={pad} onHit={handleHit} />
        ))}
      </div>

      <div id="display" aria-live="polite">
        {display}
      </div>

      <div className="footer">Press Q W E A S D Z X C or click the pads</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

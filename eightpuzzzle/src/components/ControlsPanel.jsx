// src/components/ControlsPanel.jsx
import { DIFFICULTY } from '../utils/constants.js';

export default function ControlsPanel({ size, setSize, reset }) {
  return (
    <div className="controls">
      <button onClick={reset}>New Game</button>
      <button onClick={() => setSize(size === DIFFICULTY.EASY ? DIFFICULTY.HARD : DIFFICULTY.EASY)}>
        {size === 3 ? 'Go 4x4' : 'Go 3x3'}
      </button>
    </div>
  );
}
// src/App.jsx
import { usePuzzle } from './hooks/usePuzzle.js';
import PuzzleBoard from './components/PuzzleBoard.jsx';
import StatsDisplay from './components/StatsDisplay.jsx';
import ControlsPanel from './components/ControlsPanel.jsx';
import './assets/styles/main.css';

export default function App() {
  const {
    grid,
    size,
    setSize,
    moves,
    time,
    isSolved,
    move,
    reset,
    highScore
  } = usePuzzle(3);

  return (
    <div className="app">
      <h1>Sliding Puzzle</h1>
      <StatsDisplay moves={moves} time={time} highScore={highScore} size={size} />
      <PuzzleBoard grid={grid} move={move} size={size} />
      {isSolved && <div className="win">Solved in {moves} moves!</div>}
      <ControlsPanel size={size} setSize={setSize} reset={reset} />
    </div>
  );
}
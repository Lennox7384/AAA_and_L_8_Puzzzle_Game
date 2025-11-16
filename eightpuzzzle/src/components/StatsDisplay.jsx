// src/components/StatsDisplay.jsx
export default function StatsDisplay({ moves, time, highScore, size }) {
  return (
    <div className="stats">
      <span>Moves: {moves}</span>
      <span>Time: {time}s</span>
      <span>Best: {highScore}</span>
      <span>{size}x{size}</span>
    </div>
  );
}
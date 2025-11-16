// src/components/PuzzleBoard.jsx
export default function PuzzleBoard({ grid, move, size }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: size === 3 ? '360px' : '480px'
      }}
    >
      {grid.tiles.map((tile, i) => (
        <div
          key={i}
          className={`tile ${tile.isBlank ? 'blank' : ''}`}
          onClick={() => move(i)}
        >
          {!tile.isBlank && tile.value}
        </div>
      ))}
    </div>
  );
}
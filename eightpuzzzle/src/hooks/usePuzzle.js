// src/hooks/usePuzzle.js
import { useState, useEffect, useRef } from 'react';
import { PuzzleGrid } from '../core/PuzzleGrid.js';
import { StorageService } from '../services/StorageService.js';
import { DIFFICULTY } from '../utils/constants.js';

export const usePuzzle = (initialSize = DIFFICULTY.EASY) => {
  const [size, setSize] = useState(initialSize);
  const [grid, setGrid] = useState(() => {
    const g = new PuzzleGrid(initialSize);
    g.shuffle();
    return g;
  });
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const timerRef = useRef(null);
  const storage = useRef(new StorageService());

  const start = () => {
    const newGrid = new PuzzleGrid(size);
    newGrid.shuffle();
    setGrid(newGrid);
    setMoves(0);
    setTime(0);
    setIsSolved(false);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };

  const move = (index) => {
    if (isSolved || !grid.move(index)) return;
    setMoves(m => m + 1);
    if (grid.isSolved()) {
      clearInterval(timerRef.current);
      setIsSolved(true);
      const score = Math.max(10000 - moves * 10 - time * 2, 0);
      storage.current.saveHighScore(score, size);
    }
  };

  const reset = () => {
    start();
  };

  useEffect(() => {
    start();
    return () => clearInterval(timerRef.current);
  }, [size]);

  return {
    grid,
    size,
    setSize,
    moves,
    time,
    isSolved,
    move,
    reset,
    highScore: storage.current.getHighScore(size)
  };
};
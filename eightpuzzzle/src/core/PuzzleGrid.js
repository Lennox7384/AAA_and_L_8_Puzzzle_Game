// src/core/PuzzleGrid.js
export class PuzzleGrid {
  constructor(size = 3) {
    this.size = size;
    this.tiles = [];
    this.blankIndex = 0;
    this.init();
  }

  init() {
    const total = this.size * this.size;
    this.tiles = Array.from({ length: total }, (_, i) => ({
      value: i,
      isBlank: i === total - 1
    }));
    this.blankIndex = total - 1;
  }

shuffle() {
  let arr = [...Array(this.size * this.size).keys()];
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  } while (!this.isSolvable(arr));
  this.tiles = arr.map((v) => ({ value: v, isBlank: v === 0 }));
  this.blankIndex = arr.indexOf(0);
}

  isSolvable(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) continue;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] && arr[i] > arr[j]) inv++;
      }
    }
    const blankRow = Math.floor(arr.indexOf(0) / this.size);
    return this.size % 2 === 1 ? inv % 2 === 0 : (inv + blankRow) % 2 === 1;
  }

  move(index) {
    const valid = this.getValidMoves();
    if (!valid.includes(index)) return false;
    [this.tiles[this.blankIndex], this.tiles[index]] = 
      [this.tiles[index], this.tiles[this.blankIndex]];
    this.blankIndex = index;
    return true;
  }

  getValidMoves() {
    const row = Math.floor(this.blankIndex / this.size);
    const col = this.blankIndex % this.size;
    const moves = [];
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    for (const [dr, dc] of dirs) {
      const r = row + dr, c = col + dc;
      if (r >= 0 && r < this.size && c >= 0 && c < this.size) {
        moves.push(r * this.size + c);
      }
    }
    return moves;
  }

  isSolved() {
    return this.tiles.every((t, i) => t.isBlank ? true : t.value === i);
  }
}
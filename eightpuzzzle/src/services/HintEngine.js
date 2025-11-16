// src/services/HintEngine.js
export class HintEngine {
  static getNextMove(grid) {
    const path = this.aStar(grid);
    if (path.length > 1) {
      return path[1].blankIndex;  // Next tile to move
    }
    return null;
  }

  static aStar(grid) {
    const start = this.gridToString(grid.tiles.map(t => t.value));
    const goal = this.gridToString(Array.from({ length: grid.size * grid.size }, (_, i) => i));

    const open = new PriorityQueue();
    open.push({ state: start, path: [start], cost: 0, heuristic: this.manhattan(start, grid.size) });

    const cameFrom = new Map();
    const gScore = new Map([[start, 0]]);

    while (!open.isEmpty()) {
      const current = open.pop();
      if (current.state === goal) {
        return this.reconstructPath(cameFrom, current.state, grid);
      }

      for (const neighbor of this.getNeighbors(current.state, grid.size)) {
        const tentativeGScore = gScore.get(current.state) + 1;
        if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
          cameFrom.set(neighbor, current.state);
          gScore.set(neighbor, tentativeGScore);
          const heuristic = this.manhattan(neighbor, grid.size);
          open.push({ state: neighbor, path: [...current.path, neighbor], cost: tentativeGScore + heuristic, heuristic });
        }
      }
    }

    return [];
  }

  static gridToString(arr) {
    return arr.join(',');
  }

  static stringToGrid(str, size) {
    return str.split(',').map(Number);
  }

  static getNeighbors(state, size) {
    const arr = this.stringToGrid(state, size);
    const blank = arr.indexOf(0);
    const neighbors = [];

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const r = Math.floor(blank / size) + dr;
      const c = blank % size + dc;
      if (r >= 0 && r < size && c >= 0 && c < size) {
        const swapIndex = r * size + c;
        const newArr = [...arr];
        [newArr[blank], newArr[swapIndex]] = [newArr[swapIndex], newArr[blank]];
        neighbors.push(this.gridToString(newArr));
      }
    }
    return neighbors;
  }

  static manhattan(state, size) {
    const arr = this.stringToGrid(state, size);
    let distance = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) continue;
      const targetRow = Math.floor(arr[i] / size);
      const targetCol = arr[i] % size;
      const currentRow = Math.floor(i / size);
      const currentCol = i % size;
      distance += Math.abs(targetRow - currentRow) + Math.abs(targetCol - currentCol);
    }
    return distance;
  }

  static reconstructPath(cameFrom, current, grid) {
    const path = [];
    while (cameFrom.has(current)) {
      path.unshift(current);
      current = cameFrom.get(current);
    }
    return path.map(p => ({ tiles: this.stringToGrid(p, grid.size), blankIndex: this.stringToGrid(p, grid.size).indexOf(0) }));
  }
}

// PriorityQueue helper
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.heap.sort((a, b) => a.cost - b.cost);
  }

  pop() {
    return this.heap.shift();
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
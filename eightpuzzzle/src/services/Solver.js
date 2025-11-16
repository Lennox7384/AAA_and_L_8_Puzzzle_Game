// src/services/Solver.js
export class Solver {
  static async solve(grid, updateGridCallback, delay = 500) {
    const path = HintEngine.aStar(grid);
    for (let i = 1; i < path.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      updateGridCallback(path[i]);
    }
  }
}
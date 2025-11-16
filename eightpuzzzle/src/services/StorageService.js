// src/services/StorageService.js
export class StorageService {
  saveHighScore(score, size) {
    const key = `highscore_${size}x${size}`;
    const current = this.getHighScore(size);
    if (score > current) {
      localStorage.setItem(key, score);
    }
  }

  getHighScore(size) {
    const key = `highscore_${size}x${size}`;
    return parseInt(localStorage.getItem(key) || 0, 10);
  }
}
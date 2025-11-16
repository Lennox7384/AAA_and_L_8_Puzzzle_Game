// src/utils/ImageProcessor.js
export class ImageProcessor {
  static async processImage(input, size) {
    const startTime = Date.now();
    const img = await this.loadImage(input);
    const cropped = this.cropToSquare(img);
    const resized = this.resize(cropped, size * 100);
    const tiles = this.splitIntoTiles(resized, size);
    console.log(`Image processed in ${Date.now() - startTime}ms`);
    return tiles;
  }

  static loadImage(input) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      if (input instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.onerror = reject;
        reader.readAsDataURL(input);
      } else if (typeof input === 'string') {
        img.src = input;
      } else {
        reject(new Error('Invalid input'));
      }
    });
  }

  static cropToSquare(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const minSide = Math.min(img.width, img.height);
    canvas.width = minSide;
    canvas.height = minSide;
    ctx.drawImage(img, (img.width - minSide) / 2, (img.height - minSide) / 2, minSide, minSide, 0, 0, minSide, minSide);
    return canvas;
  }

  static resize(img, targetSize) {
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, targetSize, targetSize);
    return canvas;
  }

  static splitIntoTiles(img, size) {
    const tileSize = img.width / size;
    const tiles = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const canvas = document.createElement('canvas');
        canvas.width = tileSize;
        canvas.height = tileSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, col * tileSize, row * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);
        tiles.push(canvas.toDataURL('image/png'));
      }
    }
    return tiles;
  }
}
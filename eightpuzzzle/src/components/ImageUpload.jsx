// src/components/ImageUpload.jsx
import { useState, useRef } from 'react';
import { ImageProcessor } from '../utils/ImageProcessor.js';

export default function ImageUpload({ onImageProcessed, size }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    try {
      const tiles = await ImageProcessor.processImage(file, size);
      onImageProcessed(tiles);
    } catch (error) {
      console.error(error);
      alert('Image processing failed. Try a different image.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => handleUpload(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
  };

  const handleClick = () => {
    if (!loading) inputRef.current.click();
  };

  return (
    <div 
      className="image-upload" 
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={loading} 
        style={{ display: 'none' }}
      />
      <p>{loading ? 'Processing...' : 'Upload or Drag Image'}</p>
    </div>
  );
}
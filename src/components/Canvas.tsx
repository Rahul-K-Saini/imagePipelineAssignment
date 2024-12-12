import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Download, Upload, Trash2 } from 'lucide-react';
import { BrushControls } from './BrushControls';
import { CanvasProps } from '../types/canvas';
import { initializeCanvas, handleImageScale, CANVAS_CONFIG } from '../utils/canvas';

export const Canvas: React.FC<CanvasProps> = ({ onMaskGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(CANVAS_CONFIG.defaultBrushSize);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = initializeCanvas(canvasRef.current, brushSize);
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target?.result as string, (img) => {
          canvas.clear();
          canvas.backgroundColor = CANVAS_CONFIG.backgroundColor;
          
          handleImageScale(canvas, img);
          
          canvas.add(img);
          canvas.renderAll();
          
          onMaskGenerated(e.target?.result as string, canvas.toDataURL());
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      const objects = canvas.getObjects();
      const paths = objects.filter(obj => obj instanceof fabric.Path);
      paths.forEach(path => canvas.remove(path));
      canvas.renderAll();
    }
  };

  const exportMask = () => {
    if (canvas) {
      const maskImage = canvas.toDataURL();
      const originalImage = canvas.getObjects('image')[0]?.toDataURL();
      if (originalImage) {
        onMaskGenerated(originalImage, maskImage);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <BrushControls 
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />

        <button
          onClick={clearCanvas}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </button>

        <button
          onClick={exportMask}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Mask
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
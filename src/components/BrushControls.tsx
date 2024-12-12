import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { BrushControlsProps } from '../types/canvas';

export const BrushControls: React.FC<BrushControlsProps> = ({
  brushSize,
  onBrushSizeChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded">
      <button
        onClick={() => onBrushSizeChange(Math.max(1, brushSize - 5))}
        className="p-1 hover:bg-gray-200 rounded"
        aria-label="Decrease brush size"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center">{brushSize}</span>
      <button
        onClick={() => onBrushSizeChange(Math.min(50, brushSize + 5))}
        className="p-1 hover:bg-gray-200 rounded"
        aria-label="Increase brush size"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
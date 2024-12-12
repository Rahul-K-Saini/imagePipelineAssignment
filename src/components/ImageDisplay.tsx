import React from 'react';
import { ImagePair } from '../types/canvas';

interface ImageDisplayProps {
  images: ImagePair;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ images }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Original Image</h3>
          <img
            src={images.original}
            alt="Original"
            className="w-full rounded border border-gray-200"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Mask</h3>
          <img
            src={images.mask}
            alt="Mask"
            className="w-full rounded border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};
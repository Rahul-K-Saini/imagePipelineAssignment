import React, { useState } from 'react';
import { Canvas } from './components/Canvas';
import { ImageDisplay } from './components/ImageDisplay';
import { Images } from 'lucide-react';
import { ImagePair } from './types/canvas';

function App() {
  const [images, setImages] = useState<ImagePair | null>(null);

  const handleMaskGenerated = (original: string, mask: string) => {
    setImages({ original, mask });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Images className="w-6 h-6 mr-2 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Image Inpainting Widget</h1>
          </div>
          
          <Canvas onMaskGenerated={handleMaskGenerated} />
        </div>

        {images && <ImageDisplay images={images} />}
      </div>
    </div>
  );
}

export default App;
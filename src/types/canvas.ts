export interface CanvasProps {
  onMaskGenerated: (original: string, mask: string) => void;
}

export interface ImagePair {
  original: string;
  mask: string;
}

export interface BrushControlsProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}
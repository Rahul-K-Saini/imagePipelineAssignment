import { fabric } from 'fabric';

export const CANVAS_CONFIG = {
  width: 600,
  height: 400,
  defaultBrushSize: 20,
  brushColor: 'white',
  backgroundColor: 'black',
} as const;

export const initializeCanvas = (
  canvasElement: HTMLCanvasElement,
  brushSize: number
): fabric.Canvas => {
  const fabricCanvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: true,
    width: CANVAS_CONFIG.width,
    height: CANVAS_CONFIG.height,
  });

  fabricCanvas.freeDrawingBrush.color = CANVAS_CONFIG.brushColor;
  fabricCanvas.freeDrawingBrush.width = brushSize;
  fabricCanvas.backgroundColor = CANVAS_CONFIG.backgroundColor;

  return fabricCanvas;
};

export const handleImageScale = (
  canvas: fabric.Canvas,
  img: fabric.Image
): void => {
  const scale = Math.min(
    canvas.width! / img.width!,
    canvas.height! / img.height!
  );
  
  img.scale(scale);
  img.set({
    left: (canvas.width! - img.width! * scale) / 2,
    top: (canvas.height! - img.height! * scale) / 2,
  });
};
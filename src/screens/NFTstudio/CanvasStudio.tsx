// src/screens/NFTstudio/CanvasStudio.tsx
import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { Palette, Type, Circle, Square, Eraser, Trash2, Download, Undo, Redo, Move } from 'lucide-react';
import './CanvasStudio.scss';

type Tool = 'brush' | 'text' | 'circle' | 'rectangle' | 'eraser' | 'select';

type ExportResult = {
  pngBase64: string;
  svgString: string;
};

interface CanvasHistory {
  imageData: ImageData;
}

const CanvasStudio = forwardRef((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#60519b');
  const [brushSize, setBrushSize] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [history, setHistory] = useState<CanvasHistory[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set initial background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    saveToHistory(ctx);

    // Create temp canvas for shape preview
    if (!tempCanvasRef.current) {
      tempCanvasRef.current = document.createElement('canvas');
      tempCanvasRef.current.width = canvas.width;
      tempCanvasRef.current.height = canvas.height;
    }
  }, []);

  // Update background color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Save current drawing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply new background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Restore drawing (blend mode)
    ctx.putImageData(imageData, 0, 0);
  }, [backgroundColor]);

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push({ imageData });
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const prevStep = historyStep - 1;
      ctx.putImageData(history[prevStep].imageData, 0, 0);
      setHistoryStep(prevStep);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const nextStep = historyStep + 1;
      ctx.putImageData(history[nextStep].imageData, 0, 0);
      setHistoryStep(nextStep);
    }
  };

  const getMousePos = (canvas: HTMLCanvasElement, e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pos = getMousePos(canvas, e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    startPosRef.current = pos;

    if (tool === 'brush' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    if (tool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        ctx.font = `${brushSize * 4}px Arial`;
        ctx.fillStyle = color;
        ctx.fillText(text, pos.x, pos.y);
        saveToHistory(ctx);
      }
      setIsDrawing(false);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPosRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pos = getMousePos(canvas, e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'brush') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = backgroundColor;
      ctx.lineWidth = brushSize * 2;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'circle' || tool === 'rectangle') {
      // Preview on temp canvas
      const tempCtx = tempCanvasRef.current?.getContext('2d');
      if (!tempCtx) return;

      // Clear temp canvas
      tempCtx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Copy current state
      tempCtx.drawImage(canvas, 0, 0);

      // Draw shape preview
      tempCtx.strokeStyle = color;
      tempCtx.lineWidth = brushSize;
      
      const width = pos.x - startPosRef.current.x;
      const height = pos.y - startPosRef.current.y;

      if (tool === 'circle') {
        const radius = Math.sqrt(width * width + height * height);
        tempCtx.beginPath();
        tempCtx.arc(startPosRef.current.x, startPosRef.current.y, radius, 0, Math.PI * 2);
        tempCtx.stroke();
      } else if (tool === 'rectangle') {
        tempCtx.strokeRect(startPosRef.current.x, startPosRef.current.y, width, height);
      }

      // Show preview
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvasRef.current, 0, 0);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'circle' || tool === 'rectangle') {
      // Finalize shape
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      
      const startPos = startPosRef.current;
      if (startPos) {
        ctx.beginPath();
        if (tool === 'circle') {
          const lastPos = { x: 0, y: 0 }; // We'll get this from the last mouse position
          ctx.arc(startPos.x, startPos.y, 50, 0, Math.PI * 2);
        }
        ctx.stroke();
      }
    }

    saveToHistory(ctx);
    setIsDrawing(false);
    startPosRef.current = null;
  };

  const exportAssets = async ({ size = 1000 } = {}): Promise<ExportResult> => {
    const canvas = canvasRef.current!;
    
    // Create export canvas at requested size
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = size;
    exportCanvas.height = size;
    const exportCtx = exportCanvas.getContext("2d")!;
    
    // Draw scaled version
    exportCtx.drawImage(canvas, 0, 0, size, size);
    const pngBase64 = exportCanvas.toDataURL("image/png");
    
    // Generate SVG
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <image href="${pngBase64}" width="${size}" height="${size}"/>
    </svg>`;
    
    return { pngBase64, svgString };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory(ctx);
  };

  const downloadImage = async () => {
    const { pngBase64 } = await exportAssets({ size: 1000 });
    const link = document.createElement('a');
    link.download = `nft-design-${Date.now()}.png`;
    link.href = pngBase64;
    link.click();
  };
   // ==========================================
// LOAD IMAGE / LAYERS FROM DRAFT
// ==========================================
const loadLayers = (layers: any) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear current canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // If layers array provided, re-render them in order
  if (Array.isArray(layers) && layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'image' && layer.dataURL) {
        const img = new Image();
        img.src = layer.dataURL;
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      // Extend later for shapes, text, etc.
    });
  }
};

// Load a flat image (used for saved PNG drafts)
const loadImageFromDataURL = (dataURL: string) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

  useImperativeHandle(ref, () => ({
    exportAssets,
    loadLayers,
    loadImageFromDataURL,
    clearCanvas,
    getLayers: () => [],
  }));

  return (
    <div className="canvas-studio">
      <div className="canvas-studio__toolbar">
        <div className="tool-group">
          <button
            className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
            onClick={() => setTool('brush')}
            title="Brush"
          >
            <Palette size={20} />
          </button>
          <button
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
          <button
            className={`tool-btn ${tool === 'text' ? 'active' : ''}`}
            onClick={() => setTool('text')}
            title="Text"
          >
            <Type size={20} />
          </button>
          <button
            className={`tool-btn ${tool === 'circle' ? 'active' : ''}`}
            onClick={() => setTool('circle')}
            title="Circle"
          >
            <Circle size={20} />
          </button>
          <button
            className={`tool-btn ${tool === 'rectangle' ? 'active' : ''}`}
            onClick={() => setTool('rectangle')}
            title="Rectangle"
          >
            <Square size={20} />
          </button>
        </div>
        
        <div className="tool-divider" />
        
        <div className="tool-group">
          <div className="color-picker-wrapper">
            <label>Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-picker"
            />
          </div>
          
          <div className="color-picker-wrapper">
            <label>Background</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="color-picker"
            />
          </div>
        </div>
        
        <div className="tool-divider" />
        
        <div className="tool-group">
          <div className="slider-wrapper">
            <label>Size: {brushSize}px</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="brush-size"
            />
          </div>
        </div>
        
        <div className="tool-divider" />
        
        <div className="tool-group">
          <button 
            className="tool-btn" 
            onClick={undo} 
            disabled={historyStep <= 0}
            title="Undo"
          >
            <Undo size={20} />
          </button>
          <button 
            className="tool-btn" 
            onClick={redo}
            disabled={historyStep >= history.length - 1}
            title="Redo"
          >
            <Redo size={20} />
          </button>
          <button 
            className="tool-btn" 
            onClick={clearCanvas}
            title="Clear Canvas"
          >
            <Trash2 size={20} />
          </button>
          <button 
            className="tool-btn tool-btn--primary" 
            onClick={downloadImage}
            title="Download"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
      
      <div className="canvas-studio__workspace">
        <canvas
          ref={canvasRef}
          width={1000}
          height={1000}
          className="canvas-studio__canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      <div className="canvas-studio__instructions">
        <p>🎨 <strong>{tool.toUpperCase()}</strong> selected</p>
        <p>
          {tool === 'brush' && 'Click and drag to draw'}
          {tool === 'eraser' && 'Click and drag to erase'}
          {tool === 'text' && 'Click to add text'}
          {tool === 'circle' && 'Click and drag to create a circle'}
          {tool === 'rectangle' && 'Click and drag to create a rectangle'}
        </p>
      </div>
    </div>
  );
});

CanvasStudio.displayName = 'CanvasStudio';

export default CanvasStudio;
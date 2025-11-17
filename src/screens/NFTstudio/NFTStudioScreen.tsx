import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, Upload, Layers, Zap, Star, Palette, Type, Circle, 
  Square, Eraser, Trash2, Download, Undo, Redo, Image as ImageIcon,
  Sparkles, Wand2, Grid, Eye, Lock, Shield, Settings, Plus, Minus,
  RotateCw, Maximize, Move, Copy, Scissors, AlignLeft, AlignCenter
} from 'lucide-react';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  svg?: string;
  attributes: Array<{ trait_type: string; value: string }>;
  royalties?: {
    version: number;
    splitPercentage: Array<{ address: string; percent: number }>;
  };
  level?: number;
  experience?: number;
  nestable?: boolean;
  composable?: boolean;
  external_url?: string;
}

interface Draft {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  layers: any;
  rarity: string;
  royalty: number;
  price: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

type Tool = 'select' | 'brush' | 'text' | 'circle' | 'rectangle' | 'eraser' | 'shape' | 'fill' | 'gradient';

// ==========================================
// ENHANCED CANVAS STUDIO COMPONENT
// ==========================================

const EnhancedCanvasStudio = forwardRef((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#60519b');
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [history, setHistory] = useState<any[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [layers, setLayers] = useState([{ id: 1, name: 'Layer 1', visible: true, locked: false }]);
  const [activeLayer, setActiveLayer] = useState(1);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory(ctx);
  }, []);

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
        ctx.globalAlpha = opacity / 100;
        ctx.fillText(text, pos.x, pos.y);
        ctx.globalAlpha = 1;
        saveToHistory(ctx);
      }
      setIsDrawing(false);
    }

    if (tool === 'fill') {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity / 100;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      saveToHistory(ctx);
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

    ctx.globalAlpha = opacity / 100;

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
    }

    ctx.globalAlpha = 1;
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveToHistory(ctx);
    setIsDrawing(false);
    startPosRef.current = null;
  };

  const exportAssets = async ({ size = 1000 } = {}): Promise<any> => {
    const canvas = canvasRef.current!;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = size;
    exportCanvas.height = size;
    const exportCtx = exportCanvas.getContext("2d")!;
    exportCtx.drawImage(canvas, 0, 0, size, size);
    const pngBase64 = exportCanvas.toDataURL("image/png");
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
      saveToHistory(ctx);
    };
  };

  const addShape = (shape: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = color;
    ctx.globalAlpha = opacity / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(centerX - 50, centerY - 50, 100, 100);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 50);
        ctx.lineTo(centerX - 50, centerY + 50);
        ctx.lineTo(centerX + 50, centerY + 50);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.globalAlpha = 1;
    saveToHistory(ctx);
  };

  useImperativeHandle(ref, () => ({
    exportAssets,
    loadImageFromDataURL,
    clearCanvas,
    getLayers: () => layers,
  }));

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1e202c 0%, #31323e 100%)', 
      borderRadius: '16px', 
      padding: '20px',
      border: '2px solid rgba(96, 81, 155, 0.2)'
    }}>
      {/* Advanced Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        padding: '15px',
        background: 'rgba(31, 32, 46, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(96, 81, 155, 0.2)'
      }}>
        {/* Drawing Tools */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setTool('select')} style={{ ...toolButtonStyle, background: tool === 'select' ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
            <Move size={18} />
          </button>
          <button onClick={() => setTool('brush')} style={{ ...toolButtonStyle, background: tool === 'brush' ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
            <Palette size={18} />
          </button>
          <button onClick={() => setTool('eraser')} style={{ ...toolButtonStyle, background: tool === 'eraser' ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
            <Eraser size={18} />
          </button>
          <button onClick={() => setTool('text')} style={{ ...toolButtonStyle, background: tool === 'text' ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
            <Type size={18} />
          </button>
          <button onClick={() => setTool('fill')} style={{ ...toolButtonStyle, background: tool === 'fill' ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
            <Square size={18} />
          </button>
        </div>

        <div style={{ width: '2px', background: 'rgba(96, 81, 155, 0.3)' }} />

        {/* Shapes */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => addShape('circle')} style={toolButtonStyle}>
            <Circle size={18} />
          </button>
          <button onClick={() => addShape('square')} style={toolButtonStyle}>
            <Square size={18} />
          </button>
          <button onClick={() => addShape('triangle')} style={toolButtonStyle}>
            <Zap size={18} />
          </button>
        </div>

        <div style={{ width: '2px', background: 'rgba(96, 81, 155, 0.3)' }} />

        {/* Color Picker */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ fontSize: '12px', color: '#bfc0d1' }}>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '40px', height: '40px', border: '2px solid #60519b', borderRadius: '8px', cursor: 'pointer' }}
          />
          <label style={{ fontSize: '12px', color: '#bfc0d1' }}>BG</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{ width: '40px', height: '40px', border: '2px solid #60519b', borderRadius: '8px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ width: '2px', background: 'rgba(96, 81, 155, 0.3)' }} />

        {/* Size & Opacity */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            <label style={{ fontSize: '11px', color: '#bfc0d1' }}>Size: {brushSize}px</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            <label style={{ fontSize: '11px', color: '#bfc0d1' }}>Opacity: {opacity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ width: '2px', background: 'rgba(96, 81, 155, 0.3)' }} />

        {/* History */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={undo} disabled={historyStep <= 0} style={{ ...toolButtonStyle, opacity: historyStep <= 0 ? 0.5 : 1 }}>
            <Undo size={18} />
          </button>
          <button onClick={redo} disabled={historyStep >= history.length - 1} style={{ ...toolButtonStyle, opacity: historyStep >= history.length - 1 ? 0.5 : 1 }}>
            <Redo size={18} />
          </button>
          <button onClick={clearCanvas} style={{ ...toolButtonStyle, background: 'rgba(255, 107, 107, 0.2)' }}>
            <Trash2 size={18} />
          </button>
        </div>

        <div style={{ width: '2px', background: 'rgba(96, 81, 155, 0.3)' }} />

        {/* Grid */}
        <button onClick={() => setShowGrid(!showGrid)} style={{ ...toolButtonStyle, background: showGrid ? '#60519b' : 'rgba(96, 81, 155, 0.2)' }}>
          <Grid size={18} />
        </button>
      </div>
      
      {/* Canvas */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          style={{ 
            maxWidth: '100%',
            height: 'auto',
            background: '#fff',
            borderRadius: '12px',
            cursor: tool === 'brush' ? 'crosshair' : tool === 'eraser' ? 'cell' : 'default',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        {showGrid && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(96, 81, 155, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 81, 155, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
            borderRadius: '12px'
          }} />
        )}
      </div>

      {/* Layers Panel */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        background: 'rgba(31, 32, 46, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(96, 81, 155, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} /> Layers
          </h4>
          <button onClick={() => setLayers([...layers, { id: Date.now(), name: `Layer ${layers.length + 1}`, visible: true, locked: false }])} style={toolButtonStyle}>
            <Plus size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {layers.map((layer) => (
            <div key={layer.id} style={{
              padding: '10px',
              background: activeLayer === layer.id ? 'rgba(96, 81, 155, 0.3)' : 'rgba(49, 50, 62, 0.5)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid rgba(96, 81, 155, 0.2)'
            }} onClick={() => setActiveLayer(layer.id)}>
              <span style={{ color: '#bfc0d1', fontSize: '13px' }}>{layer.name}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ ...iconButtonStyle, opacity: layer.visible ? 1 : 0.5 }}>
                  <Eye size={14} />
                </button>
                <button style={{ ...iconButtonStyle, opacity: layer.locked ? 1 : 0.5 }}>
                  <Lock size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const toolButtonStyle: React.CSSProperties = {
  padding: '10px',
  background: 'rgba(96, 81, 155, 0.2)',
  border: '1px solid rgba(96, 81, 155, 0.3)',
  borderRadius: '8px',
  color: '#bfc0d1',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

const iconButtonStyle: React.CSSProperties = {
  padding: '6px',
  background: 'transparent',
  border: 'none',
  color: '#bfc0d1',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

// ==========================================
// MAIN NFT STUDIO COMPONENT
// ==========================================

export default function NFTStudioComplete() {
  const [currentView, setCurrentView] = useState<'studio' | 'drafts' | 'wardrobe' | 'dotvatar'>('studio');
  const [metadata, setMetadata] = useState<NFTMetadata>({
    name: '',
    description: '',
    image: '',
    attributes: [
      { trait_type: 'Category', value: 'Fashion' },
      { trait_type: 'Style', value: 'Digital' }
    ],
    level: 1,
    experience: 0,
    nestable: false,
    composable: false,
  });
  const [royalty, setRoyalty] = useState(5);
  const [price, setPrice] = useState(0);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [wardrobeNFTs, setWardrobeNFTs] = useState<any[]>([]);
  
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    // Load dummy wardrobe data
    const dummyWardrobe = [
      {
        id: '1',
        token_id: 'TOKEN_001',
        metadata: {
          name: 'Cyber Punk Jacket',
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
          level: 5,
          experience: 250,
        },
        rarity: 'Epic',
        status: 'minted',
      },
      {
        id: '2',
        token_id: 'TOKEN_002',
        metadata: {
          name: 'Holographic Sneakers',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          level: 3,
          experience: 120,
        },
        rarity: 'Rare',
        status: 'minted',
      }
    ];
    setWardrobeNFTs(dummyWardrobe);
  }, []);

  const handleSaveDraft = async () => {
    try {
      const exported = await canvasRef.current?.exportAssets?.({ size: 1000 });
      if (!exported) throw new Error('Export failed');
      
      const draft: Draft = {
        id: Date.now().toString(),
        user_id: 'current_user',
        title: metadata.name || 'Untitled',
        description: metadata.description,
        image_url: exported.pngBase64,
        layers: [],
        rarity: 'common',
        royalty,
        price,
        tags: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setDrafts([...drafts, draft]);
      alert('✅ Draft saved successfully!');
    } catch (err: any) {
      alert('❌ Failed to save draft: ' + err.message);
    }
  };

  const handleExportAndMint = async () => {
    const exported = await canvasRef.current?.exportAssets?.({ size: 1000 });
    if (exported) {
      setMetadata(prev => ({ ...prev, image: exported.pngBase64 }));
      setShowMetadataModal(true);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e202c 0%, #31323e 100%)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        background: 'rgba(31, 32, 46, 0.5)',
        padding: '10px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(96, 81, 155, 0.2)'
      }}>
        {['studio', 'drafts', 'wardrobe', 'dotvatar'].map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view as any)}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: currentView === view ? '#60519b' : 'transparent',
              border: currentView === view ? 'none' : '2px solid transparent',
              color: currentView === view ? 'white' : '#bfc0d1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
          >
            {view === 'studio' && '🎨 Studio'}
            {view === 'drafts' && `📝 Drafts (${drafts.length})`}
            {view === 'wardrobe' && `👗 Wardrobe (${wardrobeNFTs.length})`}
            {view === 'dotvatar' && '🪞 DOTvatar'}
          </button>
        ))}
      </nav>

      {/* Studio View */}
      {currentView === 'studio' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: '#fff', marginBottom: '8px', fontSize: '32px' }}>🎨 NFT Design Studio</h2>
          <p style={{ color: '#bfc0d1', marginBottom: '30px' }}>Create unique fashion NFTs with advanced tools</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', marginBottom: '30px' }}>
            <EnhancedCanvasStudio ref={canvasRef} />
            
            {/* Properties Panel */}
            <div style={{ 
              background: 'rgba(49, 50, 62, 0.5)',
              borderRadius: '16px',
              padding: '25px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(96, 81, 155, 0.2)',
              maxHeight: '800px',
              overflowY: 'auto'
            }}>
              <h3 style={{ color: '#fff', marginTop: 0 }}>Properties</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#bfc0d1', fontSize: '14px' }}>Name *</label>
                <input
                  type="text"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="My Fashion NFT"
                  style={inputStyle}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#bfc0d1', fontSize: '14px' }}>Description</label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Describe your NFT..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#bfc0d1', fontSize: '14px' }}>Royalty %</label>
                  <input
                    type="number"
                    value={royalty}
                    onChange={(e) => setRoyalty(Number(e.target.value))}
                    min="0"
                    max="50"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#bfc0d1', fontSize: '14px' }}>Level</label>
                  <input
                    type="number"
                    value={metadata.level}
                    onChange={(e) => setMetadata({ ...metadata, level: Number(e.target.value) })}
                    min="1"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(96, 81, 155, 0.2)' }}>
                <h4 style={{ color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                  <Layers size={16} /> Composability
                </h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer', color: '#bfc0d1' }}>
                  <input
                    type="checkbox"
                    checked={metadata.nestable}
                    onChange={(e) => setMetadata({ ...metadata, nestable: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#60519b' }}
                  />
                  <span>Nestable (can own other NFTs)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer', color: '#bfc0d1' }}>
                  <input
                    type="checkbox"
                    checked={metadata.composable}
                    onChange={(e) => setMetadata({ ...metadata, composable: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#60519b' }}
                  />
                  <span>Composable (can be combined)</span>
                </label>
              </div>

              <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(96, 81, 155, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <Star size={16} /> Attributes
                  </h4>
                  <button 
                    onClick={() => setMetadata(prev => ({ 
                      ...prev, 
                      attributes: [...prev.attributes, { trait_type: '', value: '' }] 
                    }))}
                    style={{ 
                      padding: '6px 14px', 
                      background: '#60519b', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    + Add
                  </button>
                </div>

                {metadata.attributes.map((attr, index) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Trait"
                      value={attr.trait_type}
                      onChange={(e) => {
                        const newAttrs = [...metadata.attributes];
                        newAttrs[index].trait_type = e.target.value;
                        setMetadata({ ...metadata, attributes: newAttrs });
                      }}
                      style={{ ...inputStyle, fontSize: '14px', padding: '10px' }}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => {
                        const newAttrs = [...metadata.attributes];
                        newAttrs[index].value = e.target.value;
                        setMetadata({ ...metadata, attributes: newAttrs });
                      }}
                      style={{ ...inputStyle, fontSize: '14px', padding: '10px' }}
                    />
                    <button 
                      onClick={() => setMetadata(prev => ({
                        ...prev,
                        attributes: prev.attributes.filter((_, i) => i !== index)
                      }))}
                      style={{
                        padding: '10px',
                        background: 'rgba(255, 107, 107, 0.2)',
                        color: '#ff6b6b',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={handleSaveDraft} style={secondaryButtonStyle}>
              <Save size={18} /> Save Draft
            </button>
            <button onClick={handleExportAndMint} style={primaryButtonStyle}>
              🚀 Export & Mint
            </button>
          </div>
        </motion.div>
      )}

      {/* Drafts View */}
      {currentView === 'drafts' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: '#fff', marginBottom: '30px' }}>📝 Your Drafts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
            {drafts.map(draft => (
              <div key={draft.id} style={{
                background: 'rgba(49, 50, 62, 0.6)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                cursor: 'pointer'
              }}>
                <img src={draft.image_url} alt={draft.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 5px 0' }}>{draft.title}</h3>
                  <p style={{ color: '#bfc0d1', fontSize: '14px', opacity: 0.8 }}>{draft.description}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <span style={{ padding: '4px 12px', background: 'rgba(96, 81, 155, 0.3)', borderRadius: '12px', fontSize: '12px', color: '#bfc0d1' }}>
                      {draft.rarity}
                    </span>
                    <span style={{ padding: '4px 12px', background: 'rgba(191, 192, 209, 0.2)', borderRadius: '12px', fontSize: '12px', color: '#bfc0d1' }}>
                      {draft.royalty}% royalty
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentView('studio');
                      setTimeout(() => {
                        canvasRef.current?.loadImageFromDataURL(draft.image_url);
                        setMetadata({
                          ...metadata,
                          name: draft.title,
                          description: draft.description
                        });
                      }, 100);
                    }}
                    style={{ ...primaryButtonStyle, width: '100%', marginTop: '15px' }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            {drafts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#bfc0d1' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📭</div>
                <p>No drafts yet. Start creating!</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Wardrobe View */}
      {currentView === 'wardrobe' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: '#fff', marginBottom: '30px' }}>👗 Your Wardrobe</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            {/* DOTvatar Preview */}
            <div style={{
              background: 'rgba(49, 50, 62, 0.6)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(96, 81, 155, 0.2)',
              height: 'fit-content'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#fff', margin: 0 }}>My DOTvatar</h3>
                <button onClick={() => setCurrentView('dotvatar')} style={{
                  padding: '6px 12px',
                  background: '#60519b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  Edit
                </button>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #1e202c 0%, #31323e 100%)',
                borderRadius: '12px',
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                border: '2px solid rgba(96, 81, 155, 0.2)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '80px' }}>🪞</span>
                  <p style={{ color: '#bfc0d1', marginTop: '15px' }}>No DotVatar configured</p>
                  <button onClick={() => setCurrentView('dotvatar')} style={{ ...primaryButtonStyle, marginTop: '10px' }}>
                    Create DotVatar
                  </button>
                </div>
              </div>
            </div>

            {/* NFT Collection */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#fff', margin: 0 }}>Fashion NFTs</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#bfc0d1' }}>
                  <span style={{ fontSize: '18px', fontWeight: 600, color: '#60519b' }}>{wardrobeNFTs.length}</span>
                  <span>Items</span>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {wardrobeNFTs.map(nft => (
                  <div key={nft.id} style={{
                    background: 'rgba(49, 50, 62, 0.6)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img src={nft.metadata.image} alt={nft.metadata.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: 'white'
                      }}>
                        <Lock size={10} />
                        <span>Owned</span>
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h4 style={{ color: '#fff', fontSize: '15px', margin: '0 0 8px 0' }}>{nft.metadata.name}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#bfc0d1' }}>
                          <span>Token:</span>
                          <span>#{nft.token_id.slice(0, 8)}...</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#bfc0d1' }}>Rarity:</span>
                          <span style={{ 
                            padding: '2px 8px', 
                            background: nft.rarity === 'Epic' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(96, 81, 155, 0.2)', 
                            borderRadius: '6px',
                            color: nft.rarity === 'Epic' ? '#a855f7' : '#60519b',
                            fontSize: '11px'
                          }}>
                            {nft.rarity}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', marginTop: '4px' }}>
                          <Shield size={12} />
                          <span style={{ fontSize: '11px' }}>NFT Protection Active</span>
                        </div>
                      </div>
                      <button style={{ ...secondaryButtonStyle, width: '100%', marginTop: '10px', fontSize: '12px', padding: '8px' }}>
                        <Eye size={14} /> View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {wardrobeNFTs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#bfc0d1' }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>👗</div>
                  <p>No NFTs in your wardrobe yet</p>
                  <button onClick={() => setCurrentView('studio')} style={{ ...primaryButtonStyle, marginTop: '15px' }}>
                    Create Your First NFT
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* DOTvatar View */}
      {currentView === 'dotvatar' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h2 style={{ color: '#fff', margin: '0 0 8px 0' }}>🪞 DOTvatar Studio</h2>
              <p style={{ color: '#bfc0d1', margin: 0 }}>Customize your digital avatar</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={secondaryButtonStyle}>
                <RotateCcw size={18} /> Reset
              </button>
              <button style={primaryButtonStyle}>
                <Save size={18} /> Save & Apply
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '30px' }}>
            {/* Preview */}
            <div style={{
              background: 'rgba(49, 50, 62, 0.6)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(96, 81, 155, 0.2)',
              height: 'fit-content'
            }}>
              <h3 style={{ color: '#fff', marginTop: 0 }}>Preview</h3>
              <div style={{
                background: 'linear-gradient(135deg, #1e202c 0%, #31323e 100%)',
                borderRadius: '12px',
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                border: '2px solid rgba(96, 81, 155, 0.2)'
              }}>
                <svg viewBox="0 0 200 300" style={{ width: '100%', maxWidth: '300px' }}>
                  <rect width="200" height="300" fill="url(#bgGradient)" />
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e202c" />
                      <stop offset="100%" stopColor="#31323e" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="100" cy="200" rx="40" ry="60" fill="#FFE0BD" />
                  <circle cx="100" cy="80" r="50" fill="#FFE0BD" />
                  <path d="M 50 70 Q 50 30 100 30 Q 150 30 150 70 L 140 80 Q 100 75 60 80 Z" fill="#3D2314" />
                  <ellipse cx="80" cy="75" rx="8" ry="12" fill="#4A3C2F" />
                  <ellipse cx="120" cy="75" rx="8" ry="12" fill="#4A3C2F" />
                  <circle cx="80" cy="75" r="4" fill="#000" />
                  <circle cx="120" cy="75" r="4" fill="#000" />
                  <path d="M 85 100 Q 100 110 115 100" stroke="#000" strokeWidth="2" fill="none" opacity="0.5" />
                  <rect x="60" y="130" width="80" height="70" fill="#4A90E2" rx="5" />
                  <text x="100" y="280" textAnchor="middle" fontSize="10" fill="white" opacity="0.3">DOTique</text>
                </svg>
              </div>
              <p style={{ color: '#bfc0d1', fontSize: '13px', marginTop: '15px', textAlign: 'center' }}>
                This is how your DOTvatar will appear across DOTique
              </p>
            </div>

            {/* Customization */}
            <div style={{
              background: 'rgba(49, 50, 62, 0.6)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(96, 81, 155, 0.2)'
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                {['Body', 'Face', 'Hair', 'Clothing'].map(tab => (
                  <button key={tab} style={{
                    flex: 1,
                    padding: '12px',
                    background: tab === 'Body' ? '#60519b' : 'transparent',
                    border: '2px solid rgba(96, 81, 155, 0.3)',
                    borderRadius: '8px',
                    color: tab === 'Body' ? 'white' : '#bfc0d1',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }}>
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '12px' }}>Skin Tone</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                    {['#FFE0BD', '#F1C27D', '#C68642', '#8D5524', '#5C3317', '#3D2314'].map(color => (
                      <div key={color} style={{
                        width: '100%',
                        paddingBottom: '100%',
                        background: color,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: '3px solid rgba(96, 81, 155, 0.5)',
                        transition: 'all 0.2s ease'
                      }} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '12px' }}>Body Type</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {['Slim', 'Average', 'Athletic', 'Curvy'].map(type => (
                      <button key={type} style={{
                        padding: '10px',
                        background: type === 'Average' ? '#60519b' : 'rgba(96, 81, 155, 0.2)',
                        border: '2px solid rgba(96, 81, 155, 0.3)',
                        borderRadius: '8px',
                        color: type === 'Average' ? 'white' : '#bfc0d1',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s ease'
                      }}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  marginTop: '20px', 
                  padding: '20px', 
                  background: 'rgba(96, 81, 155, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(96, 81, 155, 0.2)'
                }}>
                  <p style={{ color: '#bfc0d1', fontSize: '14px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={18} color="#60519b" />
                    <span>Unlock premium customization options by purchasing exclusive NFT clothing items from the marketplace!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Metadata Modal */}
      <AnimatePresence>
        {showMetadataModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowMetadataModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #1e202c 0%, #31323e 100%)',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '2px solid rgba(96, 81, 155, 0.3)'
              }}
            >
              <h3 style={{ color: '#fff', marginTop: 0 }}>NFT Metadata</h3>
              
              <div style={{ marginBottom: '25px', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(96, 81, 155, 0.2)' }}>
                <img src={metadata.image} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'contain', background: 'white' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#bfc0d1' }}>Name *</label>
                <input
                  type="text"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="My Fashion NFT"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={() => setShowMetadataModal(false)} style={{ ...secondaryButtonStyle, flex: 1 }}>
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!metadata.name) {
                      alert('Please enter a name for your NFT');
                      return;
                    }
                    alert('✅ NFT minted successfully!');
                    setShowMetadataModal(false);
                  }}
                  style={{ ...primaryButtonStyle, flex: 1 }}
                >
                  Continue to Mint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  background: 'rgba(30, 32, 44, 0.8)',
  border: '2px solid rgba(96, 81, 155, 0.3)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '14px',
  fontFamily: "'Poppins', sans-serif",
  transition: 'all 0.3s ease'
};

const primaryButtonStyle: React.CSSProperties = {
  padding: '14px 32px',
  background: 'linear-gradient(135deg, #60519b 0%, #7d6bb3 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  fontFamily: "'Poppins', sans-serif"
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: '14px 32px',
  background: 'rgba(49, 50, 62, 0.8)',
  color: '#bfc0d1',
  border: '2px solid rgba(96, 81, 155, 0.3)',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  fontFamily: "'Poppins', sans-serif"
};
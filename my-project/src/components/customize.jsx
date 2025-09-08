import React, { useState, useRef } from 'react';
import { useWishlist } from './WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './cart';
import { Design, customizedTshirts } from '../components/Data';


const defaultEffects = {
  opacity: 1,
  brightness: 1,
  contrast: 1,
  noise: 0,
  saturation: 1,
  hue: 0,
  pixelate: 0,
  blur: 0,
};

const filters = [
  { name: 'Epic', css: 'contrast(1.2) saturate(1.3) brightness(1.1)' },
  { name: 'Festive', css: 'hue-rotate(30deg) saturate(1.5)' },
  { name: 'Summer', css: 'brightness(1.2) saturate(1.2)' },
  { name: 'Greyscale', css: 'grayscale(1)' },
];

const TShirtCustomizer = () => {
  const tshirts = customizedTshirts;

  // Center design by default (max-w-md = 384px, h-96 = 384px)
  const tshirtAreaWidth = 384;
  const tshirtAreaHeight = 384;
  const defaultDesignSize = 100;
  const [selectedTShirt, setSelectedTShirt] = useState(tshirts[0]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    x: (tshirtAreaWidth - defaultDesignSize) / 2,
    y: (tshirtAreaHeight - defaultDesignSize) / 2,
  });
  const [designSize, setDesignSize] = useState(defaultDesignSize);
  const designSizeRef = useRef(designSize);
  React.useEffect(() => { designSizeRef.current = designSize; }, [designSize]);
  const [finalImage, setFinalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  // Use global wishlist context
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [effects, setEffects] = useState(defaultEffects);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showTextTool, setShowTextTool] = useState(false);
  const [textLines, setTextLines] = useState([]); // {text, x, y, size, color}
  const [activeTextIdx, setActiveTextIdx] = useState(null);
  const [dragTextIdx, setDragTextIdx] = useState(null);
  const [dragTextOffset, setDragTextOffset] = useState({ x: 0, y: 0 });
  const [albumImages] = useState([
    // Demo album images, replace with your own
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  ]);
  const fileInputRef = useRef();

  // Drag logic for both design and text
  React.useEffect(() => {
    const handleMove = (e) => {
      const tshirtArea = document.querySelector('.tshirt-area');
      if (!tshirtArea) return;
      const rect = tshirtArea.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      if (dragging) {
        const offsetX = clientX - rect.left - designSize / 2;
        const offsetY = clientY - rect.top - designSize / 2;
        const minX = 0;
        const minY = 0;
        const maxX = rect.width - designSize;
        const maxY = rect.height - designSize;
        const newX = Math.max(minX, Math.min(offsetX, maxX));
        const newY = Math.max(minY, Math.min(offsetY, maxY));
        setPosition({ x: newX, y: newY });
      }
      if (dragTextIdx !== null) {
        const { x: offsetX, y: offsetY } = dragTextOffset;
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        setTextLines(lines => lines.map((line, idx) => idx === dragTextIdx ? {
          ...line,
          x: Math.max(0, Math.min(mouseX - offsetX, rect.width - line.size * line.text.length * 0.6)),
          y: Math.max(0, Math.min(mouseY - offsetY, rect.height - line.size)),
        } : line));
      }
    };
    const handleUp = () => {
      setDragging(false);
      setDragTextIdx(null);
    };
    if (dragging || dragTextIdx !== null) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [dragging, dragTextIdx, dragTextOffset, designSize]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setSelectedDesign(null);
      setTimeout(() => {
        const tshirtImg = document.querySelector('.tshirt-area img');
        if (tshirtImg) {
          const areaRect = document.querySelector('.tshirt-area').getBoundingClientRect();
          const imgRect = tshirtImg.getBoundingClientRect();
          const size = designSizeRef.current;
          const x = imgRect.left - areaRect.left + (imgRect.width - size) / 2;
          const y = imgRect.top - areaRect.top + (imgRect.height - size) / 2;
          setPosition({ x, y });
        }
      }, 0);
    }
  };

  const increaseSize = () => setDesignSize((prev) => Math.min(prev + 20, 200));
  const decreaseSize = () => setDesignSize((prev) => Math.max(prev - 20, 40));

  const resetCustomizer = () => {
    setSelectedTShirt(tshirts[0]);
    setSelectedDesign(null);
    setUploadedImage(null);
    setPosition({
      x: (tshirtAreaWidth - defaultDesignSize) / 2,
      y: (tshirtAreaHeight - defaultDesignSize) / 2,
    });
    setDesignSize(defaultDesignSize);
    setFinalImage(null);
    setTextLines([]);
    setActiveTextIdx(null);
  };

  const generateFinalImage = () => {
    setLoading(true);
    const canvas = document.getElementById('finalCanvas');
    const ctx = canvas.getContext('2d');
    const tshirtImg = new Image();
    tshirtImg.crossOrigin = 'anonymous';
    tshirtImg.src = selectedTShirt.image;
    const designImg = new Image();
    designImg.crossOrigin = 'anonymous';
    designImg.src = uploadedImage || selectedDesign?.image;
    tshirtImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);
      if (uploadedImage || selectedDesign) {
        designImg.onload = () => {
          const tshirtBox = document.querySelector('.tshirt-area').getBoundingClientRect();
          const scaleX = canvas.width / tshirtBox.width;
          const scaleY = canvas.height / tshirtBox.height;
          ctx.drawImage(
            designImg,
            position.x * scaleX,
            position.y * scaleY,
            designSize * scaleX,
            designSize * scaleY
          );
          const dataURL = canvas.toDataURL('image/png');
          setFinalImage(dataURL);
          setLoading(false);
        };
      } else {
        const dataURL = canvas.toDataURL('image/png');
        setFinalImage(dataURL);
        setLoading(false);
      }
    };
  };

  const downloadImage = () => {
    if (finalImage) {
      const link = document.createElement('a');
      link.href = finalImage;
      link.download = 'custom-tshirt.png';
      link.click();
    }
  };

  // Add text line
  const handleAddText = () => {
    // Center text horizontally and vertically
    const textSize = 28;
    const text = 'Your Text';
    // Estimate text width using average char width (textSize * 0.6)
    const textWidth = text.length * textSize * 0.6;
    setTextLines([
      ...textLines,
      {
        text,
        x: (tshirtAreaWidth - textWidth) / 2,
        y: (tshirtAreaHeight - textSize) / 2,
        size: textSize,
        color: '#222',
      },
    ]);
    setShowTextTool(false);
    setActiveTextIdx(textLines.length);
  };

  // Edit text line
  const handleTextChange = (idx, key, value) => {
    setTextLines(lines => lines.map((line, i) => i === idx ? { ...line, [key]: value } : line));
  };

  // Remove text line
  const handleRemoveText = (idx) => {
    setTextLines(lines => lines.filter((_, i) => i !== idx));
    setActiveTextIdx(null);
  };

  // Mouse down on text
  const handleTextMouseDown = (idx, e) => {
    e.stopPropagation();
    const container = e.target.closest('.tshirt-area');
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - textLines[idx].x;
    const offsetY = e.clientY - rect.top - textLines[idx].y;
    setDragTextIdx(idx);
    setDragTextOffset({ x: offsetX, y: offsetY });
    setActiveTextIdx(idx);
  };

  // Mouse up
  const handleMouseUp = () => {
    setDragging(false);
    setDragTextIdx(null);
  };

  // Build a unique custom product object
  const customProduct = {
    id: `${selectedTShirt.color}-${selectedDesign?.id || uploadedImage || 'custom'}-${designSize}`,
    name: 'Custom T-Shirt',
    price: 999,
    image: finalImage || uploadedImage || selectedDesign?.image || selectedTShirt.image,
    size: 'Custom',
    color: { name: selectedTShirt.color },
    quantity: 1,
    // Keep extra metadata; cart UI will ignore these
    tshirtColor: selectedTShirt.color,
    tshirtImage: selectedTShirt.image,
    designImage: uploadedImage || selectedDesign?.image,
    designId: selectedDesign?.id || null,
    designSize,
    position,
    effects,
    filter: activeFilter,
    textLines,
  };

  // Check if this custom product is already in wishlist
  const isWishlisted = wishlist.some(item => item.id === customProduct.id);

  const { addToCart } = useCart();

  return (
    <div className="max-w-[1600px] mx-auto p-0 md:p-2 lg:p-4 font-sans select-none min-h-screen flex flex-col bg-[#f8f8f8]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-600">Print<span className="text-gray-700">TeeQ</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600">$100</button>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700"
            onClick={() => {
              addToCart(customProduct);
              navigate('/cart');
            }}
          >
            Add To cart
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'}`}
            onClick={() => {
              if (isWishlisted) {
                removeFromWishlist(customProduct.id);
              } else {
                addToWishlist(customProduct);
                navigate('/wishlist');
              }
            }}
          >
            {isWishlisted ? '❤️ Wishlisted' : '🤍 Save to Wishlist'}
          </button>
          <Link to="/wishlist">
            <span className="relative"><svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7" /></svg></span>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 w-full min-h-0">
        {/* Sidebar */}
        <aside className="w-72 min-w-[220px] max-w-xs bg-white border-r shadow-sm flex flex-col gap-4 p-4 h-full sticky top-[56px] z-10">
          {/* Album */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Album</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {albumImages.map((img, i) => (
                <img key={i} src={img} alt={`Album ${i}`} className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-orange-400" onClick={() => {
                  setUploadedImage(img);
                  setSelectedDesign(null);
                  setTimeout(() => {
                    const tshirtImg = document.querySelector('.tshirt-area img');
                    if (tshirtImg) {
                      const areaRect = document.querySelector('.tshirt-area').getBoundingClientRect();
                      const imgRect = tshirtImg.getBoundingClientRect();
                      const size = designSizeRef.current;
                      const x = imgRect.left - areaRect.left + (imgRect.width - size) / 2;
                      const y = imgRect.top - areaRect.top + (imgRect.height - size) / 2;
                      setPosition({ x, y });
                    }
                  }, 0);
                }} />
              ))}
            </div>
            <button className="text-xs text-blue-600 mt-1 hover:underline">View All</button>
          </div>
          {/* Upload Images */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Upload Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100" onClick={() => fileInputRef.current?.click()}>
              <span className="text-gray-500 text-sm">Drag or Upload</span>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </div>
            <div className="flex gap-2 mt-2">
              <button className="bg-gray-200 rounded p-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm2 2a1 1 0 100 2 1 1 0 000-2zm8 6H6v-1h8v1z" /></svg></button>
              <button className="bg-gray-200 rounded p-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" /></svg></button>
            </div>
          </div>
          {/* Clip Art/Designs */}
          <div className="mb-4">
  <h3 className="font-bold text-gray-700 mb-2">Clip Art</h3>
  <div className="flex flex-wrap gap-2">
    {Design.map(design => (
      <img
        key={design.id}
        src={design.image}
        alt={`Design ${design.id}`}
        className="w-12 h-12 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-purple-400"
        onClick={() => {
          setSelectedDesign(design);
          setUploadedImage(null);
          setTimeout(() => {
            const tshirtImg = document.querySelector('.tshirt-area img');
            if (tshirtImg) {
              const areaRect = document.querySelector('.tshirt-area').getBoundingClientRect();
              const imgRect = tshirtImg.getBoundingClientRect();
              const size = designSizeRef.current;
              const x = imgRect.left - areaRect.left + (imgRect.width - size) / 2;
              const y = imgRect.top - areaRect.top + (imgRect.height - size) / 2;
              setPosition({ x, y });
            }
          }, 0);
        }}
      />
    ))}
  </div>
</div>
          {/* Text Tool */}
          <div className="mb-4">
            <button className="w-full bg-blue-100 text-blue-700 font-bold py-2 rounded-lg hover:bg-blue-200" onClick={() => setShowTextTool(true)}>Add Text</button>
          </div>
        </aside>

        {/* Main Preview & Controls */}
        <main className="flex-1 flex flex-row justify-between p-2 md:p-6 lg:p-10 min-h-0">
          {/* Preview Area */}
   <div className='flex flex-col '>
          <div
            className="relative tshirt-area w-full max-w-md h-96 bg-white rounded-xl shadow-xl overflow-hidden border "
            style={{ touchAction: 'none' }}
            >
            <img src={selectedTShirt.image} alt={selectedTShirt.color + ' T-shirt'} className="w-full h-full object-contain" />
            {(uploadedImage || selectedDesign) && (
              <img
              src={uploadedImage || selectedDesign.image}
              alt="Design"
              onMouseDown={e => { e.preventDefault(); setDragging(true); }}
              onTouchStart={e => { e.preventDefault(); setDragging(true); }}
              className="absolute cursor-move transition-all duration-200 outline-none"
              style={{
                top: `${position.y}px`,
                  left: `${position.x}px`,
                  width: `${designSize}px`,
                  height: `${designSize}px`,
                  zIndex: 10,
                  filter: `${activeFilter ? filters.find(f => f.name === activeFilter)?.css : ''} opacity(${effects.opacity}) brightness(${effects.brightness}) contrast(${effects.contrast}) saturate(${effects.saturation}) hue-rotate(${effects.hue}deg) blur(${effects.blur * 10}px)`
                }}
                tabIndex={0}
                aria-label="Move design"
                draggable={false}
                />
              )}
            {/* Render text lines */}
            {textLines.map((line, idx) => (
              <div
              key={idx}
              className={`absolute cursor-move select-text ${activeTextIdx === idx ? 'ring-2 ring-blue-400' : ''}`}
              style={{
                top: line.y,
                left: line.x,
                fontSize: line.size,
                color: line.color,
                fontWeight: 'bold',
                zIndex: 20,
                userSelect: 'none',
                padding: '2px 6px',
                background: activeTextIdx === idx ? 'rgba(255,255,255,0.7)' : 'transparent',
                borderRadius: 6,
                minWidth: 30,
                minHeight: 20,
                maxWidth: 220,
                textShadow: '0 1px 2px #fff, 0 0 2px #0002',
                cursor: 'move',
              }}
              onMouseDown={e => { e.preventDefault(); handleTextMouseDown(idx, e); }}
              onTouchStart={e => { e.preventDefault(); handleTextMouseDown(idx, e.touches[0]); }}
              tabIndex={0}
              onClick={e => { e.stopPropagation(); setActiveTextIdx(idx); }}
              draggable={false}
              >
                {activeTextIdx === idx ? (
                  <input
                  value={line.text}
                  onChange={e => handleTextChange(idx, 'text', e.target.value)}
                  className="bg-transparent border-b border-blue-400 outline-none font-bold w-full"
                  style={{ fontSize: line.size, color: line.color, minWidth: 30, background: 'transparent' }}
                  autoFocus
                  onBlur={e => setActiveTextIdx(null)}
                  onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span>{line.text}</span>
                )}
                {activeTextIdx === idx && (
                  
                  
                     
                  
                  <div className="flex gap-1 mt-1">
                    <input
                      type="color"
                      value={line.color}
                      onChange={e => handleTextChange(idx, 'color', e.target.value)}
                      className="w-6 h-6 border-none p-0"
                      title="Text color"
                      onClick={e => e.stopPropagation()}
                    />
                    <input
                      type="range"
                      min={14}
                      max={60}
                      value={line.size}
                      onChange={e => handleTextChange(idx, 'size', +e.target.value)}
                      className="w-16"
                      title="Text size"
                      onClick={e => e.stopPropagation()}
                    />
                    <button className="text-xs text-red-500 ml-1" onClick={e => { e.stopPropagation(); handleRemoveText(idx); }} title="Remove">✕</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* T-shirt color picker */}
          <div className="flex gap-2 mt-4 mb-2">
            {tshirts.map(shirt => (
              <button
                key={shirt.id}
                onClick={() => setSelectedTShirt(shirt)}
                className={`border rounded-xl p-1 shadow-sm hover:ring-2 focus:ring-2 focus:outline-none ${selectedTShirt.id === shirt.id ? 'ring-2 ring-orange-500' : ''}`}
                aria-label={`Select ${shirt.color} T-shirt`}
              >
                <img src={shirt.image} alt={shirt.color} className="w-10 h-10 object-cover rounded-lg" />
              </button>
            ))}
          </div>
</div>
          {/* Image Effects Controls */}
       
       <div className=''>

       
          <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 mt-2 mb-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <span className="font-bold text-gray-700">Image Effects</span>
              <button className="text-xs text-blue-600 hover:underline" onClick={() => setEffects(defaultEffects)}>Reset</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries({
                Opacity: 'opacity',
                Brightness: 'brightness',
                Contrast: 'contrast',
                Noise: 'noise',
                Saturation: 'saturation',
                Hue: 'hue',
                Pixelate: 'pixelate',
                Blur: 'blur',
              }).map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">{label}</label>
                  <input
                    type="range"
                    min={key === 'hue' ? 0 : key === 'blur' ? 0 : 0}
                    max={key === 'hue' ? 360 : key === 'pixelate' ? 50 : key === 'blur' ? 1 : 2}
                    step={key === 'hue' ? 1 : key === 'pixelate' ? 1 : key === 'blur' ? 0.01 : 0.01}
                    value={effects[key]}
                    onChange={e => setEffects(effects => ({ ...effects, [key]: key === 'hue' || key === 'pixelate' ? +e.target.value : parseFloat(e.target.value) }))}
                  />
                  <span className="text-xs text-gray-500">{key === 'hue' ? effects[key] + '°' : key === 'pixelate' ? effects[key] : Math.round(effects[key] * 100) + '%'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Filters */}
          <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 mb-4 flex flex-col gap-2">
            <span className="font-bold text-gray-700 mb-2">Image Filters</span>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map(f => (
                <button key={f.name} className={`rounded-lg border px-2 py-1 text-xs font-semibold ${activeFilter === f.name ? 'bg-orange-100 border-orange-400' : 'bg-white border-gray-200'}`} onClick={() => setActiveFilter(f.name)}>{f.name}</button>
              ))}
              <button className="rounded-lg border px-2 py-1 text-xs font-semibold bg-white border-gray-200" onClick={() => setActiveFilter(null)}>Clear</button>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap gap-2 w-full max-w-lg mb-4">
            <button onClick={decreaseSize} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">➖ Smaller</button>
            <button onClick={increaseSize} className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">➕ Bigger</button>
            <button onClick={resetCustomizer} className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-sm">🔄 Reset</button>
            <button onClick={() => setShowModel(true)} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">👕 3D Preview</button>
            <button onClick={() => setWishlist(w => !w)} className={`px-3 py-2 rounded-lg text-sm font-semibold ${wishlist ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'}`}>{wishlist ? '❤️ Wishlisted' : '🤍 Save to Wishlist'}</button>
            <button onClick={downloadImage} className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm" disabled={!finalImage}>⬇️ Download</button>
          </div>
</div>
          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 mt-2 text-purple-700 font-semibold"><span className="animate-spin">⏳</span> Generating image...</div>
          )}

          {/* Text Tool Modal */}
          {showTextTool && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative flex flex-col items-center">
                <button className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-500" onClick={() => setShowTextTool(false)} aria-label="Close">×</button>
                <h3 className="font-bold text-lg mb-2">Add Text</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700" onClick={handleAddText}>Add Text Line</button>
                <ul className="mt-4 w-full">
                  {textLines.map((line, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-2">
                      <span className="flex-1 truncate">{line.text}</span>
                      <button className="text-xs text-red-500" onClick={() => handleRemoveText(idx)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          )}

          {/* 3D Preview Modal (precise overlay mapping) */}
          {showModel && (() => {
            // Main preview area: 384x384, T-shirt image in modal: 180x220, centered horizontally, bottom-aligned in 192x288 modal
            const mainW = 384, mainH = 384;
            const tshirtImgW = 180, tshirtImgH = 220;
            const modalW = 192, modalH = 288;
            // Scaling overlays from main preview to T-shirt image area
            const scaleX = tshirtImgW / mainW;
            const scaleY = tshirtImgH / mainH;
            // T-shirt image top-left in modal
            const tshirtImgLeft = (modalW - tshirtImgW) / 2;
            const tshirtImgTop = modalH - tshirtImgH;
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative flex flex-col items-center">
                  <button className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-500" onClick={() => setShowModel(false)} aria-label="Close">×</button>
                  <div className="w-48 h-72 bg-gray-200 rounded-full flex items-end justify-center relative overflow-hidden">
                    <img src={selectedTShirt.image} alt="T-shirt on model" className="absolute bottom-0 left-1/2" style={{ width: `${tshirtImgW}px`, height: `${tshirtImgH}px`, transform: 'translateX(-50%)', objectFit: 'contain' }} />
                    {(uploadedImage || selectedDesign) && (
                      <img
                        src={uploadedImage || selectedDesign.image}
                        alt="Design on model"
                        className="absolute"
                        style={{
                          left: '50%',
                          top: `${tshirtImgTop + position.y * scaleY}px`,
                          width: `${designSize * scaleX}px`,
                          height: `${designSize * scaleY}px`,
                          objectFit: 'contain',
                          zIndex: 10,
                          transform: `translateX(-50%)`,
                        }}
                      />
                    )}
                    {textLines.map((line, idx) => (
                      <span
                        key={idx}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: `${tshirtImgTop + line.y * scaleY}px`,
                          fontSize: `${line.size * scaleY}px`,
                          color: line.color,
                          fontWeight: 'bold',
                          background: 'rgba(255,255,255,0.7)',
                          padding: '2px 8px',
                          borderRadius: 6,
                          zIndex: 20,
                          whiteSpace: 'nowrap',
                          textShadow: '0 1px 2px #fff, 0 0 2px #0002',
                          minWidth: 30 * scaleX,
                          minHeight: 20 * scaleY,
                          maxWidth: 220 * scaleX,
                          transform: `translateX(-50%)`,
                        }}
                      >
                        {line.text}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-lg font-semibold text-gray-700">3D Preview (UI only)</p>
                </div>
              </div>
            );
          })()}

          <canvas id="finalCanvas" width="300" height="400" className="hidden"></canvas>
        </main>
      </div>
    </div>
  );
};

export default TShirtCustomizer;

import React, { useState } from 'react';
import blackShirt from '../assets/t_shirt1.jpg';
import brownShirt from '../assets/t_shirt1brown.jpg';
import greenShirt from '../assets/t_shirt1granitegreen.jpg';
import darkgreenShirt from '../assets/t_shirt1green.jpg';
import { Design } from '../components/Data';

const TShirtCustomizer = () => {
  const tshirts = [
    { id: 1, color: 'Black', image: blackShirt },
    { id: 2, color: 'Brown', image: brownShirt },
    { id: 3, color: 'Light Green', image: greenShirt },
    { id: 4, color: 'Dark Green', image: darkgreenShirt },
  ];

  const [selectedTShirt, setSelectedTShirt] = useState(tshirts[0]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 80, y: 100 });
  const [designSize, setDesignSize] = useState(100);
  const [finalImage, setFinalImage] = useState(null);

  const handleMouseMove = (e) => {
    if (dragging) {
      const container = e.currentTarget.querySelector('.tshirt-area');
      const rect = container.getBoundingClientRect();

      const offsetX = e.clientX - rect.left - designSize / 2;
      const offsetY = e.clientY - rect.top - designSize / 2;

      const minX = 0;
      const minY = 0;
      const maxX = rect.width - designSize;
      const maxY = rect.height - designSize;

      const newX = Math.max(minX, Math.min(offsetX, maxX));
      const newY = Math.max(minY, Math.min(offsetY, maxY));

      setPosition({ x: newX, y: newY });
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setSelectedDesign(null);
    }
  };

  const increaseSize = () => setDesignSize((prev) => Math.min(prev + 20, 200));
  const decreaseSize = () => setDesignSize((prev) => Math.max(prev - 20, 40));

  const generateFinalImage = () => {
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
        };
      } else {
        const dataURL = canvas.toDataURL('image/png');
        setFinalImage(dataURL);
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10 font-sans select-none">
      <h1 className="text-4xl font-bold text-center text-gray-800">🖌️ T-Shirt Designer</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className="relative w-full lg:w-2/3 flex flex-col items-center gap-4"
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragging(false)}
        >
          <div className="relative tshirt-area w-64 sm:w-72 md:w-80 h-96 bg-white rounded-xl shadow-xl overflow-hidden border flex items-center justify-center">
            <img src={selectedTShirt.image} alt="T-shirt" className="w-full h-full object-contain" />
            {(uploadedImage || selectedDesign) && (
              <img
                src={uploadedImage || selectedDesign.image}
                alt="Design"
                onMouseDown={() => setDragging(true)}
                className="absolute cursor-move transition-all duration-200"
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                  width: `${designSize}px`,
                  height: `${designSize}px`,
                }}
              />
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button onClick={decreaseSize} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">➖ Smaller</button>
            <button onClick={increaseSize} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">➕ Bigger</button>
          </div>

          <div className="w-full">
            <p className="font-bold text-lg mb-2 mt-6">🟣 Step 1: Choose T-shirt</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {tshirts.map(shirt => (
                <button
                  key={shirt.id}
                  onClick={() => setSelectedTShirt(shirt)}
                  className={`border rounded-xl p-2 shadow-sm hover:ring-2 ${
                    selectedTShirt.id === shirt.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <img src={shirt.image} alt={shirt.color} className="w-20 h-20 object-cover rounded-lg" />
                  <p className="text-center text-sm mt-1">{shirt.color}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <p className="font-bold text-lg mb-2 mt-6">🎨 Step 2: Add Design</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            <div className="flex flex-wrap gap-4 justify-center">
              {Design.map(design => (
                <button
                  key={design.id}
                  onClick={() => { setSelectedDesign(design); setUploadedImage(null); }}
                  className={`border rounded-xl p-2 hover:ring-2 ${
                    selectedDesign?.id === design.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <img src={design.image} alt={`Design ${design.id}`} className="w-20 h-20 object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          <canvas id="finalCanvas" width="300" height="400" className="hidden"></canvas>

          <button
            onClick={generateFinalImage}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold"
          >
            ✅ Generate Final Design
          </button>
        </div>

        <div className="lg:w-1/3 sticky top-10">
          <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-lg space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">📄 Summary</h2>
            <p className="text-lg">T-shirt Color: <span className="font-semibold">{selectedTShirt.color}</span></p>
            <p className="text-lg">Design: <span className="font-semibold">{uploadedImage ? 'Custom Upload' : (selectedDesign ? `Design ${selectedDesign.id}` : 'None')}</span></p>
            <p className="text-lg">Design Size: <span className="font-semibold">{designSize}px</span></p>
            <div className="w-full h-64 bg-white rounded-xl overflow-hidden border shadow-inner flex justify-center items-center">
              {finalImage ? (
                <img src={finalImage} alt="Final" className="h-full object-contain" />
              ) : (
                <p className="text-gray-500 italic">Click "Generate Final Design" to preview</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtCustomizer;

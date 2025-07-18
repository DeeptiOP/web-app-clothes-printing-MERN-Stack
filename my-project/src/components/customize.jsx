import React, { useState } from "react";

const CustomDesign = () => {
  const [tshirtColor, setTshirtColor] = useState("white");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [designSize, setDesignSize] = useState(150);
  const [shirtSize, setShirtSize] = useState("M");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold mb-4">T-Shirt Designer</h1>

      <div className="flex flex-wrap justify-center gap-5 w-full">
        {/* Left Section - Controls */}
        <div className="flex flex-col gap-4 p-5 bg-white shadow-md rounded-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold">Choose T-Shirt Color</h2>
          <div className="flex gap-2">
            {['white', 'black', 'red', 'blue', 'green', 'yellow', 'pink', 'purple'].map(color => (
              <button
                key={color}
                className="w-10 h-10 rounded-full border-2"
                style={{ backgroundColor: color, borderColor: color === tshirtColor ? 'black' : 'transparent' }}
                onClick={() => setTshirtColor(color)}
              ></button>
            ))}
          </div>

          <h2 className="text-2xl font-semibold">Upload Your Design</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <h2 className="text-2xl font-semibold">Adjust Design Size</h2>
          <input type="range" min="50" max="300" value={designSize} onChange={(e) => setDesignSize(e.target.value)} />
          <span className="font-medium">{designSize}px</span>

          <h2 className="text-2xl font-semibold">Select T-Shirt Size</h2>
          <select
            value={shirtSize}
            onChange={(e) => setShirtSize(e.target.value)}
            className="border p-2 rounded-md"
          >
            {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Right Section - T-Shirt Preview */}
        <div className="relative w-80 h-[450px] bg-white shadow-md rounded-lg flex justify-center items-center" style={{ backgroundColor: tshirtColor }}>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="User Design"
              style={{ width: `${designSize}px`, height: `${designSize}px` }}
              className="absolute"
            />
          )}
          {!uploadedImage && (
            <span className="text-gray-500">Upload your design</span>
          )}
        </div>
      </div>

      <div className="mt-5 text-lg font-medium">
        Selected Size: <span className="font-bold">{shirtSize}</span>
      </div>
    </div>
  );
};

export default CustomDesign;

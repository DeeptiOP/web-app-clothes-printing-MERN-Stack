import React, { useRef, useState, Suspense, useEffect } from "react";
import { ChromePicker } from "react-color";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  FaRegImage,
  FaPalette,
  FaFont,
  FaRobot,
  FaMousePointer,
} from "react-icons/fa";
import ChatBox from "./Chatbox"; // Add this import
import { useNavigate } from "react-router-dom"; // Add this import
import { useCart } from "./cart";
import { useWishlist } from './WishlistContext.jsx';

const SHIRT_MODEL_PATH =
  "https://res.cloudinary.com/dwryce3zm/image/upload/v1754601840/Tshirt_lmx8ca.glb";

function Shirt({ color, overlayTexture }) {
  const { scene } = useGLTF(SHIRT_MODEL_PATH);
  const meshRef = useRef();

  let shirtMesh = null;
  scene.traverse((child) => {
    if (child.isMesh) {
      if (!shirtMesh || child.name.toLowerCase().includes("shirt")) {
        shirtMesh = child;
      }
    }
  });

  if (!shirtMesh) return null;

  let useOverlay = false;
  if (overlayTexture) {
    const canvas = overlayTexture.image;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] !== 0) {
          useOverlay = true;
          break;
        }
      }
    }
  }

  const clonedMesh = shirtMesh.clone();
  clonedMesh.material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    map: useOverlay ? overlayTexture : null,
    metalness: 0.2,
    roughness: 0.7,
    transparent: false,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  return <primitive object={clonedMesh} ref={meshRef} />;
}

function RotatingGroup({ children }) {
  const group = useRef();
  useEffect(() => {
    let frame;
    function animate() {
      if (group.current) {
        group.current.rotation.y += 0.01;
      }
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <group ref={group}>{children}</group>;
}

function ThreeDCustomizer() {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [uploadedImage, setUploadedImage] = useState({
    front: null,
    back: null,
  });
  const [customText, setCustomText] = useState({ front: "", back: "" });
  const [textColor, setTextColor] = useState({
    front: "#a5b4fc",
    back: "#a5b4fc",
  });
  const [overlayTexture, setOverlayTexture] = useState(null);
  const [printSide, setPrintSide] = useState("front");
  const [show3DPreview, setShow3DPreview] = useState(false);
  const [modalPos, setModalPos] = useState({
    x: window.innerWidth / 2 - 300,
    y: window.innerHeight / 2 - 300,
  });
  const [draggingModal, setDraggingModal] = useState(false);
  const [modalDragStart, setModalDragStart] = useState(null);

  // Drag/resize state
  const STICKER_W = 0.28; // width as a fraction of shirt width (adjust as needed)
  const STICKER_H = 0.48; // height as a fraction of shirt height (adjust as needed)

  const [designSize, setDesignSize] = useState({
    front: { w: STICKER_W, h: STICKER_H },
    back: { w: STICKER_W, h: STICKER_H },
  });
  const [designPos, setDesignPos] = useState({
    front: { x: 0.5, y: 0.5 }, // Centered
    back: { x: 0.5, y: 0.5 },
  }); // normalized (0-1)
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [showDesignDragBox, setShowDesignDragBox] = useState(true);

  // New states for text box drag/resize
  const [textBoxSize, setTextBoxSize] = useState({
    front: { w: 0.4, h: 0.12 },
    back: { w: 0.4, h: 0.12 },
  });
  const [textBoxPos, setTextBoxPos] = useState({
    front: { x: 0.5, y: 0.7 },
    back: { x: 0.5, y: 0.7 },
  });
  const [draggingText, setDraggingText] = useState(false);
  const [resizingText, setResizingText] = useState(false);
  const [dragStartText, setDragStartText] = useState(null);
  const [showTextDragBox, setShowTextDragBox] = useState(false);

  // Add a separate drag/resize state for the input text box (not the text on the shirt)
  const [inputBoxPos, setInputBoxPos] = useState({ x: 0.5, y: 0.1 }); // normalized (0-1)
  const [inputBoxSize, setInputBoxSize] = useState({ w: 0.5, h: 0.08 }); // as a fraction of preview
  const [draggingInput, setDraggingInput] = useState(false);
  const [resizingInput, setResizingInput] = useState(false);
  const [dragStartInput, setDragStartInput] = useState(null);
  const [showInputDragBox, setShowInputDragBox] = useState(false);

  // Add this state near your other states
  const [shirtRotation, setShirtRotation] = useState([0, 0, 0]);

  // Update rotation when printSide changes
  useEffect(() => {
    // 0 for front, Math.PI for back
    setShirtRotation([0, printSide === "back" ? Math.PI : 0, 0]);
  }, [printSide]);

  // Drag/resize logic
  useEffect(() => {
    function onMouseMove(e) {
      const previewSize = 500;
      // --- Design Drag ---
      if (dragging && dragStart) {
        // Calculate new position based on mouse movement
        const dx = (e.clientX - dragStart.startX) / previewSize;
        const dy = (e.clientY - dragStart.startY) / previewSize;
        setDesignPos((prev) => ({
          ...prev,
          [printSide]: {
            x: Math.max(0, Math.min(1, dragStart.x + dx)),
            y: Math.max(0, Math.min(1, dragStart.y + dy)),
          },
        }));
      }
      // --- Design Resize ---
      if (resizing && dragStart) {
        // Calculate new size based on mouse movement
        const dw = (e.clientX - dragStart.startX) / previewSize;
        const dh = (e.clientY - dragStart.startY) / previewSize;
        setDesignSize((prev) => ({
          ...prev,
          [printSide]: {
            w: Math.max(0.1, Math.min(1, dragStart.w + dw)),
            h: Math.max(0.1, Math.min(1, dragStart.h + dh)),
          },
        }));
      }
      // --- Text Drag ---
      if (draggingText && dragStartText) {
        const dx = (e.clientX - dragStartText.startX) / previewSize;
        const dy = (e.clientY - dragStartText.startY) / previewSize;
        setTextBoxPos((prev) => ({
          ...prev,
          [printSide]: {
            x: Math.max(0, Math.min(1, dragStartText.x + dx)),
            y: Math.max(0, Math.min(1, dragStartText.y + dy)),
          },
        }));
      }
      // --- Text Resize ---
      if (resizingText && dragStartText) {
        const dw = (e.clientX - dragStartText.startX) / previewSize;
        const dh = (e.clientY - dragStartText.startY) / previewSize;
        setTextBoxSize((prev) => ({
          ...prev,
          [printSide]: {
            w: Math.max(0.1, Math.min(1, dragStartText.w + dw)),
            h: Math.max(0.05, Math.min(0.5, dragStartText.h + dh)),
          },
        }));
      }
      // --- Input Drag ---
      if (draggingInput && dragStartInput) {
        const dx = (e.clientX - dragStartInput.startX) / previewSize;
        const dy = (e.clientY - dragStartInput.startY) / previewSize;
        setInputBoxPos({
          x: Math.max(0, Math.min(1, dragStartInput.x + dx)),
          y: Math.max(0, Math.min(1, dragStartInput.y + dy)),
        });
      }
      // --- Input Resize ---
      if (resizingInput && dragStartInput) {
        const dw = (e.clientX - dragStartInput.startX) / previewSize;
        const dh = (e.clientY - dragStartInput.startY) / previewSize;
        setInputBoxSize({
          w: Math.max(0.2, Math.min(1, dragStartInput.w + dw)),
          h: Math.max(0.05, Math.min(0.2, dragStartInput.h + dh)),
        });
      }
    }
    function onMouseUp() {
      setDragging(false);
      setResizing(false);
      setDragStart(null);
      setShowDesignDragBox(false);
      setDraggingText(false);
      setResizingText(false);
      setDragStartText(null);
      setShowTextDragBox(false);
      setDraggingInput(false);
      setResizingInput(false);
      setDragStartInput(null);
      setShowInputDragBox(false);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    dragging,
    resizing,
    dragStart,
    printSide,
    draggingText,
    resizingText,
    dragStartText,
    draggingInput,
    resizingInput,
    dragStartInput,
  ]);

  // Overlay texture: always draw both sides
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frontW = 1024;
    const frontH = 2048;
    let loaded = { front: false, back: false };

    function drawText(side) {
      if (!customText[side]) return;
      // Calculate text box position and size in canvas coordinates
      const sideX = side === "front" ? 0 : 1024;
      const boxW = frontW * textBoxSize[side].w;
      const boxH = frontH * textBoxSize[side].h;
      const boxX = sideX + frontW * textBoxPos[side].x - boxW / 2;
      const boxY = frontH * designPos[side].y - boxH / 2;

      ctx.save();
      ctx.font = `bold ${Math.floor(boxH * 0.6)}px 'Inter', Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor[side];
      ctx.shadowColor = "#232a36";
      ctx.shadowBlur = 2;
      ctx.fillText(
        customText[side],
        boxX + boxW / 2,
        boxY + boxH / 2,
        boxW * 0.95
      );
      ctx.restore();
    }

    function finalize(side) {
      loaded[side] = true;
      if (loaded.front && loaded.back) {
        const tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setOverlayTexture(tex);
      }
    }

    ["front", "back"].forEach((side) => {
      const sideX = side === "front" ? 0 : 1024;
      if (uploadedImage[side]) {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = uploadedImage[side];
        img.onload = function () {
          const stickerW = frontW * designSize[side].w;
          const stickerH = frontH * designSize[side].h;
          const stickerX = sideX + frontW * designPos[side].x - stickerW / 2;
          const stickerY = frontH * designPos[side].y - stickerH / 2;
          ctx.drawImage(img, stickerX, stickerY, stickerW, stickerH);
          drawText(side); // <-- Draw text after image
          finalize(side);
        };
        img.onerror = function () {
          drawText(side);
          finalize(side);
        };
        if (img.complete && img.naturalWidth !== 0) {
          const stickerW = frontW * designSize[side].w;
          const stickerH = frontH * designSize[side].h;
          const stickerX = sideX + frontW * designPos[side].x - stickerW / 2;
          const stickerY = frontH * designPos[side].y - stickerH / 2;
          ctx.drawImage(img, stickerX, stickerY, stickerW, stickerH);
          drawText(side);
          finalize(side);
        }
      } else {
        drawText(side);
        finalize(side);
      }
    });
    // eslint-disable-next-line
  }, [
    uploadedImage,
    customText,
    textColor,
    color,
    designPos,
    designSize,
    textBoxPos,
    textBoxSize,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new window.FileReader();
    reader.onload = function (ev) {
      setUploadedImage((prev) => ({ ...prev, [printSide]: ev.target.result }));
      setShowDesignDragBox(true); // Show drag box after upload
    };
    reader.readAsDataURL(file);
  };

  const designImages = [
    "https://res.cloudinary.com/dwryce3zm/image/upload/v1754597074/softball_mom_zg7cwl.png",
    "https://res.cloudinary.com/dwryce3zm/image/upload/v1754597036/game_over_back_to_school_k6oabw.png",
    // ...add more Cloudinary URLs here
  ];

  const handleClearImage = () => {
    setUploadedImage((prev) => ({ ...prev, [printSide]: null }));
    setShowDesignDragBox(false);
  };

  // Modal drag logic
  useEffect(() => {
    function onMouseMove(e) {
      if (draggingModal && modalDragStart) {
        setModalPos({
          x: modalDragStart.x + (e.clientX - modalDragStart.startX),
          y: modalDragStart.y + (e.clientY - modalDragStart.startY),
        });
      }
    }
    function onMouseUp() {
      setDraggingModal(false);
      setModalDragStart(null);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [draggingModal, modalDragStart]);

  const previewBoxSize = 500;
  const shirtCenterOffset = previewBoxSize / 2;

  // Build a wishlist/cart-friendly representation of current design
  const buildCustomItem = () => {
    const baseId = `custom-${color}-${printSide}-${customText[printSide] || ''}`;
    const imageKey = uploadedImage[printSide] || '';
    const id = `${baseId}-${imageKey}`;
    return {
      id,
      name: 'Custom T-Shirt',
      price: 999,
      image: uploadedImage[printSide] || undefined,
      size: 'Custom',
      color: { code: color, name: 'Custom' },
      quantity: 1,
      customization: {
        hasCustomization: Boolean(uploadedImage.front || uploadedImage.back || customText.front || customText.back),
        text: customText[printSide] || '',
        textColor: textColor[printSide] || '#000000',
        textPosition: JSON.stringify(textBoxPos[printSide]),
        selectedDesign: uploadedImage[printSide] || '',
        additionalNotes: `side:${printSide}`
      }
    };
  };

  const customItem = buildCustomItem();
  const isWishlisted = wishlist?.some((w) => w.id === customItem.id);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #181c24 0%, #232a36 100%)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          color: "#f3f4f6",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem 3vw 0 3vw",
            background: "rgba(24,28,36,0.95)",
            boxShadow: "0 2px 16px #0008",
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              fontSize: "2rem",
              letterSpacing: 1,
              color: "#a5b4fc",
            }}
          >
            3D T-Shirt Customizer
          </h1>
          <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "none",
                borderRadius: "10px",
                padding: "0.6rem 1.3rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                color: "#a5b4fc",
                transition: "background 0.2s",
              }}
              onClick={() => {
                if (isWishlisted) {
                  removeFromWishlist(customItem.id);
                } else {
                  addToWishlist(customItem);
                }
              }}
            >
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            <button
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "none",
                borderRadius: "10px",
                padding: "0.6rem 1.3rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                color: "#a5b4fc",
                transition: "background 0.2s",
              }}
            >
              Go Back
            </button>
            {/* Wishlist Button */}
            <button
              style={{
                background: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "0.6rem 1.3rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                color: "#6366f1",
                marginLeft: "1rem",
                boxShadow: "0 2px 8px #0002",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              aria-label="Add to Wishlist"
              onClick={() => {
                if (isWishlisted) {
                  removeFromWishlist(customItem.id);
                } else {
                  addToWishlist(customItem);
                }
                navigate('/wishlist');
              }}
            >
              <span role="img" aria-label="wishlist">💖</span>
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
            {/* Add to Cart Button */}
            <button
              style={{
                background: "#6366f1",
                border: "none",
                borderRadius: "10px",
                padding: "0.6rem 1.3rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                color: "#fff",
                marginLeft: "0.7rem",
                boxShadow: "0 2px 8px #0002",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              aria-label="Add to Cart"
              onClick={() => {
                // Build a minimal cart item representing the customized shirt
                const customItem = {
                  id: "custom-tshirt", // stable id for customized product
                  name: "Custom T-Shirt",
                  price: 999, // default customizable price; adjust if needed
                  image: uploadedImage[printSide] || undefined,
                  size: "Custom",
                  color: { code: color, name: "Custom" },
                  quantity: 1,
                  customization: {
                    hasCustomization: Boolean(uploadedImage.front || uploadedImage.back || customText.front || customText.back),
                    text: customText[printSide] || "",
                    textColor: textColor[printSide] || "#000000",
                    textPosition: JSON.stringify(textBoxPos[printSide]),
                    selectedDesign: uploadedImage[printSide] || "",
                    additionalNotes: `side:${printSide}`
                  }
                };
                addToCart(customItem);
                navigate("/cart");
              }}
            >
              <span role="img" aria-label="cart">🛒</span>
              Add to Cart
            </button>
          </nav>
        </header>
        {/* Main Content */}
        <main
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "2.5vw",
            padding: "2.5rem 0 2rem 0",
          }}
        >
          {/* Sidebar */}
          <aside
            style={{
              width: 140,
              minWidth: 120,
              background: "rgba(30,34,44,0.98)",
              borderRadius: "22px",
              boxShadow: "0 2px 24px #0008",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.5rem",
              padding: "2.2rem 0",
              height: "fit-content",
            }}
          >
            {/* Print Side Selector */}
            <div style={{ margin: "1rem 0", textAlign: "center" }}>
              <label
                style={{ fontWeight: 700, fontSize: "1.1rem", color: "#a5b4fc" }}
              >
                Print Side
              </label>
              <div style={{ marginTop: "0.7rem" }}>
                <label style={{ marginRight: "1.2rem", fontWeight: 500 }}>
                  <input
                    type="radio"
                    name="printSide"
                    value="front"
                    checked={printSide === "front"}
                    onChange={() => setPrintSide("front")}
                    style={{ accentColor: "#6366f1" }}
                  />
                  <span style={{ marginLeft: 6 }}>Front</span>
                </label>
                <label style={{ fontWeight: 500 }}>
                  <input
                    type="radio"
                    name="printSide"
                    value="back"
                    checked={printSide === "back"}
                    onChange={() => setPrintSide("back")}
                    style={{ accentColor: "#6366f1" }}
                  />
                  <span style={{ marginLeft: 6 }}>Back</span>
                </label>
              </div>
            </div>
            {/* Color Picker */}
            <div
              style={{
                position: "relative",
                marginBottom: "1.5rem",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#a5b4fc",
                }}
                onClick={() => setShowColorPicker((prev) => !prev)}
                aria-label="Pick shirt color"
              >
                <FaPalette size={28} />
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginTop: "0.3rem",
                    color: "#f3f4f6",
                  }}
                >
                  Color
                </div>
              </button>
              {showColorPicker && (
                <div
                  style={{
                    position: "absolute",
                    left: "120px",
                    top: "0",
                    zIndex: 10,
                    boxShadow: "0 2px 8px #0008",
                    borderRadius: "12px",
                    background: "#232a36",
                    padding: "0.5rem",
                  }}
                >
                  <ChromePicker
                    color={color}
                    onChange={(c) => setColor(c.hex)}
                    disableAlpha={true}
                    styles={{ default: { picker: { width: "220px" } } }}
                  />
                </div>
              )}
            </div>
            {/* File Upload */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaRegImage size={28} color="#a5b4fc" />
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginTop: "0.3rem",
                  color: "#f3f4f6",
                }}
              >
                File
              </div>
              <input
                type="file"
                accept="image/*"
                style={{
                  marginTop: "0.5rem",
                  width: "90%",
                  background: "#232a36",
                  color: "#f3f4f6",
                  border: "1px solid #6366f1",
                  borderRadius: "6px",
                  padding: "0.2rem",
                }}
                onChange={handleImageUpload}
                aria-label="Upload your own image"
              />
              {uploadedImage[printSide] && (
                <button
                  style={{
                    marginTop: "0.5rem",
                    background: "#232a36",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#f87171",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    boxShadow: "0 2px 8px #0002",
                    transition: "background 0.2s",
                  }}
                  onClick={handleClearImage}
                  aria-label="Remove design"
                  title="Remove design"
                >
                  ×
                </button>
              )}
            </div>
            {/* Text Input */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaFont size={28} color="#a5b4fc" />
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginTop: "0.3rem",
                  color: "#f3f4f6",
                }}
              >
                Text
              </div>
              <input
                type="text"
                value={customText[printSide]}
                onChange={(e) =>
                  setCustomText((prev) => ({
                    ...prev,
                    [printSide]: e.target.value,
                  }))
                }
                placeholder="Add text"
                style={{
                  marginTop: "0.5rem",
                  width: "90%",
                  borderRadius: "6px",
                  border: "1px solid #6366f1",
                  background: "#232a36",
                  color: "#f3f4f6",
                  padding: "0.3rem",
                }}
                aria-label="Add custom text"
              />
              <div style={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    fontSize: "0.95rem",
                    marginRight: "0.5rem",
                    color: "#a5b4fc",
                  }}
                >
                  Text Color:
                </label>
                <input
                  type="color"
                  value={textColor[printSide]}
                  onChange={(e) =>
                    setTextColor((prev) => ({
                      ...prev,
                      [printSide]: e.target.value,
                    }))
                  }
                  aria-label="Pick text color"
                  style={{ border: "none", background: "none" }}
                />
              </div>
            </div>
          </aside>
          {/* Main Preview Section */}
          <section
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
              background: "rgba(35,42,54,0.95)",
              borderRadius: "32px",
              boxShadow: "0 8px 32px #0004",
              padding: "2.5rem 2vw 2rem 2vw",
              minHeight: 600,
              maxWidth: 700,
            }}
          >
            {/* Drag/resize overlay */}
            {uploadedImage[printSide] && showDesignDragBox && (
              <div
                style={{
                  position: "absolute",
                  // Add +30 (or your preferred value) to move the box lower
                  top: `calc(${
                    shirtCenterOffset +
                    (designPos[printSide].y - 0.5) * previewBoxSize -
                    (designSize[printSide].h * previewBoxSize) / 2
                  }px + 160px)`,
                  width: `${designSize[printSide].w * previewBoxSize}px`,
                  height: `${designSize[printSide].h * previewBoxSize}px`,
                  border: "2px dashed #6366f1",
                  background: "rgba(99,102,241,0.07)",
                  cursor: dragging ? "grabbing" : "grab",
                  pointerEvents: "auto",
                  boxSizing: "border-box",
                  zIndex: 12,
                  transition: "border 0.2s",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDragging(true);
                  setDragStart({
                    startX: e.clientX,
                    startY: e.clientY,
                    x: designPos[printSide].x,
                    y: designPos[printSide].y,
                  });
                }}
              >
                {/* X Button in the drag box */}
                <button
                  style={{
                    position: "absolute",
                    top: -14,
                    right: -14,
                    background: "#232a36",
                    color: "#f87171",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    boxShadow: "0 2px 8px #0002",
                    zIndex: 3,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearImage();
                  }}
                  aria-label="Remove design"
                  title="Remove design"
                >
                  ×
                </button>
                {/* Resize handle */}
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -10,
                    width: 20,
                    height: 20,
                    background: "#6366f1",
                    borderRadius: "50%",
                    cursor: "nwse-resize",
                    zIndex: 2,
                    border: "2px solid #fff",
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setResizing(true);
                    setDragStart({
                      startX: e.clientX,
                      startY: e.clientY,
                      w: designSize[printSide].w,
                      h: designSize[printSide].h,
                    });
                  }}
                />
              </div>
            )}
            {/* Clickable overlay to re-enable drag box */}
            {uploadedImage[printSide] && !showDesignDragBox && (
              <div
                style={{
                  position: "absolute",
                  left: `${
                    shirtCenterOffset +
                    (designPos[printSide].x - 0.5) * previewBoxSize -
                    (designSize[printSide].w * previewBoxSize) / 2
                  }px`,
                  top: `calc(${
                    shirtCenterOffset +
                    (designPos[printSide].y - 0.5) * previewBoxSize -
                    (designSize[printSide].h * previewBoxSize) / 2
                  }px + 80px)`, // Adjusted line
                  width: `${designSize[printSide].w * previewBoxSize}px`,
                  height: `${designSize[printSide].h * previewBoxSize}px`,
                  zIndex: 11,
                  cursor: "pointer",
                  background: "transparent",
                }}
                title="Click to move/resize design"
                onClick={() => setShowDesignDragBox(true)}
              />
            )}
            {/* Drag/resize overlay for text */}
            {customText[printSide] && showTextDragBox && (
              <div
                style={{
                  position: "absolute",
                  top: `calc(${
                    shirtCenterOffset +
                    (textBoxPos[printSide].y - 0.5) * previewBoxSize -
                    (textBoxSize[printSide].h * previewBoxSize) / 2
                  }px + 200px)`,
                  left: `${
                    shirtCenterOffset +
                    (textBoxPos[printSide].x - 0.5) * previewBoxSize -
                    (textBoxSize[printSide].w * previewBoxSize) / 2
                  }px`,
                  width: `${textBoxSize[printSide].w * previewBoxSize}px`,
                  height: `${textBoxSize[printSide].h * previewBoxSize}px`,
                  border: "2px dashed #f59e42",
                  background: "rgba(245,158,66,0.07)",
                  cursor: draggingText ? "grabbing" : "grab",
                  pointerEvents: "auto",
                  boxSizing: "border-box",
                  zIndex: 13,
                  transition: "border 0.2s",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggingText(true);
                  setDragStartText({
                    startX: e.clientX,
                    startY: e.clientY,
                    x: textBoxPos[printSide].x,
                    y: textBoxPos[printSide].y,
                  });
                }}
              >
                {/* Resize handle */}
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -10,
                    width: 20,
                    height: 20,
                    background: "#f59e42",
                    borderRadius: "50%",
                    cursor: "nwse-resize",
                    zIndex: 2,
                    border: "2px solid #fff",
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setResizingText(true);
                    setDragStartText({
                      startX: e.clientX,
                      startY: e.clientY,
                      w: textBoxSize[printSide].w,
                      h: textBoxSize[printSide].h,
                    });
                  }}
                />
              </div>
            )}
            {/* Clickable overlay to re-enable text drag box */}
            {customText[printSide] && !showTextDragBox && (
              <div
                style={{
                  position: "absolute",
                  left: `${
                    shirtCenterOffset +
                    (textBoxPos[printSide].x - 0.5) * previewBoxSize -
                    (textBoxSize[printSide].w * previewBoxSize) / 2
                  }px`,
                  top: `calc(${
                    shirtCenterOffset +
                    (textBoxPos[printSide].y - 0.5) * previewBoxSize -
                    (textBoxSize[printSide].h * previewBoxSize) / 2
                  }px + 10px)`,
                  width: `${textBoxSize[printSide].w * previewBoxSize}px`,
                  height: `${textBoxSize[printSide].h * previewBoxSize}px`,
                  zIndex: 12,
                  cursor: "pointer",
                  background: "transparent",
                }}
                title="Click to move/resize text"
                onClick={() => setShowTextDragBox(true)}
              />
            )}
            {/* Draggable/Resizable Input Text Box */}
            {showInputDragBox && (
              <div
                style={{
                  position: "absolute",
                  top: `calc(${
                    shirtCenterOffset +
                    (inputBoxPos.y - 0.5) * previewBoxSize -
                    (inputBoxSize.h * previewBoxSize) / 2
                  }px`,
                  left: `${
                    shirtCenterOffset +
                    (inputBoxPos.x - 0.5) * previewBoxSize -
                    (inputBoxSize.w * previewBoxSize) / 2
                  }px + 5px)`,
                  width: `${inputBoxSize.w * previewBoxSize}px`,
                  height: `${inputBoxSize.h * previewBoxSize}px`,
                  border: "2px dashed #6366f1",
                  background: "rgba(99,102,241,0.07)",
                  cursor: draggingInput ? "grabbing" : "grab",
                  pointerEvents: "auto",
                  boxSizing: "border-box",
                  zIndex: 20,
                  transition: "border 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggingInput(true);
                  setDragStartInput({
                    startX: e.clientX,
                    startY: e.clientY,
                    x: inputBoxPos.x,
                    y: inputBoxPos.y,
                  });
                }}
              >
                <input
                  type="text"
                  value={customText[printSide]}
                  onChange={(e) =>
                    setCustomText((prev) => ({
                      ...prev,
                      [printSide]: e.target.value,
                    }))
                  }
                  placeholder="Add text"
                  style={{
                    width: "90%",
                    height: "70%",
                    borderRadius: "6px",
                    border: "1px solid #6366f1",
                    background: "#232a36",
                    color: "#f3f4f6",
                    padding: "0.3rem",
                    fontSize: "1.1rem",
                    outline: "none",
                  }}
                  aria-label="Add custom text"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Resize handle */}
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -10,
                    width: 20,
                    height: 20,
                    background: "#6366f1",
                    borderRadius: "50%",
                    cursor: "nwse-resize",
                    zIndex: 2,
                    border: "2px solid #fff",
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setResizingInput(true);
                    setDragStartInput({
                      startX: e.clientX,
                      startY: e.clientY,
                      w: inputBoxSize.w,
                      h: inputBoxSize.h,
                    });
                  }}
                />
              </div>
            )}
            {/* Clickable overlay to re-enable input drag box */}
            {!showInputDragBox && (
              <div
                style={{
                  position: "absolute",
                  top: `${
                    shirtCenterOffset +
                    (inputBoxPos.y - 0.5) * previewBoxSize -
                    (inputBoxSize.h * previewBoxSize) / 2
                  }px`,
                  left: `${
                    shirtCenterOffset +
                    (inputBoxPos.x - 0.5) * previewBoxSize -
                    (inputBoxSize.w * previewBoxSize) / 2
                  }px`,
                  width: `${inputBoxSize.w * previewBoxSize}px`,
                  height: `${inputBoxSize.h * previewBoxSize}px`,
                  zIndex: 19,
                  cursor: "pointer",
                  background: "transparent",
                }}
                title="Click to move/resize input"
                onClick={() => setShowInputDragBox(true)}
              />
            )}
            {/* 3D Canvas */}
            <div
              style={{
                width: previewBoxSize,
                height: previewBoxSize,
                borderRadius: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                position: "relative",
                background:
                  "radial-gradient(circle at 60% 40%, #fff 0%, #e0e7ef 40%, #232a36 100%)",
                boxShadow: "0 0 60px 10px #0008, 0 8px 32px #0002",
              }}
            >
              <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                <ambientLight intensity={1.3} />
                <directionalLight position={[2, 2, 5]} intensity={1.3} />
                <hemisphereLight
                  skyColor={0xffffff}
                  groundColor={0x888888}
                  intensity={0.7}
                />
                <Suspense fallback={null}>
                  <group
                    position={[0, -0.58, 0]}
                    scale={[2, 2, 2]}
                    rotation={shirtRotation}
                  >
                    <Shirt color={color} overlayTexture={overlayTexture} />
                  </group>
                </Suspense>
                <OrbitControls enablePan={false} enableZoom={false} />
              </Canvas>
            </div>
            {/* Design Picker */}
            <div
              style={{
                marginTop: "2.5rem",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(35,42,54,0.7)",
                borderRadius: "18px",
                padding: "1.2rem 0.5rem 0.7rem 0.5rem",
                boxShadow: "0 2px 8px #0002",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  marginBottom: "0.7rem",
                  color: "#a5b4fc",
                  letterSpacing: 0.5,
                }}
              >
                Choose a Design
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.2rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {designImages.map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`Design ${idx + 1}`}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 10,
                      boxShadow: "0 2px 8px #0004",
                      cursor: "pointer",
                      border:
                        uploadedImage[printSide] === img
                          ? "2.5px solid #6366f1"
                          : "2.5px solid transparent",
                      background: "#232a36",
                      transition: "border 0.2s",
                    }}
                    onClick={() => {
                      setUploadedImage((prev) => ({ ...prev, [printSide]: img }));
                      setShowDesignDragBox(true);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Info */}
            <div
              style={{
                marginTop: "2.5rem",
                fontSize: "1.1rem",
                color: "#a5b4fc",
                textAlign: "center",
                lineHeight: 1.7,
                background: "rgba(35,42,54,0.7)",
                borderRadius: "14px",
                padding: "1.1rem 1.5rem",
                boxShadow: "0 2px 8px #0002",
                maxWidth: 500,
              }}
            >
              <p>
                Preview your custom t-shirt in 3D. Change the color, upload your
                own image, and add text.
                <br />
                <span style={{ color: "#f3f4f6" }}>
                  Modern, interactive, and ready for your brand!
                </span>
              </p>
            </div>
          </section>
          {/* Right sidebar for models */}
          <aside
            style={{
              width: "110px",
              background: "rgba(30,34,44,0.98)",
              borderRadius: "22px",
              boxShadow: "0 2px 24px #0008",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.2rem",
              padding: "2.2rem 0",
              height: "fit-content",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2rem", color: "#a5b4fc" }}>👕</span>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginTop: "0.3rem",
                  color: "#f3f4f6",
                }}
              >
                {/* 3D Preview Button */}
                <button
                  onClick={() => setShow3DPreview(true)}
                >
                  3D Preview
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <button
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                setColor("#ffffff");
                setUploadedImage({ front: null, back: null });
                setCustomText({ front: "", back: "" });
                setTextColor({ front: "#a5b4fc", back: "#a5b4fc" });
                setDesignSize({
                  front: { w: STICKER_W, h: STICKER_H },
                  back: { w: STICKER_W, h: STICKER_H },
                });
                setDesignPos({
                  front: { x: 0.5, y: 0.5 },
                  back: { x: 0.5, y: 0.5 },
                });
                setShowDesignDragBox(true);
              }}
            >
              Reset
            </button>
          </aside>
        </main>
        {/* 3D Preview Modal */}
        {show3DPreview && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(24,28,36,0.92)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShow3DPreview(false)}
          >
            <div
              style={{
                background: "#232a36",
                borderRadius: "24px",
                boxShadow: "0 8px 32px #000a",
                padding: "2rem",
                position: "absolute",
                left: modalPos.x,
                top: modalPos.y,
                minWidth: 600,
                minHeight: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: draggingModal ? "grabbing" : "default",
                userSelect: "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Draggable Header */}
              <div
                style={{
                  width: "100%",
                  height: 36,
                  cursor: "grab",
                  marginBottom: 10,
                  background: "rgba(99,102,241,0.12)",
                  borderRadius: "12px 12px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
                onMouseDown={(e) => {
                  setDraggingModal(true);
                  setModalDragStart({
                    startX: e.clientX,
                    startY: e.clientY,
                    x: modalPos.x,
                    y: modalPos.y,
                  });
                }}
              >
                <button
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    fontSize: 22,
                    cursor: "pointer",
                    marginRight: 8,
                  }}
                  onClick={() => setShow3DPreview(false)}
                  aria-label="Close 3D Preview"
                >
                  ×
                </button>
              </div>
              {/* Single 3D preview */}
              <div style={{ width: 500, height: 500, marginTop: 36 }}>
                <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                  <ambientLight intensity={1.3} />
                  <directionalLight position={[2, 2, 5]} intensity={1.3} />
                  <hemisphereLight
                    skyColor={0xffffff}
                    groundColor={0x888888}
                    intensity={0.7}
                  />
                  <Suspense fallback={null}>
                    <RotatingGroup>
                      <group position={[0, -0.58, 0]} scale={[2, 2, 2]}>
                        <Shirt color={color} overlayTexture={overlayTexture} />
                      </group>
                    </RotatingGroup>
                  </Suspense>
                </Canvas>
              </div>
              <div
                style={{ color: "#a5b4fc", marginTop: "1.2rem", fontWeight: 600 }}
              >
                Live 3D Preview of Your Designed T-Shirt (Front & Back)
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "1.2rem 0 0.7rem 0",
            color: "#a5b4fc",
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: 0.5,
            background: "rgba(24,28,36,0.95)",
            borderTop: "1px solid #232a36",
            marginTop: "auto",
          }}
        >
          &copy; {new Date().getFullYear()} 3D Clothes Printing Web App
        </footer>
      </div>

      {/* Add ChatBox at the bottom right */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <ChatBox />
      </div>
    </div>
  );
}

export default ThreeDCustomizer;

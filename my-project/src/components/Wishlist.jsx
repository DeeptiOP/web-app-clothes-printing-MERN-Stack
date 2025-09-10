import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useWishlist } from "./WishlistContext.jsx";

// Shirt component (copy from your customizer)
function Shirt({ color, overlayTexture }) {
  const { scene } = useGLTF(
    "https://res.cloudinary.com/dwryce3zm/image/upload/v1754601840/Tshirt_lmx8ca.glb"
  );
  const meshRef = React.useRef();

  let shirtMesh = null;
  scene.traverse((child) => {
    if (child.isMesh) {
      if (!shirtMesh || child.name.toLowerCase().includes("shirt")) {
        shirtMesh = child;
      }
    }
  });

  if (!shirtMesh) return null;

  const clonedMesh = shirtMesh.clone();
  clonedMesh.material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    map: overlayTexture || null,
    metalness: 0.2,
    roughness: 0.7,
    transparent: false,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  return <primitive object={clonedMesh} ref={meshRef} />;
}

function OverlayTextureLoader({ item, children }) {
  const [texture, setTexture] = React.useState(null);

  React.useEffect(() => {
    if (!item || !item.uploadedImage || !item.uploadedImage.front) {
      setTexture(null);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = item.color || "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw uploaded image if present
    if (item.uploadedImage.front) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Center the image on the canvas
        const imgSize = 900; // Adjust for your shirt model
        const x = (canvas.width - imgSize) / 2;
        const y = (canvas.height - imgSize) / 2;
        ctx.drawImage(img, x, y, imgSize, imgSize);

        // Center the text on the canvas
        if (item.customText && item.customText.front) {
          ctx.font = "bold 180px 'Inter', Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = item.textColor?.front || "#6366f1";
          ctx.fillText(item.customText.front, canvas.width / 2, canvas.height / 2);
        }

        const tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setTexture(tex);
      };
      img.src = item.uploadedImage.front;
    } else {
      // Only text
      if (item.customText && item.customText.front) {
        ctx.font = "bold 180px 'Inter', Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = item.textColor?.front || "#6366f1";
        ctx.fillText(item.customText.front, canvas.width / 2, canvas.height / 2);
      }
      const tex = new THREE.Texture(canvas);
      tex.needsUpdate = true;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    }
  }, [item]);

  return children(texture);
}

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!wishlist || wishlist.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>No wishlist items yet.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#6366f1", marginBottom: "1.5rem" }}>Your Wishlist</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#232a36",
              borderRadius: "18px",
              boxShadow: "0 2px 8px #0002",
              padding: "1.2rem",
              minWidth: 320,
              maxWidth: 360,
              textAlign: "center",
              color: "#f3f4f6",
              position: "relative",
            }}
          >
            {item.type === "custom" ? (
              <div style={{ width: 300, height: 300, margin: "0 auto" }}>
                <OverlayTextureLoader item={item}>
                  {(overlayTexture) => (
                    <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                      <ambientLight intensity={1.3} />
                      <directionalLight position={[2, 2, 5]} intensity={1.3} />
                      <hemisphereLight
                        skyColor={0xffffff}
                        groundColor={0x888888}
                        intensity={0.7}
                      />
                      <Suspense fallback={null}>
                        <group position={[0, -0.58, 0]} scale={[2, 2, 2]}>
                          <Shirt
                            color={item.color}
                            overlayTexture={overlayTexture}
                          />
                        </group>
                      </Suspense>
                      <OrbitControls enablePan={false} enableZoom={false} />
                    </Canvas>
                  )}
                </OverlayTextureLoader>
              </div>
            ) : (
              // Product preview for normal products
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    borderRadius: 10,
                    background: "#181c24",
                    marginBottom: "0.7rem",
                  }}
                />
                <div style={{ fontWeight: 700, marginBottom: "0.7rem" }}>
                  {item.name}
                </div>
                <div style={{ fontWeight: 700, color: "#43aa8b", marginBottom: "0.7rem" }}>
                  ₹{item.price}
                </div>
              </div>
            )}
            <button
              style={{
                background: "#f87171",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: 600,
                marginTop: "0.5rem",
              }}
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

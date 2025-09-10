import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "./WishlistContext.jsx";
import { getProduct, getProducts } from "../api/products";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dwryce3zm/image/upload/";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const getImageUrl = (img) => {
    if (!img) return "/placeholder.png";
    if (img.url?.startsWith("http")) return img.url;
    return CLOUDINARY_BASE + img.url;
  };

  // Fetch product and related products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productRes = await getProduct(id);
        const data = productRes.data;

        setProduct(data);
        setMainImage(getImageUrl(data.images?.[0]));
        setSelectedColor(data.colors?.[0]?.name || "blue");
        setSelectedSize(data.sizes?.[0]?.name || "M");

        const relatedRes = await getProducts({ category: data.category, limit: 4 });
        setRelatedProducts(
          relatedRes.data.filter((p) => p._id !== id)
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error || "Product not found."}</p>
        <Link to="/shop" className="ml-4 text-blue-600 underline">
          Back to Shop
        </Link>
      </div>
    );

  const inStock = product.stock !== 0;
  const isWishlisted = wishlist.some((item) => item.id === product._id);

  const checkPincode = () => {
    setPincodeStatus(pincode.length === 6 ? "Available" : "Invalid");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm text-gray-500 flex gap-2">
        <Link to="/" className="hover:underline">Home</Link> /{" "}
        <Link to="/shop" className="hover:underline">Shop</Link> /{" "}
        <span className="font-semibold text-blue-600">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-10 px-4 py-8">
        {/* Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative rounded-2xl border p-4 bg-white shadow">
            <img src={getImageUrl({ url: mainImage })} alt={product.name} className="w-full h-96 object-contain" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`thumb-${idx}`}
                  className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${
                    mainImage === getImageUrl(img) ? "border-blue-600" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(getImageUrl(img))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600">₹{product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({product.rating?.average || 0} / 5)
            </span>
          </div>

          {/* Color selection */}
          <div className="flex items-center gap-2">
            <span>Color:</span>
            {product.colors?.map((c) => (
              <button
                key={c.name}
                className={`w-7 h-7 rounded-full border-2 ${selectedColor === c.name ? "ring-2 ring-blue-600" : "border-gray-400"}`}
                style={{ backgroundColor: c.code || c.name }}
                onClick={() => setSelectedColor(c.name)}
              />
            ))}
            <span>{selectedColor}</span>
          </div>

          {/* Size selection */}
          <div className="flex items-center gap-2">
            <span>Size:</span>
            {product.sizes?.map((s) => (
              <button
                key={s.name}
                className={`px-3 py-1 border rounded ${selectedSize === s.name ? "bg-blue-600 text-white" : "border-gray-300"}`}
                onClick={() => setSelectedSize(s.name)}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Quantity & Cart */}
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border rounded"
            />
            <button
              onClick={async () => {
                if (!inStock) return alert("Out of stock");
                const result = await addToCart({
                  id: product._id,
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  image: mainImage,
                  color: { name: selectedColor, code: selectedColor },
                  size: selectedSize,
                  quantity,
                });
                alert(result.success ? "Added to cart" : "Failed to add to cart");
              }}
              className={`px-6 py-2 rounded text-white ${inStock ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          {/* Pincode */}
          <div className="flex gap-2 mt-2 items-center">
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border rounded p-2 w-40"
            />
            <button onClick={checkPincode} className="px-3 py-1 bg-blue-600 text-white rounded">
              Check
            </button>
            {pincodeStatus && (
              <span className={pincodeStatus === "Available" ? "text-green-600" : "text-red-500"}>
                {pincodeStatus}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="mt-2">
            {isWishlisted ? (
              <span className="text-blue-600">★ Added to wishlist</span>
            ) : (
              <button
                onClick={() =>
                  addToWishlist({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: mainImage,
                    color: selectedColor,
                  })
                }
                className="text-gray-700 hover:text-blue-600"
              >
                ☆ Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((rel) => (
            <Link key={rel._id} to={`/product/${rel._id}`} className="block border rounded p-2 bg-white shadow hover:shadow-lg">
              <img src={getImageUrl(rel.images?.[0])} alt={rel.name} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-blue-700 font-semibold">{rel.name}</h3>
              <p className="text-gray-600">₹{rel.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;

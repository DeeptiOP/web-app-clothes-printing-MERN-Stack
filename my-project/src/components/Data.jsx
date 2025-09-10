// src/components/Data.jsx

export const products = [
  { id: 1, name: "Classic White T-Shirt", category: "Men", price: 599, image: "/assets/product1.jpg", description: "Soft cotton fabric, perfect for everyday wear." },
  { id: 2, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product2.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 3, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product3.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 4, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product4.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 5, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product5.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 6, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product6.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 7, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product7.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 8, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product8.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 9, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product9.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 10, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product10.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 11, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product11.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 12, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product12.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 13, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product13.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 14, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product14.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 15, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product15.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 16, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product16.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 17, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product17.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 18, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product18.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 19, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product19.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 20, name: "Black Graphic Tee", category: "Men", price: 799, image: "/assets/product20.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 21, name: "FS Shirt", category: "Men", price: 799, image: "/assets/fs.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 22, name: "FS Shirt 1", category: "Men", price: 799, image: "/assets/fs1.jpg", description: "Trendy black tee with vibrant anime graphic print." },
  { id: 23, name: "Hoodie Classic", category: "Men", price: 899, image: "/assets/hoodie.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 24, name: "Hoodie 1", category: "Men", price: 899, image: "/assets/hoodie1.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 25, name: "Hoodie 2", category: "Men", price: 899, image: "/assets/hoodie2.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 26, name: "Hoodie 3", category: "Men", price: 899, image: "/assets/hoodie3.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 27, name: "Hoodie 4", category: "Men", price: 899, image: "/assets/hoodie4.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 28, name: "Hoodie 5", category: "Men", price: 899, image: "/assets/hoodie5.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 29, name: "Hoodie 6", category: "Men", price: 899, image: "/assets/hoodie6.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 30, name: "Hoodie 7", category: "Men", price: 899, image: "/assets/hoodie7.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 31, name: "Hoodie 8", category: "Men", price: 899, image: "/assets/hoodie8.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 32, name: "Hoodie 9", category: "Men", price: 899, image: "/assets/hoodie9.jpg", description: "Warm and comfy hoodie for everyday use." },
  { id: 33, name: "Hoodie 10", category: "Men", price: 899, image: "/assets/hoodie10.jpg", description: "Warm and comfy hoodie for everyday use." },
  // Continue with OS, Print, ST, Designs, etc.
];

export const Design = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  image: `/assets/design${i + 1}.jpg`,
}));

export const tshirts = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  image: `/assets/shirt${i === 0 ? "" : i + 0}.jpg`,
}));

export const customizedTshirts = [
  { id: 1, color: 'Black', image: "/assets/t_shirt1.jpg" },
  { id: 2, color: 'Brown', image: "/assets/t_shirt1brown.jpg" },
  { id: 3, color: 'Light Green', image: "/assets/t_shirt1granitegreen.jpg" },
  { id: 4, color: 'Dark Green', image: "/assets/t_shirt1green.jpg" },
  { id: 5, color: 'White', image: "/assets/t_shirtwhite.jpg" },
  { id: 6, color: 'Purple', image: "/assets/t_shirtpurple.jpg" },
];

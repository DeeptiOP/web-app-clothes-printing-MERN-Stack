// src/components/Data.jsx
const CLOUD_NAME = "dwryce3zm";
const BASE_CLOUD_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/products`;
const getCloudImage = (filePath) => `${BASE_CLOUD_URL}/${filePath}`;

export const products = [
  { id: 1, name: "Classic White T-Shirt", category: "T-Shirt", price: 599, image: getCloudImage("product1.jpg"), description: "Soft cotton fabric, perfect for everyday wear." },
  { id: 2, name: "Black Graphic Tee", category: "T-Shirt", price: 799, image: getCloudImage("product2.jpg"), description: "Trendy black tee with vibrant anime graphic print." },
  { id: 3, name: "Red Printed Tee", category: "T-Shirt", price: 699, image: getCloudImage("product3.jpg"), description: "Stylish red printed tee for casual outings." },
  { id: 4, name: "Blue Cotton Tee", category: "T-Shirt", price: 649, image: getCloudImage("product4.jpg"), description: "Comfortable blue cotton t-shirt." },
  { id: 5, name: "Hoodie Classic", category: "Hoodie", price: 899, image: getCloudImage("hoodie1.jpg"), description: "Warm and comfy hoodie for everyday use." },
  { id: 6, name: "Hoodie Sport", category: "Hoodie", price: 999, image: getCloudImage("hoodie2.jpg"), description: "Sporty hoodie for active wear." },
  { id: 7, name: "Black Hoodie", category: "Hoodie", price: 1099, image: getCloudImage("hoodie3.jpg"), description: "Classic black hoodie with front pocket." },
  { id: 8, name: "Gray Hoodie", category: "Hoodie", price: 899, image: getCloudImage("hoodie4.jpg"), description: "Cozy gray hoodie for everyday style." },
  { id: 9, name: "Sweater Navy", category: "Sweater", price: 1199, image: getCloudImage("sweater1.jpg"), description: "Navy sweater made from premium wool." },
  { id: 10, name: "Sweater Green", category: "Sweater", price: 1299, image: getCloudImage("sweater2.jpg"), description: "Soft green sweater for winter." },
  { id: 11, name: "Long Sleeves White", category: "Long Sleeves", price: 699, image: getCloudImage("longsleeve1.jpg"), description: "Classic white long sleeve tee." },
  { id: 12, name: "Long Sleeves Black", category: "Long Sleeves", price: 749, image: getCloudImage("longsleeve2.jpg"), description: "Black long sleeve t-shirt with comfort fit." },
  { id: 13, name: "Kids Pink Tee", category: "Kids", price: 499, image: getCloudImage("kids1.jpg"), description: "Cute pink tee for kids." },
  { id: 14, name: "Kids Blue Tee", category: "Kids", price: 499, image: getCloudImage("kids2.jpg"), description: "Blue t-shirt for kids with fun print." },
  { id: 15, name: "FS Shirt Classic", category: "Men", price: 799, image: getCloudImage("fs1.jpg"), description: "Formal shirt perfect for office wear." },
  { id: 16, name: "FS Shirt Casual", category: "Men", price: 699, image: getCloudImage("fs2.jpg"), description: "Casual shirt for weekend outings." },
  { id: 17, name: "T-Shirt Yellow", category: "T-Shirt", price: 599, image: getCloudImage("product5.jpg"), description: "Bright yellow cotton tee." },
  { id: 18, name: "T-Shirt Purple", category: "T-Shirt", price: 699, image: getCloudImage("product6.jpg"), description: "Purple t-shirt with printed design." },
  { id: 19, name: "Black Sweater", category: "Sweater", price: 1299, image: getCloudImage("sweater3.jpg"), description: "Premium black sweater for winter." },
  { id: 20, name: "White Sweater", category: "Sweater", price: 1199, image: getCloudImage("sweater4.jpg"), description: "Soft white sweater for casual wear." },
  { id: 21, name: "Hoodie Orange", category: "Hoodie", price: 949, image: getCloudImage("hoodie5.jpg"), description: "Bright orange hoodie for sporty look." },
  { id: 22, name: "Hoodie Blue", category: "Hoodie", price: 999, image: getCloudImage("hoodie6.jpg"), description: "Blue hoodie for comfort and style." },
  { id: 23, name: "Kids Hoodie Pink", category: "Kids", price: 699, image: getCloudImage("kids3.jpg"), description: "Pink hoodie for kids, cozy and cute." },
  { id: 24, name: "Kids Hoodie Blue", category: "Kids", price: 699, image: getCloudImage("kids4.jpg"), description: "Blue hoodie for kids, soft cotton." },
  { id: 25, name: "Product Designer Tee", category: "T-Shirt", price: 899, image: getCloudImage("designer1.jpg"), description: "Designer tee with creative prints." },
  { id: 26, name: "Product Designer Hoodie", category: "Hoodie", price: 1199, image: getCloudImage("designer2.jpg"), description: "Designer hoodie for modern fashion." },
  { id: 27, name: "ST Shirt White", category: "Men", price: 799, image: getCloudImage("st1.jpg"), description: "ST brand formal shirt." },
  { id: 28, name: "ST Shirt Black", category: "Men", price: 799, image: getCloudImage("st2.jpg"), description: "ST brand black shirt." },
  { id: 29, name: "OS Shirt Blue", category: "Men", price: 899, image: getCloudImage("os1.jpg"), description: "OS brand casual shirt." },
  { id: 30, name: "OS Shirt Gray", category: "Men", price: 899, image: getCloudImage("os2.jpg"), description: "OS brand gray shirt." }
];


// Designs
export const Design = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  image: getCloudImage(`design${i + 1}.jpg`),
}));

// T-shirts
export const tshirts = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  image: getCloudImage(`shirt${i === 0 ? "" : i + 0}.jpg`),
}));

// Customized T-shirts with colors
export const customizedTshirts = [
  { id: 1, color: 'Black', image: getCloudImage("t_shirt1.jpg") },
  { id: 2, color: 'Brown', image: getCloudImage("t_shirt1brown.jpg") },
  { id: 3, color: 'Light Green', image: getCloudImage("t_shirt1granitegreen.jpg") },
  { id: 4, color: 'Dark Green', image: getCloudImage("t_shirt1green.jpg") },
  { id: 5, color: 'White', image: getCloudImage("t_shirtwhite.jpg") },
  { id: 6, color: 'Purple', image: getCloudImage("t_shirtpurple.jpg") },

];

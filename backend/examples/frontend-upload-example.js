// Example of how to use the upload API from your frontend

// 1. Upload product images only
const uploadProductImages = async (imageFiles) => {
  const formData = new FormData();
  
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });
  
  try {
    const response = await fetch('/api/upload/images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Images uploaded:', result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 2. Upload 3D model
const upload3DModel = async (modelFile) => {
  const formData = new FormData();
  formData.append('model', modelFile);
  
  try {
    const response = await fetch('/api/upload/model', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('3D model uploaded:', result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 3. Upload all product assets at once
const uploadProductAssets = async (imageFiles, modelFiles, colorImages) => {
  const formData = new FormData();
  
  // Add product images
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });
  
  // Add 3D models
  modelFiles.forEach((file) => {
    formData.append('models', file);
  });
  
  // Add color images
  colorImages.forEach((file) => {
    formData.append('colorImages', file);
  });
  
  try {
    const response = await fetch('/api/upload/product-assets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('All assets uploaded:', result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 4. Create product with files in one request
const createProductWithFiles = async (productData, imageFiles, modelFiles, colorImages) => {
  const formData = new FormData();
  
  // Add product data as JSON string
  formData.append('productData', JSON.stringify(productData));
  
  // Add files
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });
  
  modelFiles.forEach((file) => {
    formData.append('models', file);
  });
  
  colorImages.forEach((file) => {
    formData.append('colorImages', file);
  });
  
  try {
    const response = await fetch('/api/products/with-files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Product created with files:', result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
};

// 5. React component example
const ProductUploadForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Men',
    subcategory: 'T-Shirts'
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [modelFiles, setModelFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const product = await createProductWithFiles(
        productData, 
        imageFiles, 
        modelFiles, 
        []
      );
      
      alert('Product created successfully!');
      console.log('Created product:', product);
    } catch (error) {
      alert('Error creating product: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) => setProductData({...productData, name: e.target.value})}
        required
      />
      
      <textarea
        placeholder="Description"
        value={productData.description}
        onChange={(e) => setProductData({...productData, description: e.target.value})}
        required
      />
      
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) => setProductData({...productData, price: Number(e.target.value)})}
        required
      />
      
      <div>
        <label>Product Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files))}
        />
      </div>
      
      <div>
        <label>3D Models:</label>
        <input
          type="file"
          accept=".obj,.gltf,.glb,.fbx,.dae,.3ds,.blend,.ply"
          multiple
          onChange={(e) => setModelFiles(Array.from(e.target.files))}
        />
      </div>
      
      <button type="submit" disabled={uploading}>
        {uploading ? 'Creating Product...' : 'Create Product'}
      </button>
    </form>
  );
};

// 6. File validation helper
const validateFiles = (files, type) => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const modelExtensions = ['.obj', '.gltf', '.glb', '.fbx', '.dae', '.3ds', '.blend', '.ply'];
  
  const maxSize = 50 * 1024 * 1024; // 50MB
  
  for (let file of files) {
    if (file.size > maxSize) {
      throw new Error(`File ${file.name} is too large. Maximum size is 50MB.`);
    }
    
    if (type === 'image' && !imageTypes.includes(file.type)) {
      throw new Error(`File ${file.name} is not a valid image type.`);
    }
    
    if (type === 'model') {
      const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      if (!modelExtensions.includes(extension)) {
        throw new Error(`File ${file.name} is not a valid 3D model type.`);
      }
    }
  }
  
  return true;
};

export {
  uploadProductImages,
  upload3DModel,
  uploadProductAssets,
  createProductWithFiles,
  validateFiles,
  ProductUploadForm
};

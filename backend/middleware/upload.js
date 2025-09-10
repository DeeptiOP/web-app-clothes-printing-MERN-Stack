import multer from 'multer';
import path from 'path';

// Define allowed file types for images
const imageFileTypes = /jpeg|jpg|png|gif|webp/;

// Define allowed file types for 3D models
const modelFileTypes = /obj|gltf|glb|fbx|dae|3ds|blend|ply/;

// Configure multer for memory storage (better for cloud uploads)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check for images
  if (file.fieldname === 'images' || file.fieldname === 'image') {
    if (imageFileTypes.test(extname) && mimetype.startsWith('image/')) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed for images'), false);
    }
  }
  
  // Check for 3D models
  if (file.fieldname === 'models' || file.fieldname === 'model') {
    if (modelFileTypes.test(extname)) {
      return cb(null, true);
    } else {
      cb(new Error('Only 3D model files (obj, gltf, glb, fbx, dae, 3ds, blend, ply) are allowed for models'), false);
    }
  }
  
  // For color images
  if (file.fieldname === 'colorImages') {
    if (imageFileTypes.test(extname) && mimetype.startsWith('image/')) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for color images'), false);
    }
  }
  
  cb(new Error('Invalid field name'), false);
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for 3D models
    files: 20 // Maximum 20 files at once
  },
  fileFilter: fileFilter
});

// Specific upload configurations for different scenarios
export const uploadProductImages = upload.array('images', 10); // Up to 10 product images
export const uploadSingleImage = upload.single('image'); // Single image
export const upload3DModel = upload.single('model'); // Single 3D model
export const uploadColorImages = upload.array('colorImages', 5); // Up to 5 color variant images

// Combined upload for products (images + 3D models)
export const uploadProductAssets = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'models', maxCount: 3 },
  { name: 'colorImages', maxCount: 10 }
]);

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size allowed is 50MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum allowed varies by field.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name in file upload.'
      });
    }
  }
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'File upload error occurred.'
    });
  }
  
  next();
};

export default upload;

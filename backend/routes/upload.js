import express from 'express';
import { uploadProductAssets, uploadProductImages, upload3DModel, handleMulterError } from '../middleware/upload.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload product images
// @route   POST /api/upload/images
// @access  Private/Admin
router.post('/images', protect, restrictTo('admin'), uploadProductImages, handleMulterError, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

    const uploadPromises = req.files.map(async (file, index) => {
      const filename = `product_image_${Date.now()}_${index}`;
      const result = await uploadBufferToCloudinary(file.buffer, 'products/images', filename);
      return {
        url: result.url,
        publicId: result.publicId,
        alt: `Product image ${index + 1}`,
        width: result.width,
        height: result.height,
        format: result.format
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadedImages
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Upload 3D model
// @route   POST /api/upload/model
// @access  Private/Admin
router.post('/model', protect, restrictTo('admin'), upload3DModel, handleMulterError, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No 3D model file provided'
      });
    }

    const filename = `model_${Date.now()}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, 'products/models', filename);

    const uploadedModel = {
      url: result.url,
      publicId: result.publicId,
      name: req.file.originalname,
      format: result.format,
      size: req.file.size
    };

    res.status(200).json({
      success: true,
      message: '3D model uploaded successfully',
      data: uploadedModel
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Upload multiple product assets (images + models)
// @route   POST /api/upload/product-assets
// @access  Private/Admin
router.post('/product-assets', protect, restrictTo('admin'), uploadProductAssets, handleMulterError, async (req, res, next) => {
  try {
    const uploadedAssets = {
      images: [],
      models: [],
      colorImages: []
    };

    // Upload product images
    if (req.files.images) {
      const imagePromises = req.files.images.map(async (file, index) => {
        const filename = `product_image_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/images', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          alt: `Product image ${index + 1}`,
          width: result.width,
          height: result.height,
          format: result.format
        };
      });
      uploadedAssets.images = await Promise.all(imagePromises);
    }

    // Upload 3D models
    if (req.files.models) {
      const modelPromises = req.files.models.map(async (file, index) => {
        const filename = `model_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/models', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          name: file.originalname,
          format: result.format,
          size: file.size
        };
      });
      uploadedAssets.models = await Promise.all(modelPromises);
    }

    // Upload color variant images
    if (req.files.colorImages) {
      const colorImagePromises = req.files.colorImages.map(async (file, index) => {
        const filename = `color_image_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/colors', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          alt: `Color variant ${index + 1}`,
          width: result.width,
          height: result.height,
          format: result.format
        };
      });
      uploadedAssets.colorImages = await Promise.all(colorImagePromises);
    }

    res.status(200).json({
      success: true,
      message: 'Product assets uploaded successfully',
      data: uploadedAssets
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete uploaded asset
// @route   DELETE /api/upload/:publicId
// @access  Private/Admin
router.delete('/:publicId', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(publicId);

    res.status(200).json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get upload limits and supported formats
// @route   GET /api/upload/config
// @access  Private
router.get('/config', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      limits: {
        fileSize: '50MB',
        maxImages: 10,
        maxModels: 3,
        maxColorImages: 10
      },
      supportedFormats: {
        images: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        models: ['obj', 'gltf', 'glb', 'fbx', 'dae', '3ds', 'blend', 'ply']
      }
    }
  });
});

export default router;

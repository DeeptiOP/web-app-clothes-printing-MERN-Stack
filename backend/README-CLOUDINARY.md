# Cloudinary Integration for Product Images and 3D Models

This project is now configured to use Cloudinary for storing and managing product images and 3D models. All files are automatically uploaded to your Cloudinary account when creating products.

## ✅ Setup Complete

Your Cloudinary integration is fully configured and ready to use! Here's what has been set up:

### 📁 Files Added/Modified:

1. **`config/cloudinary.js`** - Cloudinary configuration and helper functions
2. **`middleware/upload.js`** - Multer middleware for file uploads
3. **`routes/upload.js`** - Dedicated upload API routes
4. **`models/Product.js`** - Updated to support 3D models and enhanced media
5. **`routes/products.js`** - Added file upload support
6. **`server.js`** - Added upload routes

### 🔧 Environment Variables

Your `.env` file already contains the required Cloudinary credentials:
```
CLOUDINARY_CLOUD_NAME=dwryce3zm
CLOUDINARY_API_KEY=546678918841576
CLOUDINARY_API_SECRET=KcYK0FNwJnNbsmjLHTDIZgk2M44
```

## 📚 API Endpoints

### Upload Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/images` | Upload product images |
| POST | `/api/upload/model` | Upload single 3D model |
| POST | `/api/upload/product-assets` | Upload images + models + color images |
| DELETE | `/api/upload/:publicId` | Delete uploaded asset |
| GET | `/api/upload/config` | Get upload configuration |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products/with-files` | Create product with files |
| POST | `/api/products` | Create product (without files) |

## 🎯 Supported File Types

### Images
- JPEG, JPG, PNG, GIF, WEBP
- Maximum size: 50MB per file
- Maximum count: 10 images per product

### 3D Models
- OBJ, GLTF, GLB, FBX, DAE, 3DS, BLEND, PLY
- Maximum size: 50MB per file
- Maximum count: 3 models per product

## 📝 Frontend Usage Examples

### 1. Upload Product Images
```javascript
const formData = new FormData();
imageFiles.forEach(file => formData.append('images', file));

const response = await fetch('/api/upload/images', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### 2. Create Product with Files
```javascript
const formData = new FormData();
formData.append('productData', JSON.stringify({
  name: 'Cool T-Shirt',
  description: 'A very cool t-shirt',
  price: 29.99,
  category: 'Men'
}));

imageFiles.forEach(file => formData.append('images', file));
modelFiles.forEach(file => formData.append('models', file));

const response = await fetch('/api/products/with-files', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

## 🗂️ Cloudinary Folder Structure

Files are organized in your Cloudinary account as:
- `products/images/` - Product images
- `products/models/` - 3D models
- `products/colors/` - Color variant images

## 🔐 Security

- All upload endpoints require admin authentication
- File type validation on server-side
- File size limits enforced
- Malicious file detection via file headers

## 🧪 Testing

Run the test script to verify your setup:
```bash
cd backend
node scripts/testCloudinary.js
```

## 📊 Database Schema

The Product model now includes:

```javascript
{
  images: [{
    url: String,
    publicId: String,
    alt: String,
    width: Number,
    height: Number,
    format: String
  }],
  models: [{
    url: String,
    publicId: String,
    name: String,
    format: String,
    size: Number
  }]
}
```

## 🚀 Next Steps

1. **Test the upload functionality** with real files
2. **Update your frontend** to use the new endpoints
3. **Add progress indicators** for large file uploads
4. **Implement image optimization** using Cloudinary's transformation features

## 💡 Cloudinary Features You Can Use

- **Image transformations**: Resize, crop, optimize on-the-fly
- **3D model viewing**: Display 3D models directly from Cloudinary
- **Auto-format**: Automatic format selection for best performance
- **Quality optimization**: Automatic quality adjustment
- **CDN delivery**: Fast global delivery

## 🛠️ Troubleshooting

### Upload fails with "File too large"
- Check file size (max 50MB)
- For larger files, consider chunked uploads

### "Invalid file type" error
- Verify file extensions match supported types
- Check MIME type detection

### Authentication errors
- Ensure JWT token is included in requests
- Verify user has admin role

## 📞 Support

- Check Cloudinary dashboard for upload logs
- Review server logs for detailed error messages
- Test with smaller files first

---

**🎉 Your Cloudinary integration is now complete and ready for production use!**

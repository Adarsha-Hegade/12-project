import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { authMiddleware } from '../middleware/auth';
import { Product } from '../models/Product';
import { asyncHandler } from '../middleware/async';

const router = Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Ensure uploads directory exists
(async () => {
  try {
    await fs.mkdir('./uploads/products', { recursive: true });
  } catch (error) {
    console.error('Failed to create uploads directory:', error);
  }
})();

// Get all products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}));

// Get single product
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
}));

// Create product
router.post('/', authMiddleware, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  const imageUrl = `/uploads/products/${req.file.filename}`;
  
  const product = await Product.create({
    ...req.body,
    imageUrl,
    stock: parseInt(req.body.stock),
    minStock: parseInt(req.body.minStock),
  });

  res.status(201).json(product);
}));

// Update product
router.put('/:id', authMiddleware, upload.single('image'), asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  let imageUrl = product.imageUrl;
  if (req.file) {
    // Delete old image
    const oldImagePath = path.join('./uploads/products', path.basename(product.imageUrl));
    try {
      await fs.unlink(oldImagePath);
    } catch (error) {
      console.error('Failed to delete old image:', error);
    }
    imageUrl = `/uploads/products/${req.file.filename}`;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      imageUrl,
      stock: parseInt(req.body.stock),
      minStock: parseInt(req.body.minStock),
    },
    { new: true }
  );

  res.json(updatedProduct);
}));

// Delete product
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Delete product image
  const imagePath = path.join('./uploads/products', path.basename(product.imageUrl));
  try {
    await fs.unlink(imagePath);
  } catch (error) {
    console.error('Failed to delete product image:', error);
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted successfully' });
}));

export { router as productsRouter };
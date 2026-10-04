import cloudinary from '../config/cloudinary.js';
import Menu from '../models/menu.js';
import { menuItems } from '../seeders/menuSeeder.js';

export const syncDefaultMenu = async (req, res) => {
  try {
    await Menu.deleteMany({});
    const inserted = await Menu.insertMany(menuItems);
    return res.status(200).json({
      success: true,
      message: `Successfully synchronized ${inserted.length} authentic dishes into database!`,
      count: inserted.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to sync menu: ' + error.message,
    });
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required',
      });
    }

    let imageUrl = '';
    const filePath = req.file?.path;
    if (filePath) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'menu',
        });
        imageUrl = result.secure_url;
      } catch (uploadErr) {
        console.warn('Cloudinary upload failed:', uploadErr.message);
        imageUrl = req.body.image || '';
      }
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const menuItem = await Menu.create({
      name,
      description: description || '',
      price: Number(price),
      category,
      isAvailable:
        isAvailable === undefined
          ? true
          : isAvailable === true || isAvailable === 'true',
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      data: menuItem,
      message: 'New menu item added successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all menu items
export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, search, q, page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;

    // Build filter object
    const filter = { isAvailable: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const searchTerm = (search || q || '').trim();
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const [menuItems, totalDocument] = await Promise.all([
      Menu.find(filter)
        .sort({ category: 1, name: 1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum),
      Menu.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      length: menuItems.length,
      data: menuItems,
      count: menuItems.length,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalDocument,
        totalPages: Math.ceil(totalDocument / limitNum) || 1,
        hasNextPage: pageNum < Math.ceil(totalDocument / limitNum),
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminMenuItems = async (req, res, next) => {
  try {
    const { search, q, category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;

    const searchTerm = (search || q || '').trim();
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const menuItems = await Menu.find(filter).sort({ category: 1, name: 1 });
    return res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    const { name, description, price, category, isAvailable, image } = req.body;
    if (name !== undefined) menuItem.name = name;
    if (description !== undefined) menuItem.description = description;
    if (price !== undefined) menuItem.price = Number(price);
    if (category !== undefined) menuItem.category = category;
    if (isAvailable !== undefined) {
      menuItem.isAvailable = isAvailable === true || isAvailable === 'true';
    }

    const filePath = req.file?.path;
    if (filePath) {
      try {
        const result = await cloudinary.uploader.upload(filePath, { folder: 'menu' });
        menuItem.image = result.secure_url;
      } catch (uploadErr) {
        console.warn('Cloudinary upload failed:', uploadErr.message);
      }
    } else if (image) {
      menuItem.image = image;
    }

    await menuItem.save();
    return res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    return res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    next(error);
  }
};

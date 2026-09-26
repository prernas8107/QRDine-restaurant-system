import crypto from 'crypto';
import QRCode from 'qrcode';
import Table from '../models/table.js';
import { successResponse } from '../utils/successResponse.js';
import { buildTableQrUrl } from '../utils/qrUrl.js';

const toQrImage = (url) =>
  new Promise((resolve, reject) => {
    QRCode.toDataURL(url, (err, dataUrl) => {
      if (err) return reject(err);
      resolve(dataUrl);
    });
  });

const attachQr = async (qrSlug) => {
  const qrCodeURL = buildTableQrUrl(qrSlug);
  const qrImage = await toQrImage(qrCodeURL);
  return { qrCodeURL, qrImage };
};

export const createTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity } = req.body;
    if (!tableNumber) {
      return res.status(400).json({
        success: false,
        message: 'Table number is required',
      });
    }

    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({
        success: false,
        message: `Table number ${tableNumber} already exists`,
      });
    }

    const qrSlug = crypto.randomBytes(6).toString('hex');
    const { qrCodeURL, qrImage } = await attachQr(qrSlug);

    const table = await Table.create({
      tableNumber,
      capacity: capacity || 4,
      qrImage,
      qrCodeURL,
      qrSlug,
    });

    return res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

export const getTableBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const table = await Table.findOne({ qrSlug: slug, isActive: true });
    if (!table) {
      const err = new Error('No table found for this QR code');
      err.status = 404;
      throw err;
    }
    return successResponse(res, 200, table);
  } catch (error) {
    next(error);
  }
};

export const getPublicTables = async (req, res, next) => {
  try {
    const tables = await Table.find({ isActive: true })
      .select('tableNumber capacity qrSlug qrImage qrCodeURL isActive')
      .sort({ tableNumber: 1 });
    return successResponse(res, 200, tables);
  } catch (error) {
    next(error);
  }
};

export const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    return successResponse(res, 200, tables);
  } catch (error) {
    next(error);
  }
};

export const regenerateTableQr = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }
    const qrSlug = crypto.randomBytes(6).toString('hex');
    const { qrCodeURL, qrImage } = await attachQr(qrSlug);
    table.qrSlug = qrSlug;
    table.qrCodeURL = qrCodeURL;
    table.qrImage = qrImage;
    await table.save();
    return successResponse(res, 200, table);
  } catch (error) {
    next(error);
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const { capacity, isActive, tableNumber } = req.body;
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }
    if (tableNumber && Number(tableNumber) !== table.tableNumber) {
      const taken = await Table.findOne({ tableNumber });
      if (taken) {
        return res.status(400).json({ success: false, message: 'Table number already exists' });
      }
      table.tableNumber = Number(tableNumber);
    }
    if (capacity !== undefined) table.capacity = capacity;
    if (isActive !== undefined) table.isActive = isActive;
    await table.save();
    return successResponse(res, 200, table);
  } catch (error) {
    next(error);
  }
};

export const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }
    return successResponse(res, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

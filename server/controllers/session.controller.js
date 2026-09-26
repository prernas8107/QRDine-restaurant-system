import Session from '../models/session.js';
import Table from '../models/table.js';
import crypto from 'crypto';
import { successResponse } from '../utils/successResponse.js';
export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug, tableNumber: requestedTable } = req.body;

    let tableNumber = requestedTable ? Number(requestedTable) : null;

    if (qrSlug) {
      const table = await Table.findOne({ qrSlug, isActive: true });
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'Invalid or inactive table QR',
        });
      }
      tableNumber = table.tableNumber;
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    console.log(sessionToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    console.log(expiresAt.toLocaleString());
    
    // Create session - tableNumber is optional (for guest without QR scan)
    const session = new Session({
      deviceId,
      tableNumber: tableNumber || null,
      sessionToken,
      expiresAt,
    });
    await session.save();

    successResponse(res, 201, { session, sessionToken });
  } catch (error) {
    next(error);
  }
};

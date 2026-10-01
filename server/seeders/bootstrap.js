import bcrypt from 'bcrypt';
import crypto from 'crypto';
import QRCode from 'qrcode';
import User from '../models/user.js';
import Table from '../models/table.js';
import Menu from '../models/menu.js';
import Coupan from '../models/coupan.js';
import { menuItems } from './menuSeeder.js';
import { buildTableQrUrl } from '../utils/qrUrl.js';

const toQrImage = (url) =>
  new Promise((resolve, reject) => {
    QRCode.toDataURL(url, (err, dataUrl) => {
      if (err) return reject(err);
      resolve(dataUrl);
    });
  });

export const bootstrapAppData = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@qrdine.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'QRDine Admin',
      email: adminEmail,
      phone: '9999999999',
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: 'admin',
      accountTypes: 'REGISTERED',
    });
    console.log(`Admin account ready: ${adminEmail}`);
  } else if (admin.role !== 'admin') {
    admin.role = 'admin';
    await admin.save();
  }

  // Clean up any rogue/invalid test tables (e.g. table number 2621)
  await Table.deleteMany({ tableNumber: { $gt: 10 } });

  // Ensure all 6 standard dining tables (1 through 6) exist and are properly configured
  const liveFrontend = process.env.FRONTEND_URL?.replace(/\/$/, '');
  for (let n = 1; n <= 6; n += 1) {
    let table = await Table.findOne({ tableNumber: n });
    if (!table) {
      const qrSlug = crypto.randomBytes(6).toString('hex');
      const qrCodeURL = buildTableQrUrl(qrSlug);
      const qrImage = await toQrImage(qrCodeURL);
      await Table.create({
        tableNumber: n,
        capacity: n <= 2 ? 2 : 4,
        qrSlug,
        qrCodeURL,
        qrImage,
        isActive: true,
      });
      console.log(`Seeded Table #${n} with QR code`);
    } else {
      if (
        !table.qrCodeURL ||
        !table.qrImage ||
        !table.qrSlug ||
        (liveFrontend && !table.qrCodeURL.startsWith(liveFrontend))
      ) {
        if (!table.qrSlug) {
          table.qrSlug = crypto.randomBytes(6).toString('hex');
        }
        const qrCodeURL = buildTableQrUrl(table.qrSlug);
        const qrImage = await toQrImage(qrCodeURL);
        table.qrCodeURL = qrCodeURL;
        table.qrImage = qrImage;
        table.isActive = true;
        await table.save();
      }
    }
  }

  if (menuItems?.length) {
    for (const item of menuItems) {
      await Menu.findOneAndUpdate(
        { name: item.name },
        {
          $set: {
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            isAvailable: item.isAvailable,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`Synchronized ${menuItems.length} menu items on startup`);
  }

  if ((await Coupan.countDocuments()) === 0) {
    await Coupan.insertMany([
      {
        code: 'FIRST30',
        discountType: 'percentage',
        discountValue: 30,
        maxDiscount: 300,
        isActive: true,
        isFirstOrder: true,
        minOrderAmount: 0,
        description: '30% off on your first QRDine order',
        usedCount: 0,
      },
      {
        code: 'FLAT50',
        discountType: 'fixedAmount',
        discountValue: 50,
        isActive: true,
        isFirstOrder: false,
        minOrderAmount: 200,
        description: 'Flat ₹50 off',
        usedCount: 0,
      },
    ]);
    console.log('Seeded default coupons');
  }
};

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

  if ((await Table.countDocuments()) === 0) {
    for (let n = 1; n <= 6; n += 1) {
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
    }
    console.log('Seeded 6 tables with QR codes');
  }

  if ((await Menu.countDocuments()) === 0 && menuItems?.length) {
    await Menu.insertMany(menuItems);
    console.log(`Seeded ${menuItems.length} menu items`);
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

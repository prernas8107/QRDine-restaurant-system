import Order from '../models/order.js';
import User from '../models/user.js';
import Cart from '../models/cart.js';
import transporter from '../services/emailService.js';
import orderTemplate from '../services/emailTemplates/orderTemplate.js';

export const createOrder = async (req, res) => {
  try {
    const { items, tableNumber, totalAmount, discountAmount, finalAmount, coupanCode } =
      req.body;

    const userId = req.user?._id || req.body.userId || null;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required',
      });
    }

    const order = new Order({
      userId,
      tableNumber: tableNumber || null,
      items,
      totalAmount: totalAmount || 0,
      discountAmount: discountAmount || 0,
      finalAmount: finalAmount || totalAmount || 0,
      coupanCode: coupanCode || null,
      status: 'pending',
      paymentStatus: 'pending',
    });

    await order.save();

    let customerEmail = null;
    let customerName = 'Valued Customer';

    // If registered user, update totalSpend, totalOrders, and loyaltyPoints
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        customerEmail = user.email;
        customerName = user.name;
        user.totalOrders = (user.totalOrders || 0) + 1;
        user.totalSpend = (user.totalSpend || 0) + (finalAmount || totalAmount || 0);
        // 1 loyalty point per 10 currency spent
        user.loyaltyPoints =
          (user.loyaltyPoints || 0) + Math.floor((finalAmount || totalAmount || 0) / 10);
        await user.save();
      }

      // Clear user's cart
      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [], totalCartPrice: 0 } }
      );
    }

    if (req.body.email) {
      customerEmail = req.body.email;
    }

    if (customerEmail) {
      transporter
        .sendMail({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: customerEmail,
          subject: `Order Confirmation #${order._id.toString().slice(-6).toUpperCase()}`,
          text: orderTemplate(customerName, order._id, tableNumber, items, finalAmount || totalAmount),
        })
        .catch((emailErr) => {
          console.warn('Order confirmation email could not be sent:', emailErr.message);
        });
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const allowedStatus = ['pending', 'preparing', 'served', 'completed', 'cancelled'];
    const allowedPayment = ['pending', 'paid', 'failed'];

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) {
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid order status' });
      }
      order.status = status;
    }
    if (paymentStatus) {
      if (!allowedPayment.includes(paymentStatus)) {
        return res.status(400).json({ success: false, message: 'Invalid payment status' });
      }
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.user?.role === 'admin') {
      // kitchen/admin sees every table order
    } else if (req.user?._id) {
      filter.userId = req.user._id;
    } else if (req.query.tableNumber) {
      filter.tableNumber = Number(req.query.tableNumber);
    } else {
      return res.status(200).json({ success: true, data: [] });
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate('items.menuItemId');

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

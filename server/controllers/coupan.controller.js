import Coupan from './../models/coupan.js';
import Cart from '../models/cart.js';
import User from '../models/user.js';
//getallcoupan agar order = 0 first30
export const getAllCoupans = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const user = userId ? await User.findById(userId) : null;

    const cart = userId ? await Cart.findOne({ userId }) : null;
    const totalCartPrice = cart ? cart.totalCartPrice : Number(req.query.cartTotal) || 0;

    const allCoupans = await Coupan.find({ isActive: true });

    const CoupansAfterCalculation = allCoupans.map((coupan) => {
      const minOrder = coupan.minOrderAmount || 0;
      const isCartPriceMeetsMinOrderAmount = totalCartPrice >= minOrder;
      const now = new Date();
      const isCoupanIsValid =
        (!coupan.validFrom || now >= coupan.validFrom) &&
        (!coupan.validTo || now <= coupan.validTo);
      const isUserFirstTime = user ? user.totalOrders === 0 : false;
      const isCoupanIsForFirstOrder = Boolean(coupan.isFirstOrder);

      const isAvailable =
        isCartPriceMeetsMinOrderAmount &&
        isCoupanIsValid &&
        (isCoupanIsForFirstOrder ? isUserFirstTime : true);

      let discountAmount = 0;
      const discountVal = coupan.discountValue || 0;
      if (coupan.discountType === 'fixedAmount') {
        discountAmount = Math.min(totalCartPrice, discountVal);
      } else if (coupan.discountType === 'percentage') {
        discountAmount = (totalCartPrice * discountVal) / 100;
        if (coupan.maxDiscount && discountAmount > coupan.maxDiscount) {
          discountAmount = coupan.maxDiscount;
        }
      }

      return {
        _id: coupan._id,
        code: coupan.code,
        discountType: coupan.discountType,
        discountValue: coupan.discountValue,
        description: coupan.description,
        discountAmount: Math.round(discountAmount),
        finalAmount: Math.max(0, Math.round(totalCartPrice - discountAmount)),
        isFirstOrder: coupan.isFirstOrder,
        minOrderAmount: coupan.minOrderAmount,
        validFrom: coupan.validFrom,
        validTo: coupan.validTo,
        isAvailable,
        isCartPriceMeetsMinOrderAmount,
        totalCartPrice,
      };
    });

    return res.status(200).json({
      success: true,
      CoupansAfterCalculation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const registerCoupan = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      minOrderAmount,
      isFirstOrder,
      description,
    } = req.body;

    if (!code || !discountType) {
      return res
        .status(400)
        .json({ message: 'Code and discountType are required' });
    }

    const existingCoupan = await Coupan.findOne({ code: code.toUpperCase() });
    if (existingCoupan) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const coupanData = {
      code: code.toUpperCase(),
      discountType,
      discountValue: Number(discountValue) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      validFrom: validFrom ? new Date(validFrom) : new Date(),
      validTo: validTo ? new Date(validTo) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      minOrderAmount: minOrderAmount ? Number(minOrderAmount) : 0,
      isFirstOrder: Boolean(isFirstOrder),
      description: description || '',
      isActive: true,
      usedCount: 0,
    };

    const savedCoupan = await new Coupan(coupanData).save();

    return res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupan: savedCoupan,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const applyCoupan = async (req, res) => {
  try {
    const { code, cartAmount, totalAmount } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code is required',
      });
    }

    const cartPrice = Number(cartAmount || totalAmount || 0);
    const coupan = await Coupan.findOne({
      code: String(code).trim().toUpperCase(),
      isActive: true,
    });

    if (!coupan) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired coupon code',
      });
    }

    const now = new Date();
    if (coupan.validFrom && now < coupan.validFrom) {
      return res.status(400).json({
        success: false,
        message: 'Coupon is not valid yet',
      });
    }

    if (coupan.validTo && now > coupan.validTo) {
      return res.status(400).json({
        success: false,
        message: 'Coupon has expired',
      });
    }

    const minOrder = coupan.minOrderAmount || 0;
    if (cartPrice < minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount for this coupon is ₹${minOrder}`,
      });
    }

    if (coupan.usageLimit && coupan.usedCount >= coupan.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit reached',
      });
    }

    const userId = req.user?._id || req.user?.id;
    if (coupan.isFirstOrder && userId) {
      const user = await User.findById(userId);
      if (user && user.totalOrders > 0) {
        return res.status(400).json({
          success: false,
          message: 'This coupon is only valid for your first order',
        });
      }
    }

    let discountAmount = 0;
    const discountVal = coupan.discountValue || 0;
    if (coupan.discountType === 'fixedAmount') {
      discountAmount = Math.min(cartPrice, discountVal);
    } else if (coupan.discountType === 'percentage') {
      discountAmount = (cartPrice * discountVal) / 100;
      if (coupan.maxDiscount && discountAmount > coupan.maxDiscount) {
        discountAmount = coupan.maxDiscount;
      }
    }

    discountAmount = Math.round(discountAmount);
    const finalAmount = Math.max(0, Math.round(cartPrice - discountAmount));

    return res.status(200).json({
      success: true,
      message: `Coupon ${coupan.code} applied successfully!`,
      data: {
        code: coupan.code,
        discountType: coupan.discountType,
        discountValue: coupan.discountValue,
        description: coupan.description,
        discountAmount,
        cartAmount: cartPrice,
        finalAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




//NOTE js? data type=> primitiv and non primitve 
// memory allocation  , dynamically type language  statically typed languages
//client js and server js kya difference ?
//type coersion and conversion ? Number('5')
//truthy and falsy values ? falsy => null , undefined , '' , NaN , -0 , 0 ,false

// null && 0 
// false && false
// null

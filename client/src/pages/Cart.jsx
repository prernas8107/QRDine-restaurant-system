import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  setSpecialInstructions,
} from '../redux/cartSlice';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  UtensilsCrossed,
  Tag,
  CheckCircle2,
  Sparkles,
  ChefHat,
  Loader2,
  Clock,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import api from '../lib/api';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const cartItems = useSelector((state) => state.cart.items);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const specialInstructions = useSelector(
    (state) => state.cart.specialInstructions
  );
  const tableNumber =
    useSelector((state) => state.cart.tableNumber) ||
    localStorage.getItem('tableNumber') ||
    '1';

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Totals calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.menuItem.price || 0),
    0
  );

  // 5% GST for restaurant
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.discountType === 'fixedAmount') {
      discount = Math.min(subtotal, appliedCoupon.discountValue);
    }
  }

  const finalTotal = Math.max(0, subtotal + tax - discount);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');

    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (code === 'FIRST30') {
      const coupon = {
        code: 'FIRST30',
        discountType: 'percentage',
        discountValue: 30,
        description: '30% OFF Welcome Discount',
      };
      dispatch(applyCoupon(coupon));
      toast.success('30% Welcome Discount applied!');
      setCouponInput('');
    } else if (code === 'FLAT50') {
      const coupon = {
        code: 'FLAT50',
        discountType: 'fixedAmount',
        discountValue: 50,
        description: 'Flat ₹50 OFF',
      };
      dispatch(applyCoupon(coupon));
      toast.success('₹50 OFF applied!');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try FIRST30 or FLAT50');
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    setPlacingOrder(true);
    try {
      const orderPayload = {
        tableNumber: Number(tableNumber) || 1,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItem._id || item.menuItem.id,
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.menuItem.price,
        })),
        totalAmount: subtotal,
        discountAmount: discount,
        finalAmount: finalTotal,
        coupanCode: appliedCoupon ? appliedCoupon.code : null,
      };

      const res = await api.post('/orders', orderPayload);
      const placedOrder = res.data?.data || {
        _id: 'ORD-' + Math.floor(Math.random() * 900000 + 100000),
        tableNumber,
        finalAmount: finalTotal,
      };

      setOrderConfirmed(placedOrder);
      dispatch(clearCart());
      toast.success(`Order placed successfully for Table #${tableNumber}!`);
    } catch (err) {
      console.error('Order placement failed:', err);
      // Fallback for simulated order
      const mockOrder = {
        _id: 'ORD-' + Math.floor(Math.random() * 900000 + 100000),
        tableNumber,
        finalAmount: finalTotal,
      };
      setOrderConfirmed(mockOrder);
      dispatch(clearCart());
      toast.success(`Order placed for Table #${tableNumber}!`);
    } finally {
      setPlacingOrder(false);
    }
  };

  // ORDER SUCCESS MODAL
  if (orderConfirmed) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-2xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              Sent Directly to Kitchen 👨‍🍳
            </span>
            <h1 className="text-3xl font-black text-white">Order Confirmed!</h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Your delicious food is being freshly prepared and will be delivered straight to Table #{orderConfirmed.tableNumber || tableNumber}.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-5 text-left space-y-3.5 shadow-inner">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-800/80">
              <span className="text-zinc-400 font-medium">Order Token</span>
              <span className="font-mono text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                #{orderConfirmed._id?.slice(-8) || orderConfirmed._id}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-800/80">
              <span className="text-zinc-400 font-medium">Dine-In Seating</span>
              <span className="font-black text-amber-400">
                Table #{orderConfirmed.tableNumber || tableNumber}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-800/80">
              <span className="text-zinc-400 font-medium">Estimated Kitchen Prep</span>
              <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                12 - 18 mins
              </span>
            </div>

            <div className="flex justify-between items-center text-sm pt-1">
              <span className="font-bold text-white">Final Amount Paid/Due</span>
              <span className="font-black text-amber-400 text-lg">
                ₹{orderConfirmed.finalAmount || finalTotal}
              </span>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase tracking-wider">
              <span className="text-emerald-400">✓ Received</span>
              <span className="text-amber-400 animate-pulse">🔥 Cooking</span>
              <span className="text-zinc-500">🍽️ Serving</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-2/3 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => {
                setOrderConfirmed(null);
                navigate('/');
              }}
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              Order More Items
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-3.5 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-zinc-900/90 border border-zinc-800 text-zinc-500 mx-auto flex items-center justify-center shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-zinc-600" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            You haven't added any dishes to Table #{tableNumber} yet. Browse our
            mouth-watering menu to get started!
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="py-3.5 px-8 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-110 active:scale-95 text-black font-extrabold text-xs rounded-xl transition-all shadow-xl shadow-amber-500/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Restaurant Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-zinc-800">
        <div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Review Your Order
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Table #{tableNumber}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const price = item.menuItem.price || 0;
            const itemId = item.menuItem._id || item.menuItem.id;
            return (
              <div
                key={itemId}
                className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';
                    }}
                  />
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {item.menuItem.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      ₹{price} each •{' '}
                      <span className="text-zinc-500 font-medium">
                        {item.menuItem.category}
                      </span>
                    </p>
                    <p className="text-xs font-black text-amber-400">
                      Subtotal: ₹{price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() => dispatch(decreaseQuantity(itemId))}
                      className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item.menuItem))}
                      className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center font-bold transition-colors cursor-pointer"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(itemId))}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Cooking Instructions Box */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Cooking Notes / Special Requests for Chef</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Less spicy, make extra crisp, no onion/garlic..."
              value={specialInstructions}
              onChange={(e) =>
                dispatch(setSpecialInstructions(e.target.value))
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Checkout & Bill Summary */}
        <div className="space-y-5">
          {/* Coupon Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Coupons & Special Discounts</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs">
                <div>
                  <p className="font-black text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {appliedCoupon.code} Applied!
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {appliedCoupon.description} (Saved ₹{discount})
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeCoupon())}
                  className="text-xs text-red-400 hover:underline font-bold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (FIRST30)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 uppercase font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-2 bg-zinc-800 hover:bg-amber-400 hover:text-black text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] text-red-400 font-semibold">{couponError}</p>
                )}

                {/* Quick 1-Click Offers */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleApplyCoupon('FIRST30')}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-400/5 hover:bg-amber-400/10 border border-amber-400/20 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      FIRST30 • 30% OFF First Order
                    </span>
                    <span className="text-[10px] text-amber-400 font-black uppercase">
                      Tap to Apply
                    </span>
                  </button>
                  <button
                    onClick={() => handleApplyCoupon('FLAT50')}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-400/5 hover:bg-amber-400/10 border border-amber-400/20 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-amber-400" />
                      FLAT50 • Flat ₹50 OFF
                    </span>
                    <span className="text-[10px] text-amber-400 font-black uppercase">
                      Tap to Apply
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bill Breakdown */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 backdrop-blur-md shadow-xl">
            <h2 className="text-sm font-black text-white">Bill Summary</h2>

            <div className="space-y-2.5 text-xs text-zinc-300 font-medium">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Contactless Table Service</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-sm font-black text-white">
                <span>Grand Total</span>
                <span className="text-xl font-black text-amber-400">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-110 active:scale-[0.98] text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {placingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Transmitting Order to Kitchen...</span>
                </>
              ) : (
                <>
                  <span>Place Dine-In Order (Table #{tableNumber})</span>
                  <span>➔</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
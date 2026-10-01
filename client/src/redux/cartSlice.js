import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('qrdine_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadCouponFromStorage = () => {
  try {
    const saved = localStorage.getItem('qrdine_coupon');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getStoredTableNumber = () => {
  try {
    const saved = localStorage.getItem('tableNumber');
    if (saved && (Number(saved) > 10 || isNaN(Number(saved)))) {
      localStorage.removeItem('tableNumber');
      return '1';
    }
    return saved || '1';
  } catch {
    return '1';
  }
};

const initialState = {
  items: loadCartFromStorage(), // [{ menuItem, quantity }]
  appliedCoupon: loadCouponFromStorage(),
  specialInstructions: localStorage.getItem('qrdine_instructions') || '',
  tableNumber: getStoredTableNumber(),
  tableSlug: localStorage.getItem('tableSlug') || null,
};

const saveCart = (items) => {
  try {
    localStorage.setItem('qrdine_cart', JSON.stringify(items));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const menuItem = action.payload;
      const existing = state.items.find(
        (i) => (i.menuItem._id || i.menuItem.id) === (menuItem._id || menuItem.id)
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ menuItem, quantity: 1 });
      }
      saveCart(state.items);
    },
    decreaseQuantity: (state, action) => {
      const menuItemId = action.payload;
      const index = state.items.findIndex(
        (i) => (i.menuItem._id || i.menuItem.id) === menuItemId
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
        saveCart(state.items);
      }
    },
    updateQuantity: (state, action) => {
      const { menuItemId, quantity } = action.payload;
      const item = state.items.find(
        (i) => (i.menuItem._id || i.menuItem.id) === menuItemId
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => (i.menuItem._id || i.menuItem.id) !== menuItemId
          );
        } else {
          item.quantity = quantity;
        }
        saveCart(state.items);
      }
    },
    removeFromCart: (state, action) => {
      const menuItemId = action.payload;
      state.items = state.items.filter(
        (i) => (i.menuItem._id || i.menuItem.id) !== menuItemId
      );
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.specialInstructions = '';
      localStorage.removeItem('qrdine_cart');
      localStorage.removeItem('qrdine_coupon');
      localStorage.removeItem('qrdine_instructions');
    },
    applyCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
      localStorage.setItem('qrdine_coupon', JSON.stringify(action.payload));
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      localStorage.removeItem('qrdine_coupon');
    },
    setSpecialInstructions: (state, action) => {
      state.specialInstructions = action.payload;
      localStorage.setItem('qrdine_instructions', action.payload);
    },
    setTableInfo: (state, action) => {
      state.tableNumber = action.payload.tableNumber;
      state.tableSlug = action.payload.tableSlug;
      if (action.payload.tableNumber) {
        localStorage.setItem('tableNumber', action.payload.tableNumber);
      }
      if (action.payload.tableSlug) {
        localStorage.setItem('tableSlug', action.payload.tableSlug);
      }
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  setSpecialInstructions,
  setTableInfo,
} = cartSlice.actions;

export default cartSlice.reducer;

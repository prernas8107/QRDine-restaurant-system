import Cart from '../models/cart.js';
import Menu from '../models/menu.js';

// Helper to recalculate total cart price
const recalculateCartTotal = async (cart) => {
  let total = 0;
  for (const item of cart.items) {
    const menuItem = await Menu.findById(item.menuItemId);
    if (menuItem) {
      total += (item.quantity || 1) * menuItem.price;
    }
  }
  cart.totalCartPrice = total;
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId }).populate('items.menuItemId');

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { userId, items: [], totalCartPrice: 0 },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { menuItemId, userId, quantity = 1 } = req.body;
    if (!menuItemId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'menuItemId and userId are required',
      });
    }

    const menu = await Menu.findById(menuItemId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'No menu item found',
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalCartPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId.toString()
    );

    const qtyToAdd = parseInt(quantity, 10) || 1;
    if (!existingItem) {
      cart.items.push({ menuItemId, quantity: qtyToAdd });
    } else {
      existingItem.quantity += qtyToAdd;
    }

    await recalculateCartTotal(cart);
    await cart.save();

    return res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//  INCREASE QUANTITY

export const increaseItem = async (req, res) => {
  try {
    const { userId, menuItemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;

    // Recalculate total
    let total = 0;
    for (const cartItem of cart.items) {
      const menu = await Menu.findById(cartItem.menuItemId);
      total += cartItem.quantity * menu.price;
    }

    cart.totalCartPrice = total;
    await cart.save();

    res.json({ message: "Quantity increased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  DECREASE QUANTITY

export const decreaseItem = async (req, res) => {
  try {
    const { userId, menuItemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // Remove if only 1 left
      cart.items = cart.items.filter(
        (i) => i.menuItemId.toString() !== menuItemId
      );
    }

    // Recalculate total price
    let total = 0;
    for (const cartItem of cart.items) {
      const menu = await Menu.findById(cartItem.menuItemId);
      total += cartItem.quantity * menu.price;
    }

    cart.totalCartPrice = total;
    await cart.save();

    res.json({ message: "Quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
//  CLEAR ENTIRE CART
// ===============================
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalCartPrice = 0;

    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// REMOVE ITEM COMPLETELY FROM CART
export const removeItemCart = async (req, res) => {
  try {
    const { userId, menuItemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemId
    );

    // Recalculate total price
    let total = 0;
    for (const cartItem of cart.items) {
      const menu = await Menu.findById(cartItem.menuItemId);
      total += cartItem.quantity * menu.price;
    }

    cart.totalCartPrice = total;
    await cart.save();

    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//menuItemiD , userId , quantity=1

// {
//     userId : 'lkfjkfdjsf' ,
//     items : [{menuItemId : 'fdfsdfjd', quantity : 1}]
// }

//NOTE TODO 
//getCart
//removeItemCart
//increase
//decrease
//clear cart

//menu controller => isAvailable field true or false

// 6 api's thunk
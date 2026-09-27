const orderTemplate = (customerName, orderId, tableNumber, items, finalAmount) => {
  const itemsList = (items || [])
    .map((i) => `• ${i.name} (Qty: ${i.quantity}) - ₹${(i.price || 0) * (i.quantity || 1)}`)
    .join('\n');

  return `Hi ${customerName},

Thank you for your order at QRDine! 🎉

Order ID: ${orderId}
Table Number: #${tableNumber || 'N/A'}

Items Ordered:
${itemsList}

Total Amount: ₹${finalAmount}

Your food is being freshly prepared and will be brought straight to your table! 🍽️

Happy eating!
QRDine Team`;
};

export default orderTemplate;

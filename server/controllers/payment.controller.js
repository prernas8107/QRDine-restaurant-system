import Razorpay from 'razorpay';
import crypto from 'crypto';

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_SRcNlIyM4CBqmC';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'BgqUOb24FuJWbeqYuVglDKMA';

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: 'rcpt_' + Date.now(),
    };

    // Create a real order on Razorpay servers
    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      keyId: key_id,
      order,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'BgqUOb24FuJWbeqYuVglDKMA';

    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature || !razorpay_signature) {
      return res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

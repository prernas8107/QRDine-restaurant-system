import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    sessionToken: {
      type: String,
      default: null,
    },
    deviceId: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    tableNumber: {
      type: Number,
      default: null,
    },
    qrCodeUrl: {
      type: String,
    },
    convertedSession: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;
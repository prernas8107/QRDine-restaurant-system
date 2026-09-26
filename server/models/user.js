import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    accountTypes: {
      type: String,
      enum: ['REGISTERED', 'GUEST'],
      default: 'REGISTERED',
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalSpend: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    refreshTokenExpiresTime: {
      type: Date,
      default: null,
    },
    lastlogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

//mongodbatlas => api integration 


//login register => auth


//redux toolkit => async thunk api call => slice main data manage karo



//NOTE update table , delete table , user.controller.js , user.routes.js => all users get /token /admin , deactivate user  , update user  , delete user

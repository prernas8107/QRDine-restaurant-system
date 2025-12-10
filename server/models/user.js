//module--common.js/es6 ye es6(import & export) me h
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String }
    , email: { type: String }
    , phone: { type: Number }
    , passwordHash: { type: String }
    , role: {
        type: String,
        enum: ['customer', 'admin'],
        default  : 'customer'
    }
    , totalSpend: {
        type: Number
    },
    totalOrders: {
        type: Number
    },
    loyalPoints:{
        type:Number
    }
    , isActive: { type: Boolean }
    , refreshToken: { type: String }
})
const User = mongoose.model("User", userSchema)
export default User;
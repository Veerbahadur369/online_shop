import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = (userId)=>{
    
}

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    avatar: {
      url: {
        type: String,
        default: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
      },
      public_id: String, // Cloudinary image of user's profile

    },
    addresses: [addressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    refreshToken:{
      type:String,
      default:""
    }
  },
  { timestamps: true ,
    versionKey:false
  }
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.methods.verifyUserPassword=function (loginPassword) {
   return bcrypt.compare(loginPassword,this.password); 
}


userSchema.methods.genrateAccesToken = function(){
  return jwt.sign({
    _id:this._id,
    email:this.email
  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
}

userSchema.methods.genrateRefreshToken = function(){ 
  return jwt.sign({
    _id:this._id,
    
  },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE})
} 

export const User = mongoose.model("User", userSchema);
  
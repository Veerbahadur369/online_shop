import mongoose from "mongoose";

// --- Subschemas ---
const dimensionSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
});

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const metaSchema = new mongoose.Schema({
  barcode: String,
  qrCode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// --- Product Schema ---
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    tags: [String],
    brand: String,
    sku: { type: String, unique: true },
    weight: Number,
    dimensions: dimensionSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Preorder"],
      default: "In Stock",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    returnPolicy: String,
    minimumOrderQuantity: { type: Number, default: 1 },
    meta: metaSchema,
    images: [{type:String}],
    thumbnail: String,

    //  NEW FIELD: Who created this product
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

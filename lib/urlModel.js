// lib/model.js
import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    code: String,
    longUrl: String,
    clicks: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
); // 👈 ADDED



export default mongoose.models.Url || mongoose.model("Url", UrlSchema);

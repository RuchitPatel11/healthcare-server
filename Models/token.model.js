const mongoose = require("mongoose");
const { Schema } = mongoose;
const testTime = () => {
    let dt = new Date();
    dt.setHours(dt.getHours() + 48);
    let ut = dt.toLocaleString();
    return ut;
  };

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: { type: String, required: true },
  validTill: {
    type: Date,
    required: true,
    default: testTime,
  },
},
{ timestamps: true });

module.exports.Token = mongoose.model("Token", tokenSchema);

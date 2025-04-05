const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: Schema.Types.String,},
    email: { type: Schema.Types.String,},
    emails: [
      {
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;

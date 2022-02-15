const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Palabra = new Schema(
  {
    palabra1: { type: String, required: true, minlength: 3, maxlength: 50 },
    palabra2: { type: String, required: true, minlength: 3, maxlength: 50 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("palabra", Palabra);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "Digita tu nombre porfavor!"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Este email ya se encuentra registrado."],
      required: [true, "Digita tu e-mail porfavor!"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Digita tu contrasenia porfavor!"],
      minlength: [6, "El largo mínimo de la contrasenia es 6 caracteres."],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", User);

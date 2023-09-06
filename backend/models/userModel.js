import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add username"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    userId: {
      type: String,
    },
    sumLv1: {
      type: Number,
      default: 0,
    },
    sumLv2: {
      type: Number,
      default: 0,
    },
    sumLv3: {
      type: Number,
      default: 0,
    },
    subtractionLv1: {
      type: Number,
      default: 0,
    },
    subtractionLv2: {
      type: Number,
      default: 0,
    },
    subtractionLv3: {
      type: Number,
      default: 0,
    },
    multiplicationLv1: {
      type: Number,
      default: 0,
    },
    multiplicationLv2: {
      type: Number,
      default: 0,
    },
    multiplicationLv3: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)

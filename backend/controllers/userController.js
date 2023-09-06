import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import fs from "fs"
import { error } from "console"

// Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  })
}

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Check fields if empety
    if (!email || !name || !password) {
      res.status(400).json("Lengkapi formulir")
      throw new Error("Please add all fieds")
    }

    if (name.length > 7) {
      res.status(400).json("Nama maksimal 7 karakter")
    }

    if (!validator.isEmail(email)) {
      res.status(400).json("Email tidak valid")
    }

    //  Check user if exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json("Email sudah digunakan")
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Make user id
    const countDocuments = await User.countDocuments()
    const userId = String(countDocuments + 1).padStart(6, "0")

    // Add random photo profil
    const randomImg = Math.ceil(Math.random() * 6)

    // Create user to database
    await User.create({
      name,
      email,
      password: hashedPassword,
      userId,
      img: `${randomImg}.png`,
    })
      .then((response) => {
        res.status(200).json({
          message: "Successfull register",
          token: generateToken(response._id),
        })
      })
      .catch((error) => {
        console.log({ message: error })
      })
  } catch (error) {
    console.log(error)
  }
}

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    const validationPassword = await bcrypt.compare(password, user.password)
    if (!user || !validationPassword) {
      res.status(400).json("Akun tidak ditemukan")
      throw new Error("Invalid credentials")
    }

    res.json({
      message: "Login successfull",
      token: generateToken(user._id),
    })
  } catch (error) {
    console.log(error)
  }
}

// Change image
export const changeImg = async (req, res) => {
  const img = req.body.img
  const user = req.user
  try {
    const updateImg = await User.findByIdAndUpdate(
      user._id,
      { img },
      { new: true }
    )
    if (!updateImg) {
      res.status(400).json("Gagal memperbarui gambar")
      throw new Error("Failed change image")
    }
    res.status(200).json("Berhasil memperbarui gambar")
  } catch (error) {
    console.error(error)
  }
}

// Get game
export const getGame = async (req, res) => {
  res.status(200).json(req.user)
}

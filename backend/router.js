import express, { Router } from "express"
import {
  register,
  login,
  getGame,
  changeImg,
} from "./controllers/userController.js"
import { protect } from "./middleware/authMiddleware.js"
import {
  subtractionLv1,
  subtractionLv2,
  subtractionLv3,
  multiplicationLv1,
  multiplicationLv2,
  multiplicationLv3,
  sumLv1,
  sumLv2,
  sumLv3,
} from "./controllers/gameController.js"
import { savePoint } from "./controllers/saveController.js"
import { ranking } from "./controllers/rankingController.js"

const Route = express.Router()

// Route for user
Route.post("/register", register)
Route.post("/login", login)
Route.get("/game", protect, getGame)
Route.patch("/changeImg", protect, changeImg)

// Route for game
// Sum
Route.get("/sumLv1", protect, sumLv1)
Route.get("/sumLv2", protect, sumLv2)
Route.get("/sumLv3", protect, sumLv3)
// Subtraction
Route.get("/subtractionLv1", protect, subtractionLv1)
Route.get("/subtractionLv2", protect, subtractionLv2)
Route.get("/subtractionLv3", protect, subtractionLv3)
// Multiplication
Route.get("/multiplicationLv1", protect, multiplicationLv1)
Route.get("/multiplicationLv2", protect, multiplicationLv2)
Route.get("/multiplicationLv3", protect, multiplicationLv3)
// Save point
Route.patch("/savePoint", protect, savePoint)
// Ranking
Route.get("/ranking", ranking)

export default Route

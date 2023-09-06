import express from "express"
import Router from "./router.js"
import cors from "cors"
import connetDB from "./config/db.js"
import dotenv from "dotenv"

const app = express()
const port = 5000
app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static("backend/images"))

// Database
dotenv.config()
connetDB()

// Router
app.use(Router)

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})

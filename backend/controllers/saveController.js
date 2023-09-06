import User from "../models/userModel.js"

export const savePoint = async (req, res) => {
  const { path, point } = req.body
  const user = req.user
  let originalPoint
  switch (path) {
    case "sumLv1":
      originalPoint = await user.sumLv1
      try {
        if (originalPoint >= parseInt(point)) {
          return res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { sumLv1: point },
            { new: true }
          )
          return res.json("High score")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "sumLv2":
      originalPoint = await user.sumLv2
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { sumLv2: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "sumLv3":
      originalPoint = await user.sumLv3
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { sumLv3: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "subtractionLv1":
      try {
        originalPoint = await user.subtractionLv1
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { subtractionLv1: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "subtractionLv2":
      originalPoint = await user.subtractionLv2
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { subtractionLv2: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "subtractionLv3":
      originalPoint = await user.subtractionLv3
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { subtractionLv3: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "multiplicationLv1":
      originalPoint = await user.multiplicationLv1
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { multiplicationLv1: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "multiplicationLv2":
      originalPoint = await user.multiplicationLv2
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { multiplicationLv2: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    case "multiplicationLv3":
      originalPoint = await user.multiplicationLv3
      try {
        if (originalPoint >= parseInt(point)) {
          res.json("Less point")
        } else if (originalPoint < parseInt(point)) {
          await User.findByIdAndUpdate(
            user.id,
            { multiplicationLv3: point },
            { new: true }
          )
          res.json("succes")
        }
      } catch (error) {
        console.error(error)
      }
      break
    default:
      break
  }
  //   res.json({ originalPoint, tes })
}

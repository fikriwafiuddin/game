import User from "../models/userModel.js"

export const ranking = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({
        sumLv1: -1,
        sumLv2: -1,
        sumLv3: -1,
        subtractionLv1: -1,
        subtractionLv2: -1,
        subtractionLv3: -1,
        multiplicationLv1: -1,
        multiplicationLv2: -1,
        multiplicationLv3: -1,
      })
      .limit(10)

    const rank = {
      sumLv1: topUsers.map((data) => ({
        name: data.name,
        score: data.sumLv1,
        img: data.img,
      })),
      sumLv2: topUsers.map((data) => ({
        name: data.name,
        score: data.sumLv2,
        img: data.img,
      })),
      sumLv3: topUsers.map((data) => ({
        name: data.name,
        score: data.sumLv3,
        img: data.img,
      })),
      subtractionLv1: topUsers.map((data) => ({
        name: data.name,
        score: data.subtractionLv1,
        img: data.img,
      })),
      subtractionLv2: topUsers.map((data) => ({
        name: data.name,
        score: data.subtractionLv2,
        img: data.img,
      })),
      subtractionLv3: topUsers.map((data) => ({
        name: data.name,
        score: data.subtractionLv3,
        img: data.img,
      })),
      multiplicationLv1: topUsers.map((data) => ({
        name: data.name,
        score: data.multiplicationLv1,
        img: data.img,
      })),
      multiplicationLv2: topUsers.map((data) => ({
        name: data.name,
        score: data.multiplicationLv2,
        img: data.img,
      })),
      multiplicationLv3: topUsers.map((data) => ({
        name: data.name,
        score: data.multiplicationLv3,
        img: data.img,
      })),
    }

    res.json(rank)
  } catch (error) {
    console.error("error", error)
    res.status(500).json({ error: "Terjadi kesalahan dalam pengambilan data" }) // Menambahkan respons status kesalahan
  }
}

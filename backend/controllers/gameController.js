import { counting } from "../functions/functions.js"

// +++++++++++++++
// Game sum level 1
export const sumLv1 = async (req, res) => {
  const questions = counting("+", 1)
  res.json(questions)
}

// Game sum level 2
export const sumLv2 = (req, res) => {
  const questions = counting("+", 2)
  res.json(questions)
}

// Game sum level 3
export const sumLv3 = (req, res) => {
  const questions = counting("+", 3)
  res.json(questions)
}

// ---------------
// Game subtraction level 1
export const subtractionLv1 = (req, res) => {
  const questions = counting("-", 1)
  res.json(questions)
}

// Game subtraction level 2
export const subtractionLv2 = (req, res) => {
  const questions = counting("-", 2)
  res.json(questions)
}

// Game subtraction level 3
export const subtractionLv3 = (req, res) => {
  const questions = counting("-", 3)
  res.json(questions)
}

// ***************
// Game multiplication level 1
export const multiplicationLv1 = (req, res) => {
  const questions = counting("*", 1)
  res.json(questions)
}

// Game multiplication level 2
export const multiplicationLv2 = (req, res) => {
  const questions = counting("*", 2)
  res.json(questions)
}

// Game multiplication level 3
export const multiplicationLv3 = (req, res) => {
  const questions = counting("*", 3)
  res.json(questions)
}

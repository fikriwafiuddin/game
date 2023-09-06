export const counting = (operator, level) => {
  const roundsNumber = 5
  // Make number
  let difficulty
  if (level === 1) {
    difficulty = 20
  } else if (level === 2) {
    difficulty = 100
  } else if (level === 3) {
    difficulty = 250
  }

  const makeNumbers = (numbers, roundsNumber, difficulty) => {
    for (let i = 0; i < roundsNumber; i++) {
      numbers.push(Math.round(Math.random() * difficulty))
    }
  }
  const numbers = []
  makeNumbers(numbers, roundsNumber, difficulty)

  // Add results
  const result = numbers.reduce((total, value) => {
    if (operator === "+") {
      return total + value
    } else if (operator === "-") {
      return total - value
    } else if (operator === "*") {
      return total * value
    }
  })

  // Shuffle options
  const shuffel = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      // shuffle array
      ;[array[i], array[j]] = [array[j], array[i]]
      // -----------
    }
  }

  // Make options
  const makeOptions = (result, shuffel) => {
    let determinant = Math.ceil(Math.random() * 9 + 1)
    if (determinant > 0 && determinant <= 3) {
      let shuffelOptions = [
        result,
        result + determinant + 1,
        result + determinant + determinant,
      ]

      shuffel(shuffelOptions)
      return shuffelOptions
    } else if (determinant >= 3 && determinant <= 6) {
      let shuffelOptions = [
        result - determinant - 1,
        result,
        result + determinant,
      ]

      shuffel(shuffelOptions)
      return shuffelOptions
    } else if (determinant >= 6 && determinant <= 9) {
      let shuffelOptions = [
        result - determinant - 1,
        result - determinant - determinant,
        result,
      ]

      shuffel(shuffelOptions)
      return shuffelOptions
    }
  }

  const options = makeOptions(result, shuffel)

  // Gathering number,result, and option
  return {
    numbers,
    result,
    options,
  }
}

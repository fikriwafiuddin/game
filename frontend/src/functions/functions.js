export const conTitle = (path) => {
  const clearPath = path.replace("/", "")
  let title
  switch (clearPath) {
    case "sumLv1":
      title = "Penjumlahan Level 1"
      break
    case "sumLv2":
      title = "penjumlahan Level 2"
      break
    case "sumLv3":
      title = "Penjumlahan Level 3"
      break
    case "subtractionLv1":
      title = "Pengurangan Level 1"
      break
    case "subtractionLv2":
      title = "Pengurangan Level 2"
      break
    case "subtractionLv3":
      title = "Pengurangan Level 3"
      break
    case "multiplicationLv1":
      title = "Perkalian Level 1"
      break
    case "multiplicationLv2":
      title = "Perkalian Level 2"
      break
    case "multiplicationLv3":
      title = "Perkalian Level 3"
      break
    default:
      break
  }
  return title
}

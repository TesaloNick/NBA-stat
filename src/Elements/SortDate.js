export default function sortDate(array) {
  return array.sort((a, b) => {
    if (a.game) {
      const dateA = a.game.date
      const dateB = b.game.date
      // console.log(dateA);
      return dateA.slice(0, 4) == dateB.slice(0, 4) ?
        dateA.slice(5, 7) == dateB.slice(5, 7) ?
          +dateA.slice(8, 10) - +dateB.slice(8, 10) :
          +dateA.slice(5, 7) - +dateB.slice(5, 7) :
        +dateA.slice(0, 4) - +dateB.slice(0, 4)
    } else {
      const dateA = a.date
      const dateB = b.date
      return dateA.slice(0, 4) == dateB.slice(0, 4) ?
        dateA.slice(5, 7) == dateB.slice(5, 7) ?
          +dateA.slice(8, 10) - +dateB.slice(8, 10) :
          +dateA.slice(5, 7) - +dateB.slice(5, 7) :
        +dateA.slice(0, 4) - +dateB.slice(0, 4)
    }
  })
}

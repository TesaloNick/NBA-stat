import React from 'react'

export default function sortDate(array) {
  return array
    .sort((a, b) => {
      if (a.game) {
        if (a.game.date.slice(0, 4) == b.game.date.slice(0, 4)) {
          if (a.game.date.slice(5, 7) == b.game.date.slice(5, 7)) {
            return +a.game.date.slice(8, 10) - +b.game.date.slice(8, 10)
          } else {
            return +a.game.date.slice(5, 7) - +b.game.date.slice(5, 7)
          }
        } else {
          return +a.game.date.slice(0, 4) - +b.game.date.slice(0, 4)
        }
      } else {
        if (a.date.slice(0, 4) == b.date.slice(0, 4)) {
          if (a.date.slice(5, 7) == b.date.slice(5, 7)) {
            return +a.date.slice(8, 10) - +b.date.slice(8, 10)
          } else {
            return +a.date.slice(5, 7) - +b.date.slice(5, 7)
          }
        } else {
          return +a.date.slice(0, 4) - +b.date.slice(0, 4)
        }
      }

    })
}

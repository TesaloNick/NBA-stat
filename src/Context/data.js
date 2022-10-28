import { createContext } from "react";

let seasonsList = []
for (let i = 2021; i >= 1979; i--) {
  seasonsList.push(`${i}-${i + 1}`)
}

const contextData = createContext({
  seasons: seasonsList
})

export default contextData
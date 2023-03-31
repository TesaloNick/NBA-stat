import { createSlice } from '@reduxjs/toolkit';

let seasonsList = []
if ((new Date()).getMonth() >= 9){
  for (let i = (new Date()).getFullYear(); i >= 1979; i--) {
    seasonsList.push(`${i}-${i + 1}`)
  }
} else {
  for (let i = (new Date()).getFullYear()-1; i >= 1979; i--) {
    seasonsList.push(`${i}-${i + 1}`)
  } 
}

const seasonsData = createSlice({
  name: 'seasons',
  initialState: {
    seasons: seasonsList,
  },
  reducers: {},
});

export default seasonsData.reducer;
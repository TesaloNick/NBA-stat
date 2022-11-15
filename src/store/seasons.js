import { createSlice } from '@reduxjs/toolkit';

let seasonsList = []
for (let i = 2022; i >= 1979; i--) {
  seasonsList.push(`${i}-${i + 1}`)
}

const seasonsData = createSlice({
  name: 'seasons',
  initialState: {
    seasons: seasonsList,
  },
  reducers: {},
});

export default seasonsData.reducer;
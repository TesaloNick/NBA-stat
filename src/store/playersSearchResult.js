import { createSlice } from '@reduxjs/toolkit';

const playersSearchResult = createSlice({
  name: 'playersSearchResult',
  initialState: {
    playersSearchResult: null,
  },
  reducers: {
    changePlayersSearchResult(state, action) {
      state.playersSearchResult = {
        id: new Date().toISOString(),
        data: action.payload,
      }
    }
  },
});

export const { changePlayersSearchResult } = playersSearchResult.actions;

export default playersSearchResult.reducer;
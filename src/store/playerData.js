import { createSlice } from '@reduxjs/toolkit';

const playerData = createSlice({
  name: 'player',
  initialState: {
    player: [],
  },
  reducers: {
    addPlayer(state, action) {
      console.log(action);
      state.player.push({
        id: new Date().toISOString(),
        playerInfo: action.payload,
        completed: false,
      });
    },
    removePlayer(state, action) {
      state.player = state.player.filter(player => player.id !== action.payload.id);
    }
  },
});

export const { addPlayer, removePlayer } = playerData.actions;

export default playerData.reducer;
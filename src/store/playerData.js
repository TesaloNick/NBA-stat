import { createSlice } from '@reduxjs/toolkit';

const playerData = createSlice({
  name: 'player',
  initialState: {
    players: [],
  },
  reducers: {
    addPlayer(state, action) {
      console.log(action);
      state.players.push({
        id: new Date().toISOString(),
        playerInfo: action.payload,
      });
    },
    removePlayer(state, action) {
      state.players = state.players.filter(player => player.id !== action.payload.id);
    }
  },
});

export const { addPlayer, removePlayer } = playerData.actions;

export default playerData.reducer;
import { createSlice } from '@reduxjs/toolkit';

const playerData = createSlice({
  name: 'player',
  initialState: {
    players: [],
  },
  reducers: {
    addPlayer(state, action) {
      state.players.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    removePlayer(state, action) {
      state.players = state.players.filter(player => player.id !== action.payload.id);
    }
  },
});

export const { addPlayer, removePlayer } = playerData.actions;

export default playerData.reducer;
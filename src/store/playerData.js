import { createSlice } from '@reduxjs/toolkit';

const playerData = createSlice({
  name: 'player',
  initialState: {
    players: [],
  },
  reducers: {
    addPlayer(state, action) {
      if (!state.players.map(player => player.id).includes(action.payload.id))
        state.players.push({
          id: action.payload.id,
          playerInfo: action.payload,
        });
    }
  },
});

export const { addPlayer } = playerData.actions;

export default playerData.reducer;
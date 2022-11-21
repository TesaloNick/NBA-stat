import { createSlice } from '@reduxjs/toolkit';

const teamData = createSlice({
  name: 'team',
  initialState: {
    teams: [],
  },
  reducers: {
    addTeam(state, action) {
      state.teams.push({
        id: action.payload.id,
        teamInfo: action.payload,
      });
    }
  },
});

export const { addTeam } = teamData.actions;

export default teamData.reducer;
import { configureStore } from '@reduxjs/toolkit';
import playerData from './playerData';
import teamData from './teamData';
import seasons from './seasons';
import teams from './teams';

export default configureStore({
  reducer: {
    player: playerData,
    team: teamData,
    teams: teams,
    seasons: seasons,
  },
});

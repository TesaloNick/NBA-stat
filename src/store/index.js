import { configureStore } from '@reduxjs/toolkit';
import playerData from './playerData';

export default configureStore({
  reducer: {
    player: playerData,
  },
});

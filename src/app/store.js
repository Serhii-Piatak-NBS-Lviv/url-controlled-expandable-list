import { configureStore } from '@reduxjs/toolkit';
import sftpopoverReducer from '../components/sftpopoverSlice'; 

export default configureStore({
  reducer: {
    sftpopover: sftpopoverReducer,
  },
});
import { createSlice } from "@reduxjs/toolkit";

export const sftpopoverSlice = createSlice({
    name: 'sftpopover',
    initialState: {
      item_id: '',
    },
    reducers: {
      selectItem: (state, action) => {
        state.item_id = action.payload
      },
    },
  });

  export const { selectItem } = sftpopoverSlice.actions;

export default sftpopoverSlice.reducer;
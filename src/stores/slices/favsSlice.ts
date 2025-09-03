// src\stores\slices\favsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavsState = { pinnedIds: Record<number, true> };
const initialState: FavsState = { pinnedIds: {} };

const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    togglePin(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.pinnedIds[id]) delete state.pinnedIds[id];
      else state.pinnedIds[id] = true;
    },
  },
});

export const { togglePin } = favsSlice.actions;
export default favsSlice.reducer;

// Selectors
export const isPinnedSelector = (id: number) => (s: { favs: FavsState }) =>
  !!s.favs.pinnedIds[id];

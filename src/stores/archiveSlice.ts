// src/stores/archiveSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from 'blank/types/todo';

type ArchiveState = {
  byId: Record<number, Todo>;
  ids: number[];
};

const initialState: ArchiveState = { byId: {}, ids: [] };

const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    archiveAdded: (state, { payload }: PayloadAction<Todo>) => {
      state.byId[payload.id] = payload;
      if (!state.ids.includes(payload.id)) state.ids.push(payload.id);
    },
    archiveRemoved: (state, { payload }: PayloadAction<number>) => {
      delete state.byId[payload];
      state.ids = state.ids.filter((id) => id !== payload);
    },
    archiveCleared: (state) => {
      state.byId = {};
      state.ids = [];
    },
  },
});

export const { archiveAdded, archiveRemoved, archiveCleared } =
  archiveSlice.actions;
export default archiveSlice.reducer;

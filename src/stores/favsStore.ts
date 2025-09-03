// src\stores\favsStore.ts

import { create } from 'zustand';

type State = { pinnedIds: Record<number, true> };
type Actions = {
  togglePin: (id: number) => void;
  isPinned: (id: number) => boolean;
};

export const useFavs = create<State & Actions>((set, get) => ({
  pinnedIds: {},
  togglePin(id) {
    const map = { ...get().pinnedIds };
    if (map[id]) delete map[id];
    else map[id] = true;
    set({ pinnedIds: map });
  },
  isPinned: (id) => !!get().pinnedIds[id],
}));

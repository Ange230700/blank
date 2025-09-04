// src/features/archive/hooks/useArchive.ts
import { useAppDispatch, useAppSelector } from 'blank/stores/hooks';
import {
  archiveAdded,
  archiveRemoved,
  archiveCleared,
} from 'blank/stores/archiveSlice';
import type { Todo } from 'blank/types/todo';

export function useArchive() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.archive.ids);
  const byId = useAppSelector((s) => s.archive.byId);

  const archived = ids.map((id) => byId[id]);
  const isArchived = (id: number) => !!byId[id];

  const archive = (t: Todo) => dispatch(archiveAdded(t));
  const unarchive = (id: number) => dispatch(archiveRemoved(id));
  const clearAll = () => dispatch(archiveCleared());

  return { archived, isArchived, archive, unarchive, clearAll };
}

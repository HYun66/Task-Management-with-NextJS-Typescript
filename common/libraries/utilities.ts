import type { Task } from 'types';

import { produce } from 'immer';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const updateTaskInList = (tasks: Task[], updatedTask: Task): Task[] => {
  return produce(tasks, (draft) => {
    const index = draft.findIndex((task) => task.id === updatedTask.id);

    if (index !== -1) {
      draft[index] = updatedTask;
    }
  });
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

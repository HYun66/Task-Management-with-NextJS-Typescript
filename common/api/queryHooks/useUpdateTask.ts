import type { Task, UpdateTaskRequest, ApiResponse } from 'types';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'common/api';

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
      apiClient.put<ApiResponse<Task>>(`/api/tasks/${id}`, data),
  });
};

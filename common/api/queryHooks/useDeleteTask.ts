import type { Task, ApiResponse } from 'types';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'common/api';

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<Task>>(`/api/tasks/${id}`),
  });
};

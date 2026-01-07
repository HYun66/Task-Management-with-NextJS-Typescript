import type { Task, CreateTaskRequest, ApiResponse } from 'types';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'common/api';

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (data: CreateTaskRequest) => apiClient.post<ApiResponse<Task>>('/api/tasks', data),
  });
};

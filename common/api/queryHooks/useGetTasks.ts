import type { Task, ApiResponse } from 'types';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from 'common/api';

export const getTasksKey = 'getTasks';

export const useGetTasks = () => {
  return useQuery({
    queryKey: [getTasksKey],
    queryFn: () => apiClient.get<ApiResponse<Task[]>>('/api/tasks'),
  });
};

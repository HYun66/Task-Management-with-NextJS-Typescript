import React from 'react';
import { useGetTasks } from 'common/api/queryHooks';
import { Typography, Box, Spinner } from 'common/ui';

import { TaskItem } from './components';

const TaskList: React.FC = () => {
  const { data: response, isLoading, error } = useGetTasks();

  if (isLoading) {
    return (
      <Box padding={4}>
        <Spinner data-testid="task-list--loading-spinner" position="middle" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={4}>
        <Typography className="text-red-600" id="task-list--error-text" variant="body">
          Error loading tasks. Please try again.
        </Typography>
      </Box>
    );
  }

  const tasks = response?.data || [];

  if (tasks.length === 0) {
    return (
      <Box padding={4}>
        <Typography className="text-gray-500" id="task-list--empty-state-text" variant="body">
          No tasks found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="space-y-4">
      <Typography id="task-list--title" variant="h2">
        Task List
      </Typography>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;

import React from 'react';
import { Box, Button, Typography, Switch, Spinner, toast } from 'common/ui';
import { formatDate } from 'common/libraries';
import { useQueryClient } from '@tanstack/react-query';
import { getTasksKey, useDeleteTask, useUpdateTask } from 'common/api/queryHooks';
import { getStatusColor } from 'modules/taskManagement/TaskList/libraries';
import type { Task } from 'types';

type TaskItemProperties = {
  task: Task;
};

export const TaskItem: React.FC<TaskItemProperties> = ({ task }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [getTasksKey] });
        toast.success('Task Deleted', 'The record has been removed.');
      },
      onError: (error) => {
        toast.error(`Failed`, `Please try again. Error: ${error}`);
      },
    });
  };

  const handleToggleStatus = () => {
    updateTask(
      {
        id: task.id,
        data: {
          status: task.status === 'pending' ? 'completed' : 'pending',
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getTasksKey] });
          toast.success('Task Status Updated');
        },
        onError: (error) => {
          toast.error(`Failed`, `Please try again. Error: ${error}`);
        },
      },
    );
  };

  if (isDeleting || isUpdating) {
    return (
      <Box padding={4}>
        <Spinner data-testid={`task-item--loading-spinner-${task.id}`} position="middle" />
      </Box>
    );
  }

  return (
    <Box
      key={task.id}
      className="border border-divider rounded-lg space-y-3 bg-content1"
      id={`task-item--${task.id}`}
      padding={4}
    >
      <Box alignItems="start" display="flex" justifyContent="between" flexDirection="row">
        <Box flex={1} flexDirection="column">
          <Typography id={`task-item--title-${task.id}`} variant="h3">
            {task.title}
          </Typography>
          <Typography className="text-foreground-600 mt-1" id={`task-item--description-${task.id}`} variant="body">
            {task.description}
          </Typography>
        </Box>
        <Box display="flex" alignItems="end" flexDirection="column" padding={2} className="space-y-3">
          <Button
            id={`task-item--delete-${task.id}`}
            size="sm"
            variant="flat"
            color="danger"
            isDisabled={isDeleting}
            isLoading={isDeleting}
            onPress={handleDelete}
          >
            Delete
          </Button>
          <Box display="flex" alignItems="center" className="gap-3">
            <Switch
              id={`task-item--toggle-status-${task.id}`}
              isSelected={task.status === 'completed'}
              isDisabled={isUpdating}
              onChange={handleToggleStatus}
            ></Switch>
            <Box className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
              <Typography id={`task-item--status-${task.id}`} variant="caption">
                {task.status.replace('_', ' ')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="text-sm text-foreground-500" display="flex" justifyContent="between">
        <Box>
          {task.assignedTo && (
            <Typography id={`task-item--assignee-${task.id}`} variant="caption">
              Assigned to: {task.assignedTo}
            </Typography>
          )}
        </Box>

        <Typography id={`task-item--date-${task.id}`} variant="caption">
          Updated: {formatDate(task.updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
};

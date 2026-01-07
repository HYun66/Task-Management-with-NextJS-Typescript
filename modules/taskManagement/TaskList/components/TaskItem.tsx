import { Box, Typography } from 'common/ui';
import { getStatusColor } from 'modules/taskManagement/TaskList/libraries';
import { formatDate } from 'common/libraries';
import React from 'react';
import { Task } from 'types';

type TaskItemProperties = {
  task: Task;
};

export const TaskItem: React.FC<TaskItemProperties> = ({ task }) => {
  return (
    <Box
      key={task.id}
      className="border border-divider rounded-lg space-y-3 bg-content1"
      id={`task-item--${task.id}`}
      padding={4}
    >
      <Box alignItems="start" display="flex" justifyContent="between">
        <Box flex={1} flexDirection="column">
          <Typography id={`task-item--title-${task.id}`} variant="h3">
            {task.title}
          </Typography>
          <Typography className="text-foreground-600 mt-1" id={`task-item--description-${task.id}`} variant="body">
            {task.description}
          </Typography>
        </Box>

        <Box className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
          <Typography id={`task-item--status-${task.id}`} variant="caption">
            {task.status.replace('_', ' ')}
          </Typography>
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

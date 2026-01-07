import React from 'react';
import TaskList from 'modules/taskManagement/TaskList';
import CreateTaskForm from 'modules/taskManagement/CreateTaskForm';
import { useModal } from 'common/hooks';
import { Typography, Box, Button } from 'common/ui';

const TaskManagementPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <Box className="min-h-screen bg-background">
      <Box className="max-w-4xl mx-auto py-8 px-4">
        <Box className="flex items-center justify-between mb-8">
          <Typography id="page-title" variant="h1">
            Task Management
          </Typography>

          <Button color="primary" id="toggle-create-form-btn" onPress={onOpen}>
            Create Task
          </Button>
        </Box>

        <CreateTaskForm isOpen={isOpen} onClose={onClose} />

        <TaskList />
      </Box>
    </Box>
  );
};

export default TaskManagementPage;

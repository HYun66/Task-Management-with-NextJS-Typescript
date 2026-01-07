import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task, UpdateTaskRequest, ApiResponse } from 'types';

import { mockTasks } from 'testUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Task>>) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({
      data: {} as Task,
      success: false,
      message: 'Invalid task ID',
    });

    return;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const taskIndex = mockTasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).json({
      data: {} as Task,
      success: false,
      message: 'Task not found',
    });

    return;
  }

  if (req.method === 'PUT') {
    // Update task
    const updateData = req.body as UpdateTaskRequest;

    const updatedTask: Task = {
      ...mockTasks[taskIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    mockTasks[taskIndex] = updatedTask;

    res.status(200).json({
      data: updatedTask,
      success: true,
    });
  } else if (req.method === 'DELETE') {
    // Delete task
    const deletedTask = mockTasks[taskIndex];

    mockTasks.splice(taskIndex, 1);

    res.status(200).json({
      data: deletedTask,
      success: true,
    });
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).json({
      data: {} as Task,
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}

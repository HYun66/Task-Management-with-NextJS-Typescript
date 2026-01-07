import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task, CreateTaskRequest, ApiResponse } from 'types';

import { generateId } from 'common/libraries';
import { mockTasks } from 'testUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Task[] | Task>>) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (req.method === 'GET') {
    // Get all tasks
    res.status(200).json({
      data: mockTasks,
      success: true,
    });
  } else if (req.method === 'POST') {
    // Create new task
    const taskData = req.body as CreateTaskRequest;

    if (!taskData.title || !taskData.description) {
      res.status(400).json({
        data: [] as any,
        success: false,
        message: 'Title and description are required',
      });

      return;
    }

    const newTask: Task = {
      id: generateId(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTasks.push(newTask);

    res.status(201).json({
      data: newTask,
      success: true,
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      data: [] as any,
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}

import type { Task } from 'types';

export let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review pull request',
    description: 'Review the new feature implementation',
    status: 'pending',
    assignedTo: 'john@example.com',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Fix authentication bug',
    description: 'Users are unable to log in with Google OAuth',
    status: 'completed',
    assignedTo: 'john@example.com',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    title: 'Update React to v18',
    description: 'Upgrade to the latest version of React',
    status: 'pending',
    assignedTo: 'jane@example.com',
    createdAt: '2024-01-13T14:45:00Z',
    updatedAt: '2024-01-15T09:14:00Z',
  },
];

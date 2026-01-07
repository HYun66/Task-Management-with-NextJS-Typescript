import { Task } from 'types';

export const getStatusColor = (status: Task['status']): string => {
  switch (status) {
    case 'pending':
      return 'bg-primary-100 text-primary-800';
    case 'completed':
      return 'bg-success-100 text-success-800';
    default:
      return 'bg-default-100 text-default-800';
  }
};

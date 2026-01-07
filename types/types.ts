// Global type definitions

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  assignedTo?: string;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest> & {
  status?: Task['status'];
};

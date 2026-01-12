import type { Task, ApiResponse } from 'types';

import React from 'react';
import { act, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockTasks } from 'testUtils';

import TaskList from '../../TaskList';
import { useDeleteTask, useGetTasks, useUpdateTask } from 'common/api/queryHooks';
import { toast } from 'common/ui';

const mockApiResponse: ApiResponse<Task[]> = {
  data: mockTasks,
  success: true,
};

// Mock toast helper
jest.mock('common/ui', () => ({
  ...jest.requireActual('common/ui'),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the specific queryHooks import path
jest.mock('common/api/queryHooks', () => ({
  getTasksKey: 'getTasks',
  useGetTasks: jest.fn(),
  useUpdateTask: jest.fn(),
  useDeleteTask: jest.fn(),
}));

const mockUseGetTasks = useGetTasks as jest.Mock;
const mockUseUpdateTask = useUpdateTask as jest.Mock;
const mockUseDeleteTask = useDeleteTask as jest.Mock;

const setup = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>,
  );
};

describe('modules taskManagement TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetTasks.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    mockUseDeleteTask.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    mockUseUpdateTask.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it('displays tasks correctly', () => {
    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    const { getByTestId, getByText } = setup();

    expect(getByTestId('task-list--title')).toBeVisible();
    expect(getByText('Task List')).toBeVisible();

    // Check first task
    expect(getByTestId('task-item--1')).toBeVisible();
    expect(getByTestId('task-item--title-1')).toHaveTextContent('Review pull request');
    expect(getByTestId('task-item--description-1')).toHaveTextContent('Review the new feature implementation');
    expect(getByTestId('task-item--status-1')).toHaveTextContent('pending');
    expect(getByTestId('task-item--assignee-1')).toHaveTextContent('Assigned to: john@example.com');
    expect(getByTestId('task-item--delete-1')).toBeVisible();
    expect(getByTestId('task-item--toggle-status-1')).toBeVisible();

    // Check second task
    expect(getByTestId('task-item--2')).toBeVisible();
    expect(getByTestId('task-item--title-2')).toHaveTextContent('Fix authentication bug');
    expect(getByTestId('task-item--status-2')).toHaveTextContent('completed');
    expect(getByTestId('task-item--delete-2')).toBeVisible();
    expect(getByTestId('task-item--toggle-status-2')).toBeVisible();
  });

  it('toggles task status when switch is clicked', () => {
    const updateMutate = jest.fn((_, { onSuccess }) => {
      onSuccess(); // simulate successful API call
    });

    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    mockUseUpdateTask.mockReturnValue({
      mutate: updateMutate,
      isPending: false,
    });

    const { getByTestId } = setup();

    getByTestId('task-item--toggle-status-1').click();

    // task 1 status updated to completed
    expect(updateMutate).toHaveBeenCalledWith(
      {
        id: '1',
        data: { status: 'completed' },
      },
      expect.any(Object),
    );

    expect(toast.success).toHaveBeenCalledWith('Task Status Updated');
  });

  it('deletes task when delete button is clicked', async () => {
    const deleteMutate = jest.fn((_: string, { onSuccess }) => {
      onSuccess(); // simulate successful API call
    });

    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    mockUseDeleteTask.mockReturnValue({
      mutate: deleteMutate,
      isPending: false,
    });

    const { getByTestId } = setup();

    await act(async () => {
      getByTestId('task-item--delete-1').click();
    });

    expect(deleteMutate).toHaveBeenCalledWith('1', expect.any(Object));

    expect(toast.success).toHaveBeenCalledWith('Task Deleted', 'The record has been removed.');
  });

  it('shows loading spinner when mutation is in progress', () => {
    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    mockUseDeleteTask.mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    const { getByTestId } = setup();

    expect(getByTestId('task-item--loading-spinner-1')).toBeVisible();
  });

  it('shows error when delete fails', async () => {
    const deleteMutate = jest.fn((_: string, { onError }) => {
      onError(new Error('unexpected')); // simulate API failure
    });

    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    mockUseDeleteTask.mockReturnValue({
      mutate: deleteMutate,
      isPending: false,
    });

    const { getByTestId } = setup();

    await act(async () => {
      getByTestId('task-item--delete-2').click();
    });

    expect(deleteMutate).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith('Failed', expect.stringContaining('unexpected'));
  });

  it('shows error when update status fails', async () => {
    const updateMutate = jest.fn((_: string, { onError }) => {
      onError(new Error('unexpected')); // simulate API failure
    });

    mockUseGetTasks.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      error: null,
    });

    mockUseUpdateTask.mockReturnValue({
      mutate: updateMutate,
      isPending: false,
    });

    const { getByTestId } = setup();

    await act(async () => {
      getByTestId('task-item--toggle-status-2').click();
    });

    // task 2 status is updating from completed to pending
    expect(updateMutate).toHaveBeenCalledWith(
      {
        id: '2',
        data: { status: 'pending' },
      },
      expect.any(Object),
    );

    expect(toast.error).toHaveBeenCalledWith('Failed', expect.stringContaining('unexpected'));
  });
});

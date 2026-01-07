import type { Task, ApiResponse } from 'types';

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockTasks } from 'testUtils';

import TaskList from '../TaskList';

const mockApiResponse: ApiResponse<Task[]> = {
  data: mockTasks,
  success: true,
};

// Mock the specific queryHooks import path
const mockUseGetTasks = jest.fn();

jest.mock('common/api/queryHooks', () => ({
  useGetTasks: () => mockUseGetTasks(),
}));

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
  });

  it('displays loading state', () => {
    mockUseGetTasks.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = setup();

    expect(getByTestId('task-list--loading-spinner')).toBeVisible();
  });

  it('displays error state', () => {
    mockUseGetTasks.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    const { getByTestId, getByText } = setup();

    expect(getByTestId('task-list--error-text')).toBeVisible();
    expect(getByText('Error loading tasks. Please try again.')).toBeVisible();
  });

  it('displays empty state when no tasks', () => {
    mockUseGetTasks.mockReturnValue({
      data: { data: [], success: true },
      isLoading: false,
      error: null,
    });

    const { getByTestId, getByText } = setup();

    expect(getByTestId('task-list--empty-state-text')).toBeVisible();
    expect(getByText('No tasks found.')).toBeVisible();
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

    // Check second task
    expect(getByTestId('task-item--2')).toBeVisible();
    expect(getByTestId('task-item--title-2')).toHaveTextContent('Fix authentication bug');
    expect(getByTestId('task-item--status-2')).toHaveTextContent('completed');
  });
});

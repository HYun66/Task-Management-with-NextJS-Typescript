---
name: Feature request
about: Add Task Actions
title: Add Task Actions
labels: ''
assignees: ''
---

## Overview

The requirement is to add **Delete** and **Mark Complete/Incomplete** actions to the existing task management system.

## Current State

- ✅ Task list displays tasks
- ✅ Task creation form exists
- ✅ API hooks for `useUpdateTask` and `useDeleteTask` already exist
- ❌ No way to delete tasks from UI
- ❌ No way to change task status from UI

## Your Task

Add action buttons to each task item that allow users to:

1. **Delete** a task
2. **Mark Complete** (when status is pending)
3. **Mark Incomplete** (when status is completed)

## Requirements

### Functional Requirements

1. Implement delete functionality with confirmation
2. Implement status toggle functionality
3. Show success messages after actions
4. Show loading states during all API calls
5. Handle errors gracefully

### Technical Requirements

1. Use existing API hooks: `useUpdateTask` and `useDeleteTask`
2. Follow existing code patterns and conventions
3. Add proper TypeScript types
4. Include proper test IDs for all interactive elements
5. Write comprehensive tests for new functionality using test IDs

## Success Criteria

- [ ] Delete button deletes tasks with confirmation
- [ ] Status toggle button changes task status correctly
- [ ] Loading states show during API calls
- [ ] Error messages display on failures
- [ ] All new functionality has comprehensive tests
- [ ] Code follows existing patterns and conventions
- [ ] UI is responsive and accessible
- [ ] No console errors, warnings or logs

## Process

Once you have completed your change, please submit a pull request and add "zimosworld" as the reviewer. The due date for completion is seven calendar days from the day this issue was created. If you require an extension please let us know.

## Available Resources

- API hooks: `useUpdateTask` and `useDeleteTask` from `common/api/queryHooks`
- UI components: `Button` from `common/ui`
- Existing test patterns in `modules/taskManagement/TaskList/components/__tests__/TaskItem.test.tsx`
- Code examples in existing `CreateTaskForm` module

Good luck! 🚀

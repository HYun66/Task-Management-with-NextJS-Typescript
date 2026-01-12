import { addToast as heroAddToast } from '@heroui/toast';

// Custom helper for Success/Error toasts
export const toast = {
  success: (title: string, description?: string) =>
    heroAddToast({
      title,
      description,
      color: 'success',
      variant: 'flat',
    }),
  error: (title: string, description?: string) =>
    heroAddToast({
      title,
      description,
      color: 'danger',
      variant: 'flat',
    }),
};

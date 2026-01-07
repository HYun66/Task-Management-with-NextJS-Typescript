import * as Yup from 'yup';

export const createTaskValidationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  assignedTo: Yup.string().email('Must be a valid email').optional(),
});

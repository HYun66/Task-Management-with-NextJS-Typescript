import type { CreateTaskRequest } from 'types';

import React from 'react';
import { Formik, Form } from 'formik';
import { useCreateTask, getTasksKey } from 'common/api/queryHooks';
import { Typography, Button } from 'common/ui';
import { Input, Textarea } from 'common/components/FormFields';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@heroui/modal';
import { removeQueries } from 'common/api/queryClient';

import { createTaskValidationSchema } from './libraries';

type CreateTaskFormProperties = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTaskForm: React.FC<CreateTaskFormProperties> = ({ isOpen, onClose }) => {
  const createTaskMutation = useCreateTask();

  const handleCreateTask = async (values: CreateTaskRequest, { resetForm }: { resetForm: () => void }) => {
    try {
      await createTaskMutation.mutateAsync(values);

      void removeQueries([getTasksKey]);

      onClose();
      resetForm();
    } catch {
      // Error will be displayed via mutation.error state
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        assignedTo: '',
      }}
      validationSchema={createTaskValidationSchema}
      onSubmit={handleCreateTask}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form className="space-y-4" id="create-task-form--form">
          <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader data-testid="create-task-form--modal-header" id="create-task-form--modal-header">
                    <Typography id="create-task-form--title" variant="h2">
                      Create New Task
                    </Typography>
                  </ModalHeader>

                  <ModalBody data-testid="create-task-form--modal-body" id="create-task-form--modal-body">
                    {createTaskMutation.error && (
                      <Typography className="text-danger text-center" id="create-task-form--error" variant="caption">
                        Failed to create task. Please try again.
                      </Typography>
                    )}

                    <Input
                      id="create-task-form--title-input"
                      isRequired={true}
                      label="Title"
                      name="title"
                      placeholder="Enter task title"
                      type="text"
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Textarea
                      id="create-task-form--description-input"
                      isRequired={true}
                      label="Description"
                      name="description"
                      placeholder="Enter task description"
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Input
                      id="create-task-form--assigned-to-input"
                      label="Assigned To (Optional)"
                      name="assignedTo"
                      placeholder="Enter email address"
                      type="email"
                      value={values.assignedTo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      id="create-task-form--cancel-button"
                      isDisabled={createTaskMutation.isPending}
                      onPress={onClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      id="create-task-form--submit-button"
                      isLoading={createTaskMutation.isPending}
                      type="submit"
                      onPress={() => {
                        handleSubmit();
                      }}
                    >
                      Create Task
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTaskForm;

'use client';
import { useCallback, useState } from 'react';

export const useModal = <T>(): {
  isOpen: boolean;
  onOpen: (newModalData?: T) => void;
  onClose: () => void;
  onOpenChange: () => void;
  modalData: T;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<T>();

  const handleOpen = (newModalData?: T): void => {
    setIsOpen(true);
    setModalData(newModalData);
  };

  const handleClose = (): void => {
    setIsOpen(false);
    setModalData(undefined);
  };

  const handleOpenChange = useCallback(() => {
    const action = isOpen ? handleClose : handleOpen;

    action();
  }, [isOpen, handleOpen, handleClose]);

  return {
    isOpen: isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onOpenChange: handleOpenChange,
    modalData: modalData as T,
  };
};

import React from 'react';
import { Toast, ToastType } from '@/components/Toast';

export const useToast = () => {
  const [toastState, setToastState] = React.useState<{
    visible: boolean;
    message: string;
    type: ToastType;
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (message: string, type: ToastType = 'info', duration?: number) => {
    setToastState({ visible: true, message, type });
    if (duration && duration > 0) {
      setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  const hideToast = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  return {
    toastState,
    showToast,
    hideToast,
    Toast: () => (
      <Toast
        visible={toastState.visible}
        message={toastState.message}
        type={toastState.type}
        onClose={hideToast}
        duration={3000}
      />
    ),
  };
};
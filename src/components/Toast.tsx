import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // milliseconds, 0 means persistent
  onClose?: () => void;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  visible,
}) => {
  useEffect(() => {
    if (visible && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) {
    return null;
  }

  const typeConfig = {
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
  };

  const config = typeConfig[type];

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto md:right-4 z-50 max-w-md mx-auto animate-fade-in-up">
      <div
        className={cn(
          'rounded-xl border p-4 shadow-lg flex items-start gap-3',
          config.bg,
          config.text
        )}
      >
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        <div className="flex-1 text-sm font-medium">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};


import { createContext, useContext, useState, useCallback, ReactNode
} from 'react';
import { Toast
} from '../components/ui/Toast';

interface ToastContextProps {
  toasts: Toast[];
  showToast: (message: string, type: Toast['type'
    ]) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children
}: { children: ReactNode
}) => {
  const [toasts, setToasts
    ] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'
    ] = 'info') => {
    const id = Math.random().toString(36).substr(2,
        9);
    setToasts((prev) => [...prev,
            { id, type, message
            }
        ]);
    setTimeout(() => removeToast(id),
        5000); // Auto-remove after 5 seconds
    },
    []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    []);

  return (
    <ToastContext.Provider value={
        { toasts, showToast, removeToast
        }
    }>
      {children
    }
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
    }
  return context;
};

import { useEffect, useState
} from 'react';
import { AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import { useToast
} from '../../hooks/useToast';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

const ToastContainer = () => {
  const { toasts, removeToast
    } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-6 space-y-4 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id
        }
          className={`transform transition-all duration-300 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
            toast.type === 'success'
              ? 'ring-green-500'
              : toast.type === 'error'
              ? 'ring-red-500'
              : 'ring-blue-500'
            }`
        }
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
                ) : toast.type === 'error' ? (
                  <XCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-blue-400" aria-hidden="true" />
                )
        }
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {toast.message
        }
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => removeToast(toast.id)
        }
                >
                  <span className="sr-only">Close</span>
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    }
    </div>
  );
};

export default ToastContainer;

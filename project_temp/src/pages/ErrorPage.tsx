import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

interface ErrorState {
  title?: string;
  message?: string;
  code?: string;
}

const ErrorPage = () => {
  const location = useLocation();
  const errorState = location.state as ErrorState;

  const defaultError = {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again later.',
    code: '500'
  };

  const { title, message, code } = errorState || defaultError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">{code}</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {message}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

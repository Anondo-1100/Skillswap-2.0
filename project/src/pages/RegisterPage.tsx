import { useState
} from 'react';
import { useNavigate, Link
} from 'react-router-dom';
import { useAuth
} from '../hooks/useAuth';
import type { AuthResponse
} from '../types/auth';

const RegisterPage = () => {
  const [email, setEmail
  ] = useState('');
  const [password, setPassword
  ] = useState('');
  const [confirmPassword, setConfirmPassword
  ] = useState('');
  const [error, setError
  ] = useState('');
  const navigate = useNavigate();
  const { register, loadingState
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting registration process...');

    if (loadingState.register) {
      console.log('Registration already in progress...');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Password mismatch');
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      console.log('Password too short');
      return setError('Password should be at least 6 characters');
    }

    try {
      setError('');
      console.log('Calling register function with email:', email);
      const response: AuthResponse = await register(email, password);
      console.log('Registration response:', response);
      
      if (response.status === 'error') {
        console.log('Registration error:', response.message);
        setError(response.message);
        return;
      }
      // Store email for verification button on the login page
      localStorage.setItem('lastRegisteredEmail', email);
      
      console.log('Registration successful, showing verification message');
      navigate('/login',
      {
        replace: true, // Replace history to prevent going back to register page
        state: {
          verificationMessage: response.message || 'Please check your email and verify your account before logging in.',
          email: email // Pass email to login page for convenience
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '
  }
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
              sign in to your account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md text-red-800 dark:text-red-200 text-sm">
            <span className="block sm:inline">{error
    }</span>
          </div>
        )
  }

        <form className="mt-8 space-y-6" onSubmit={handleSubmit
  }>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 focus:z-10 sm:text-sm dark:bg-gray-800"
                placeholder="Email address"
                value={email
  }
                onChange={(e) => setEmail(e.target.value)
  }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 focus:z-10 sm:text-sm dark:bg-gray-800"
                placeholder="Password"
                value={password
  }
                onChange={(e) => setPassword(e.target.value)
  }
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 focus:z-10 sm:text-sm dark:bg-gray-800"
                placeholder="Confirm Password"
                value={confirmPassword
  }
                onChange={(e) => setConfirmPassword(e.target.value)
  }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loadingState.register
  }
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingState.register && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )
  }
              Sign up
            </button>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '
  }
              <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
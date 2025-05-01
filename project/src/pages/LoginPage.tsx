import { useState, useEffect
} from 'react';
import { Link, useNavigate
} from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail
} from 'lucide-react';

// Mock user data - in a real app this would come from an API
const MOCK_USER = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  location: 'San Francisco, CA',
  joinedDate: 'January 2023',
  verified: true,
  bio: 'Full-stack developer with 5+ years of experience. Passionate about teaching coding and learning photography.',
  teachingSkills: [],
  learningSkills: [],
  walletBalance: 100.00,
  transactions: [
    {
      id: 'txn1',
      type: 'deposit',
      amount: 100.00,
      description: 'Initial deposit',
      timestamp: new Date().toISOString(),
      status: 'completed'
    }
  ]
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail
  ] = useState('');
  const [password, setPassword
  ] = useState('');
  const [showPassword, setShowPassword
  ] = useState(false);
  const [isLoading, setIsLoading
  ] = useState(false);
  const [error, setError
  ] = useState('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth'
    });
  },
  []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Mock authentication - In a real app, this would communicate with a backend
      if (email && password) {
        // Store login status and user data
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', '1');
        localStorage.setItem('userData', JSON.stringify(MOCK_USER));

        // Redirect to profile page
        navigate('/profile/1');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    },
    1000);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="space-y-8 bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg w-full max-w-md">
        <div className="text-center">
          <h2 className="font-bold text-gray-900 dark:text-white text-3xl">Welcome back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-200 text-sm">
            {error
    }
          </div>
        )
  }

        <form className="space-y-6 mt-8" onSubmit={handleSubmit
  }>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Email address
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Mail size={
    18
  } className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email
  }
                onChange={(e) => setEmail(e.target.value)
  }
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-3 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Password
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Lock size={
    18
  } className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text": "password"
  }
                autoComplete="current-password"
                required
                value={password
  }
                onChange={(e) => setPassword(e.target.value)
  }
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="••••••••"
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)
  }
                  className="focus:outline-none text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff size={
      18
    } /> : <Eye size={
      18
    } />
  }
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="border-gray-300 dark:border-gray-700 rounded focus:ring-teal-500 w-4 h-4 text-teal-600"
              />
              <label htmlFor="remember-me" className="block ml-2 text-gray-700 dark:text-gray-300 text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500 dark:hover:text-teal-300 dark:text-teal-400">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading
  }
              className="group relative flex justify-center bg-teal-600 hover:bg-teal-700 disabled:opacity-50 px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 w-full font-medium text-white text-sm disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null
  }
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{' '
  }
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500 dark:hover:text-teal-300 dark:text-teal-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
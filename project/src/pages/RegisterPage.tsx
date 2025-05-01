import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration delay
    setTimeout(() => {
      // Mock registration - In a real app, this would communicate with a backend
      console.log("Registration data:", formData);
      // Redirect would happen here in a real app
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="space-y-8 bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg w-full max-w-md">
        <div className="text-center">
          <h2 className="font-bold text-gray-900 dark:text-white text-3xl">Create an account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Join SkillSwap to start exchanging skills
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-200 text-sm">
            {error}
          </div>
        )}
        
        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Full Name
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-3 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Email address
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-3 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Password
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="••••••••"
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
              Password must be at least 6 characters
            </p>
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-10 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm appearance-none placeholder-gray-400"
                placeholder="••••••••"
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="border-gray-300 dark:border-gray-700 rounded focus:ring-teal-500 w-4 h-4 text-teal-600"
            />
            <label htmlFor="terms" className="block ml-2 text-gray-700 dark:text-gray-300 text-sm">
              I agree to the{' '}
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500 dark:hover:text-teal-300 dark:text-teal-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500 dark:hover:text-teal-300 dark:text-teal-400">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex justify-center bg-teal-600 hover:bg-teal-700 disabled:opacity-50 px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 w-full font-medium text-white text-sm disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Create Account
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 dark:hover:text-teal-300 dark:text-teal-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
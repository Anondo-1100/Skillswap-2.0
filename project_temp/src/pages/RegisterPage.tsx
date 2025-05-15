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
    const [loading, setLoading
    ] = useState(false);
    const [showLoginLink, setShowLoginLink
    ] = useState(false);
    const navigate = useNavigate();
    const { register
    } = useAuth();

    const validateForm = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }

        if (!password) {
            setError('Password is required');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with email:', email);

        if (!validateForm()) {
            return;
        }

        try {
            setError('');
            setLoading(true);
            console.log('Starting registration process...');
            
            const response = await register(email, password);
            console.log('Registration response:', response);

            if (response.status === 'error') {
                setError(response.message);
                if (response.message.includes('already exists')) {
                    setShowLoginLink(true);
                }
                return;
            }
            // On success, redirect to verification page
            navigate('/error',
            {
                state: {
                    title: 'Verify Your Email',
                    message: 'A verification email has been sent to your address. Please check your inbox and verify your email before logging in.',
                    code: '200'
                }
            });
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || 'Failed to create account. Please try again.');
            if (err.message?.includes('already exists')) {
                setShowLoginLink(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error
        }</span>
                        {showLoginLink && (
                            <div className="mt-2">
                                <Link to="/login" className="text-teal-600 hover:text-teal-500 font-medium">
                                    Click here to login instead
                                </Link>
                            </div>
                        )
        }
                    </div>
                )
    }
                <form className="mt-8 space-y-6" onSubmit={handleSubmit
    }>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
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
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
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
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
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
                            disabled={loading
    }
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900"
                        >
                            {loading ? 'Creating account...' : 'Create account'
    }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
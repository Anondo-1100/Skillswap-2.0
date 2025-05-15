import { useState, useEffect
} from 'react';
import { BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import { QueryClient, QueryClientProvider
} from '@tanstack/react-query';
import { ThemeProvider
} from './contexts/ThemeContext';
import { AuthProvider
} from './contexts/AuthContext';
import { AdminAuthProvider
} from './contexts/AdminAuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import SkillPage from './pages/SkillPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ContactPage from './pages/ContactPage';
import { ToastProvider
} from './hooks/useToast';
import ToastContainer from './components/ui/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  const [isLoading, setIsLoading
  ] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    },
    1000);
    return () => clearTimeout(timer);
  },
  []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-indigo-600">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-2">SKILLSWAP</h1>
          <p className="text-lg opacity-80">Connect. Learn. Grow.</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error: any) => {
          // Don't retry on 401/403 errors
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            return false;
          }
          return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      mutations: {
        retry: false,
        onError: (error: any) => {
          // Handle authentication errors globally
          if (error?.response?.status === 401) {
            window.location.href = '/admin/login';
          }
        }
      }
    }
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient
  }>
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider>
              <Router>
                <AdminAuthProvider>
                  <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    <Header />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />
  } />
                        <Route path="/skills" element={<SkillsPage />
  } />
                        <Route path="/skills/:id" element={<SkillPage />
  } />
                        <Route path="/search" element={<SearchPage />
  } />
                        <Route path="/profile/:id" element={<ProfilePage />
  } />
                        <Route path="/login" element={<LoginPage />
  } />
                        <Route path="/register" element={<RegisterPage />
  } />
                        <Route path="/contact" element={<ContactPage />
  } />
                        <Route path="/admin/login" element={<AdminLoginPage />
  } />
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />
  } />
                        <Route path="*" element={<NotFoundPage />
  } />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                  <ToastContainer />
                </AdminAuthProvider>
              </Router>
            </ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
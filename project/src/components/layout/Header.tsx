import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Search, Menu, X, SunMoon, MessageSquare, Bell, User, LogOut } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);

    if (loginStatus) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const { avatar } = JSON.parse(userData);
        setUserAvatar(avatar);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserAvatar('');
    navigate('/');
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Explore Skills', path: '/skills' },
    { name: 'Search', path: '/search' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <header className="top-0 z-50 sticky bg-white/80 dark:bg-gray-900/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-teal-600 dark:text-teal-400 text-xl">SkillSwap</span>
            </Link>

            <nav className="hidden md:flex md:space-x-8 md:ml-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${location.pathname === item.path
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                    } inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              <SunMoon size={20} />
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/messages"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <MessageSquare size={20} />
                </Link>
                <Link
                  to="/notifications"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <Bell size={20} />
                </Link>
                <div className="relative ml-2">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors"
                  >
                    <img
                      src={userAvatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                      alt="Profile"
                      className="rounded-full w-8 h-8 object-cover"
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="right-0 absolute bg-white dark:bg-gray-800 ring-opacity-5 shadow-lg mt-2 rounded-md ring-1 ring-black w-48">
                      <div className="py-1">
                        <Link
                          to="/profile/1"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User size={16} className="inline mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-gray-700 dark:text-gray-300 text-sm text-left"
                        >
                          <LogOut size={16} className="inline mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 font-medium text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 dark:text-gray-300 text-sm transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            <button
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="space-y-1 px-2 sm:px-3 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${location.pathname === item.path
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile/1"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800/60 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800/60 px-3 py-2 rounded-md w-full font-medium text-gray-700 dark:text-gray-300 text-base text-left transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-4 pt-4 border-gray-200 dark:border-gray-700 border-t">
                <Link
                  to="/login"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800/60 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block bg-teal-600 hover:bg-teal-700 mt-2 px-3 py-2 rounded-md font-medium text-white text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
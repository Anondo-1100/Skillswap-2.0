import { useState, useContext, useEffect, useRef
} from 'react';
import { Link, useLocation, useNavigate
} from 'react-router-dom';
import { ThemeContext
} from '../../contexts/ThemeContext';
import { Menu, X, SunMoon, MessageSquare, Bell, User, LogOut, Shield
} from 'lucide-react';

const Header = () => {
  const { toggleTheme
  } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen
  ] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen
  ] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen
  ] = useState(false);
  const [notifications, setNotifications
  ] = useState([
    {
      id: 1,
      title: "New skill match",
      message: "Found a match for your JavaScript learning interest",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      title: "New review",
      message: "Someone left a review on your Python teaching",
      time: "1 day ago",
      isRead: false
    }
  ]);
  const [isLoggedIn, setIsLoggedIn
  ] = useState(false);
  const [userAvatar, setUserAvatar
  ] = useState('');
  const [isAdmin, setIsAdmin
  ] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    setIsAdmin(adminStatus);

    if (loginStatus) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const { avatar
        } = JSON.parse(userData);
        setUserAvatar(avatar);
      }
    }
  },
  [location
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationsOpen &&
        notificationsRef.current &&
        notificationButtonRef.current &&
        !notificationsRef.current.contains(event.target) &&
        !notificationButtonRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }

      if (isProfileMenuOpen &&
        profileMenuRef.current &&
        profileButtonRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },
  [isNotificationsOpen, isProfileMenuOpen
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserAvatar('');
    navigate('/');
  };

  const navigation = [
    { name: 'Home', path: '/'
    },
    { name: 'Explore Skills', path: '/skills'
    },
    { name: 'Search', path: '/search'
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true
      })));
    }
  };

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
                  key={item.name
    }
                  to={item.path
    }
                  className={`${location.pathname === item.path
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
      } inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors`
    }
                >
                  {item.name
    }
                </Link>
              ))
  }
            </nav>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme
  }
              className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              <SunMoon size={
    20
  } />
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/messages"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <MessageSquare size={
      20
    } />
                </Link>
                <div className="relative">
                  <button
                    ref={notificationButtonRef
    }
                    onClick={handleNotificationClick
    }
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <Bell size={
      20
    } />
                    {unreadCount > 0 && (
                      <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                        {unreadCount
      }
                      </span>
                    )
    }
                  </button>

                  {isNotificationsOpen && (
                    <div
                      ref={notificationsRef
      }
                      className="right-0 z-50 absolute bg-white dark:bg-gray-800 ring-opacity-5 shadow-lg mt-2 rounded-md focus:outline-none ring-1 ring-black w-80"
                    >
                      <div className="p-4 border-gray-200 dark:border-gray-700 border-b">
                        <h3 className="font-medium text-gray-900 dark:text-white text-lg">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id
        }
                              className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`
        }
                            >
                              <p className="font-medium text-gray-900 dark:text-white">{notification.title
        }</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{notification.message
        }</p>
                              <p className="mt-1 text-gray-500 dark:text-gray-500 text-xs">{notification.time
        }</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
                            No notifications
                          </div>
                        )
      }
                      </div>
                      {notifications.length > 0 && (
                        <div className="p-4 border-gray-200 dark:border-gray-700 border-t">
                          <button
                            onClick={() => setNotifications([])
        }
                            className="text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400 text-sm"
                          >
                            Clear all
                          </button>
                        </div>
                      )
      }
                    </div>
                  )
    }
                </div>
                <div className="relative ml-2">
                  <button
                    ref={profileButtonRef
    }
                    onClick={toggleProfileMenu
    }
                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors"
                  >
                    <img
                      src={userAvatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    }
                      alt="Profile"
                      className="rounded-full w-8 h-8 object-cover"
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      ref={profileMenuRef
      }
                      className="right-0 absolute bg-white dark:bg-gray-800 ring-opacity-5 shadow-lg mt-2 rounded-md ring-1 ring-black w-48"
                    >
                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm"
                            onClick={() => setIsProfileMenuOpen(false)
        }
                          >
                            <Shield size={
          16
        } className="inline mr-2" />
                            Admin Dashboard
                          </Link>
                        )
      }
                        <Link
                          to="/profile/1"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm"
                          onClick={() => setIsProfileMenuOpen(false)
      }
                        >
                          <User size={
        16
      } className="inline mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileMenuOpen(false);
        }
      }
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-gray-700 dark:text-gray-300 text-sm text-left"
                        >
                          <LogOut size={
        16
      } className="inline mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )
    }
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
            )
  }

            <button
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              onClick={toggleMenu
  }
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={
      24
    } /> : <Menu size={
      24
    } />
  }
            </button>
          </div>
        </div>
      </div>

      { /* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="space-y-1 px-2 sm:px-3 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name
      }
                to={item.path
      }
                className={`${location.pathname === item.path
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
        } block px-3 py-2 rounded-md text-base font-medium transition-colors`
      }
                onClick={() => setIsMenuOpen(false)
      }
              >
                {item.name
      }
              </Link>
            ))
    }

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile/1"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800/60 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)
      }
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block hover:bg-gray-50 dark:hover:bg-gray-800/60 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 text-base transition-colors"
                    onClick={() => setIsMenuOpen(false)
        }
                  >
                    Admin Dashboard
                  </Link>
                )
      }
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
        }
      }
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
                  onClick={() => setIsMenuOpen(false)
      }
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block bg-teal-600 hover:bg-teal-700 mt-2 px-3 py-2 rounded-md font-medium text-white text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)
      }
                >
                  Sign up
                </Link>
              </div>
            )
    }
          </div>
        </div>
      )
  }
    </header>
  );
};

export default Header;
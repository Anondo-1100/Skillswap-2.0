import { createContext, useContext, useState, useEffect
} from 'react';
import { useNavigate
} from 'react-router-dom';

interface AdminProfile {
  email: string;
  role: string;
  name: string;
}

interface AdminAuthContextType {
  adminProfile: AdminProfile | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
  return context;
};

export const AdminAuthProvider = ({ children
}: { children: React.ReactNode
}) => {
  const [adminProfile, setAdminProfile
    ] = useState<AdminProfile | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated
    ] = useState(false);
  const navigate = useNavigate();

  // Load admin profile from storage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('adminProfile');
    if (storedProfile) {
      setAdminProfile(JSON.parse(storedProfile));
      setIsAdminAuthenticated(true);
        }
    },
    []);

  const loginAdmin = async (email: string, password: string) => {
        // In a real app, this would be an API call to verify admin credentials
    if (email === 'admin@skillswap.com' && password === 'admin123') {
      const adminProfile = {
        email: email,
        role: 'admin',
        name: 'System Administrator'
            };
      localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
      localStorage.setItem('isAdminLoggedIn', 'true');
      setAdminProfile(adminProfile);
      setIsAdminAuthenticated(true);
      navigate('/admin/dashboard');
        } else {
      throw new Error('Invalid admin credentials');
        }
    };

  const logoutAdmin = () => {
    localStorage.removeItem('adminProfile');
    localStorage.removeItem('isAdminLoggedIn');
    setAdminProfile(null);
    setIsAdminAuthenticated(false);
    navigate('/admin/login');
    };

  return (
    <AdminAuthContext.Provider
      value={
        {
        adminProfile,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
        }
    }
    >
      {children
    }
    </AdminAuthContext.Provider>
  );
};

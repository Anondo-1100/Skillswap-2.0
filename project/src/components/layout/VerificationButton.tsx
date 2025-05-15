import React from 'react';
import { Mail
} from 'lucide-react';
import { useAuth
} from '../../hooks/useAuth';

interface VerificationButtonProps {
  email: string;
  className?: string;
}

export const VerificationButton: React.FC<VerificationButtonProps> = ({ email, className = ''
}) => {
  const { sendVerificationEmail, loadingState
    } = useAuth();

  const handleClick = async () => {
    if (!email) return;
    await sendVerificationEmail();
    };

  return (
    <button
      type="button"
      onClick={handleClick
    }
      disabled={loadingState.verification || !email
    }
      className={`inline-flex items-center justify-center ${className
        } disabled:opacity-50 disabled:cursor-not-allowed`
    }
    >
      {loadingState.verification ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <Mail className="w-4 h-4 mr-2" />
      )
    }
      <span>{loadingState.verification ? 'Sending...' : 'Resend verification email'
    }</span>
    </button>
  );
};

export default VerificationButton;

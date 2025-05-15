import React,
{ createContext, useEffect, useState
} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    AuthError,
    sendEmailVerification,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth
} from '../config/firebase';
import { AuthContextType, AuthResponse
} from '../types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode
}> = ({ children
}) => {
    const [user, setUser
    ] = useState<User | null>(null);
    const [loading, setLoading
    ] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user?.email);
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    },
    []);

    const getErrorMessage = (error: any): string => {
        console.error('Authentication error:', error);
        
        if (error.code) {
            switch (error.code) {
                case 'auth/invalid-email':
                    return 'Invalid email address format.';
                case 'auth/user-disabled':
                    return 'This account has been disabled.';
                case 'auth/user-not-found':
                    return 'No account found with this email.';
                case 'auth/wrong-password':
                    return 'Incorrect password.';
                case 'auth/email-already-in-use':
                    return 'An account already exists with this email. Please login instead.';
                case 'auth/weak-password':
                    return 'Password should be at least 6 characters.';
                case 'auth/network-request-failed':
                    return 'Network error. Please check your connection.';
                case 'auth/too-many-requests':
                    return 'Too many unsuccessful attempts. Please try again later.';
                case 'auth/operation-not-allowed':
                    return 'This operation is not allowed.';
                case 'auth/requires-recent-login':
                    return 'Please log in again to complete this action.';
                default:
                    return `Authentication error: ${error.message
                }`;
            }
        }
        return error.message || 'An unexpected error occurred';
    };

    const sendVerificationEmail = async (): Promise<AuthResponse> => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }
            await sendEmailVerification(user);
            return {
                status: 'success',
                message: 'Verification email sent successfully!'
            };
        } catch (error) {
            return {
                status: 'error',
                message: getErrorMessage(error as AuthError)
            };
        }
    };

    const resetPassword = async (email: string): Promise<AuthResponse> => {
        try {
            await sendPasswordResetEmail(auth, email);
            return {
                status: 'success',
                message: 'Password reset email sent successfully!'
            };
        } catch (error) {
            return {
                status: 'error',
                message: getErrorMessage(error as AuthError)
            };
        }
    };

    const register = async (email: string, password: string): Promise<AuthResponse> => {
        console.log('Starting registration process for:', email);
        try {
            console.log('Creating user with Firebase...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully:', userCredential.user.email);
            
            try {
                console.log('Sending verification email...');
                await sendEmailVerification(userCredential.user);
                console.log('Verification email sent successfully');
            } catch (verificationError) {
                console.error('Error sending verification email:', verificationError);
            }

            try {
                console.log('Getting ID token...');
                const idToken = await userCredential.user.getIdToken();
                console.log('Got ID token, contacting backend...');
                
                const response = await fetch('http: //localhost:8000/api/auth/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                },
                    body: JSON.stringify({ idToken
                }),
            });
                
                if (!response.ok) {
                    console.error('Backend response not OK:', response.status);
                    const errorText = await response.text();
                    console.error('Backend error text:', errorText);
                    throw new Error(`Backend error: ${response.status
                } ${errorText
                }`);
            }

                const data = await response.json();
                console.log('Backend response:', data);
                
                return {
                    status: 'success',
                    message: 'Registration successful! Please check your email for verification.',
                    data
            };
        } catch (backendError) {
                console.error('Backend communication error:', backendError);
                return {
                    status: 'error',
                    message: 'Registration with Firebase successful but failed to communicate with backend.'
            };
        }
    } catch (error: any) {
            console.error('Firebase registration error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            return {
                status: 'error',
                message: getErrorMessage(error)
        };
    }
};

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            const response = await fetch('http: //localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        },
                body: JSON.stringify({ idToken
        }),
    });
            return response.json();
} catch (error) {
            return {
                status: 'error',
                message: getErrorMessage(error as AuthError)
    };
}
};

    return (
        <AuthContext.Provider value={
{
            user,
            loading,
            login,
            register,
            logout: () => signOut(auth),
            sendVerificationEmail,
            resetPassword,
}
}>
            {!loading && children
}
        </AuthContext.Provider>
    );
};

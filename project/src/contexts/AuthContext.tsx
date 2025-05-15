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
import { authApi
} from '../services/api';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode
}> = ({ children
}) => {
    const [user, setUser
    ] = useState<User | null>(null);
    const [loading, setLoading
    ] = useState(true);
    const [loadingState, setLoadingState
    ] = useState<{
        login: boolean;
        register: boolean;
        verification: boolean;
        passwordReset: boolean;
    }>({
        login: false,
        register: false,
        verification: false,
        passwordReset: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    },
    []);

    const getErrorMessage = (error: AuthError): string => {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'The email address format is not valid. Please check and try again.';
            case 'auth/user-disabled':
                return 'This account has been disabled. Please contact support.';
            case 'auth/user-not-found':
                return 'No account exists with this email address. Please sign up first.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please check your password and try again.';
            case 'auth/email-already-in-use':
                return 'An account already exists with this email address. Please log in instead.';
            case 'auth/weak-password':
                return 'Password is too weak. It should be at least 6 characters long.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your connection.';
            case 'auth/too-many-requests':
                return 'Too many unsuccessful attempts. Please try again later.';
            case 'auth/operation-not-allowed':
                return 'This operation is not allowed.';
            case 'auth/requires-recent-login':
                return 'Please log in again to complete this action.';
            case 'auth/email-not-verified':
                return 'Please verify your email address.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const register = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            setLoadingState(prevState => ({
                ...prevState,
                register: true
            }));

            console.log('Starting registration process...');
            
            // Create user in Firebase
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Firebase user created successfully:', result.user.uid);
            
            const idToken = await result.user.getIdToken();
            console.log('Got Firebase ID token');

            try {
                // Register with backend
                console.log('Attempting to register with backend...');
                const response = await authApi.register(idToken);
                console.log('Backend registration response:', response);

                if (response.status === 'success') {
                    try {
                        // Send email verification
                        await sendEmailVerification(result.user);
                        console.log('Verification email sent');
                        
                        // Update user in local storage to handle page refreshes
                        localStorage.setItem('pendingVerification', 'true');
                        localStorage.setItem('verificationEmail', email);
                        
                        return {
                            status: 'success',
                            message: 'Registration successful! Please check your email to verify your account.',
                            data: {
                                emailVerified: false
                            }
                        };
                    } catch (verificationError) {
                        console.error('Failed to send verification email:', verificationError);
                        // Still return success but with a different message
                        return {
                            status: 'success',
                            message: 'Account created but failed to send verification email. Please try logging in to resend the verification email.',
                            data: {
                                emailVerified: false
                            }
                        };
                    }
                }
                // If backend registration fails, delete the Firebase user
                console.log('Backend registration failed:', response.message);
                await result.user.delete();
                return {
                    status: 'error',
                    message: response.message || 'Registration failed. Please try again.'
                };
            } catch (backendError) {
                // If backend request fails, delete the Firebase user
                console.error('Backend error:', backendError);
                await result.user.delete();
                if (backendError instanceof Error) {
                    return {
                        status: 'error',
                        message: backendError.message
                    };
                }
                return {
                    status: 'error',
                    message: 'Unable to connect to server. Please try again later.'
                };
            }
        } catch (error) {
            console.error('Firebase error:', error);
            const authError = error as AuthError;
            return {
                status: 'error',
                message: getErrorMessage(authError),
                code: authError.code
            };
        } finally {
            setLoadingState(prevState => ({
                ...prevState,
                register: false
            }));
        }
    };

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            setLoadingState(prevState => ({
                ...prevState,
                login: true
            }));

            const result = await signInWithEmailAndPassword(auth, email, password);
            if (!result.user.emailVerified) {
                return {
                    status: 'error',
                    message: 'Please verify your email before logging in',
                    code: 'auth/email-not-verified'
                };
            }

            try {
                const authStatus = await authApi.status();
                if (authStatus.status === 'success') {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userId', result.user.uid);
                    return {
                        status: 'success',
                        message: 'Logged in successfully'
                    };
                }
                return {
                    status: 'error',
                    message: authStatus.message || 'Login failed. Please try again.',
                    code: 'auth/backend-error'
                };
            } catch (backendError) {
                return {
                    status: 'error',
                    message: backendError instanceof Error ? backendError.message : 'Unable to connect to server',
                    code: 'auth/backend-error'
                };
            }
        } catch (error) {
            if (error instanceof Error && 'code' in error) {
                const authError = error as AuthError;
                return {
                    status: 'error',
                    message: getErrorMessage(authError),
                    code: authError.code || 'auth/unknown-error'
                };
            }
            return {
                status: 'error',
                message: 'An unexpected error occurred',
                code: 'auth/unknown-error'
            };
        } finally {
            setLoadingState(prevState => ({
                ...prevState,
                login: false
            }));
        }
    };

    const sendVerificationEmail = async (): Promise<AuthResponse> => {
        try {
            setLoadingState(prevState => ({
                ...prevState,
                verification: true
            }));

            if (!user) {
                throw new Error('No user logged in');
            }
            
            await sendEmailVerification(user);
            const idToken = await user.getIdToken();
            await authApi.verifyEmail(idToken);
            
            return {
                status: 'success',
                message: 'Verification email sent successfully!'
            };
        } catch (error) {
            return {
                status: 'error',
                message: error instanceof Error ? error.message : getErrorMessage(error as AuthError)
            };
        } finally {
            setLoadingState(prevState => ({
                ...prevState,
                verification: false
            }));
        }
    };

    const resetPassword = async (email: string): Promise<AuthResponse> => {
        try {
            setLoadingState(prevState => ({
                ...prevState,
                passwordReset: true
            }));

            await sendPasswordResetEmail(auth, email);
            return {
                status: 'success',
                message: 'Password reset email sent successfully!'
            };
        } catch (error) {
            return {
                status: 'error',
                message: error instanceof Error ? error.message : getErrorMessage(error as AuthError)
            };
        } finally {
            setLoadingState(prevState => ({
                ...prevState,
                passwordReset: false
            }));
        }
    };

    const contextValue = {
        user,
        loading,
        loadingState,
        login,
        register,
        logout: () => signOut(auth),
        sendVerificationEmail,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={contextValue
    }>
            {!loading && children
    }
        </AuthContext.Provider>
    );
};

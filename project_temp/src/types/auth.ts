import { User } from 'firebase/auth';

export interface AuthResponse {
    status: 'success' | 'error';
    message: string;
    data?: Record<string, unknown>;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    googleSignIn: () => Promise<AuthResponse>;
    sendVerificationEmail: () => Promise<AuthResponse>;
    resetPassword: (email: string) => Promise<AuthResponse>;
}
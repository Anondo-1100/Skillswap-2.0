import { User } from 'firebase/auth';

export interface LoadingState {
    login: boolean;
    register: boolean;
    verification: boolean;
    passwordReset: boolean;
}

export interface AuthResponse {
    status: 'success' | 'error';
    message: string;
    code?: string;
    data?: {
        user?: User;
        emailVerified?: boolean;
    };
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    loadingState: LoadingState;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    sendVerificationEmail: () => Promise<AuthResponse>;
    resetPassword: (email: string) => Promise<AuthResponse>;
}
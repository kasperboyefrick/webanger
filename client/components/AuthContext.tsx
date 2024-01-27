// AuthContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define user authentication state
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

// Define the user object
interface User {
    id: number;
    username: string;
    // Add other user properties here
}

// Define authentication actions
type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// Create the context
interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a reducer to manage authentication state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return { isAuthenticated: false, user: null };
        default:
            return state;
    }
};

// Create an AuthProvider component to wrap your application
interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the context
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };

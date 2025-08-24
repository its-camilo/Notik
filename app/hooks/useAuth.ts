// Thin compatibility layer: re-export from .tsx implementation so imports that
// request '@/hooks/useAuth' resolve correctly regardless of extension.
// Forward to the TSX implementation (no extension) so module resolution selects the .tsx file.
import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout } from '@/services/auth';
import type { AuthState, RegisterCredentials, AuthContextValue } from '@/types/auth';
import Toast from 'react-native-toast-message';

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, isLoading: true, user: null, error: null });

	const checkAuth = useCallback(async () => {
		try {
			setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
			const user = await getCurrentUser();
			if (user) setAuthState({ isAuthenticated: true, isLoading: false, user, error: null });
			else setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: null });
		} catch (error) {
			console.error('Error verificando autenticación:', error);
			setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: 'Error verificando autenticación' });
		}
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		try {
			setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
			const authData = await authLogin({ email, password });
			setAuthState({ isAuthenticated: true, isLoading: false, user: authData.user, error: null });

			// Toast de éxito para login
			Toast.show({
				type: 'success',
				text1: '¡Bienvenido! 👋',
				text2: `Hola ${authData.user.username}, has iniciado sesión exitosamente`,
				position: 'top',
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 60,
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error en el login';
			setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
			throw error;
		}
	}, []);

	const register = useCallback(async (data: RegisterCredentials) => {
		try {
			setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
			const authData = await authRegister({ username: data.username, email: data.email, password: data.password });
			setAuthState({ isAuthenticated: true, isLoading: false, user: authData.user, error: null });

			// Toast de éxito para registro
			Toast.show({
				type: 'success',
				text1: '¡Cuenta creada! 🎉',
				text2: `¡Hola ${authData.user.username}! Tu cuenta se ha creado exitosamente`,
				position: 'top',
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 60,
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error en el registro';
			setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
			throw error;
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			setAuthState(prev => ({ ...prev, isLoading: true }));
			await authLogout();
			setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: null });

			// Toast de éxito para logout
			Toast.show({
				type: 'info',
				text1: '¡Hasta luego! 👋',
				text2: 'Has cerrado sesión exitosamente',
				position: 'top',
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 60,
			});
		} catch (error) {
			console.error('Error en logout:', error);
			setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: 'Error en logout' });
		}
	}, []);

	useEffect(() => { checkAuth(); }, [checkAuth]);

	// Return provider using createElement to avoid JSX in .ts
	return React.createElement(AuthContext.Provider, { value: { ...authState, login, register, logout, checkAuth } }, children);
};

export const useAuth = (): AuthContextValue => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
	return ctx;
};

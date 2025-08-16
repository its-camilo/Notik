// Force default to light theme for the whole app.
// Previously we re-exported the native hook; return a stable 'light' value so
// components always render in light mode by default.
export function useColorScheme(): 'light' | 'dark' | null {
	return 'light';
}

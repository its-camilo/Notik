import { useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * Hook to ensure the web page title is always "Notik"
 */
export function useWebTitle() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Set initial title
      document.title = 'Notik';

      // Create a MutationObserver to watch for title changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
            if (document.title !== 'Notik') {
              document.title = 'Notik';
            }
          }
        });
      });

      // Observe changes to the title element
      const titleElement = document.querySelector('title');
      if (titleElement) {
        observer.observe(titleElement, {
          childList: true,
          subtree: true
        });
      }

      // Also observe changes to the head element in case title is replaced
      observer.observe(document.head, {
        childList: true,
        subtree: true
      });

      // Set up an interval to check title periodically
      const interval = setInterval(() => {
        if (document.title !== 'Notik') {
          document.title = 'Notik';
        }
      }, 1000);

      // Cleanup function
      return () => {
        observer.disconnect();
        clearInterval(interval);
      };
    }
  }, []);
}

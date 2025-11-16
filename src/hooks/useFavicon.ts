import { useEffect } from 'react';
import modoOscuro from '@assets/Logo/modo_oscuro.svg';
import modoClaro from '@assets/Logo/modo_claro.svg';

export const useFavicon = () => {
  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (favicon) {
        favicon.href = isDark ? modoOscuro : modoClaro;
      }
    };

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(darkModeQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => updateFavicon(e.matches);
    darkModeQuery.addEventListener('change', handleChange);

    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);
};
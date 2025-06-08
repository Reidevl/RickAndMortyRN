import i18n from '@/lib/i18n';
import { useCallback } from 'react';

export function useTranslation() {
  const t = useCallback((key: string) => {
    return i18n.t(key);
  }, []);

  const setLocale = useCallback((locale: string) => {
    i18n.locale = locale;
  }, []);

  return {
    t,
    locale: i18n.locale,
    setLocale,
  };
} 
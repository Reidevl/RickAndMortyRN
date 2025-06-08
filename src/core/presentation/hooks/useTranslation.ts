import i18n from '@i18n/i18n';
import { useCallback } from 'react';

export default function useTranslation() {
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
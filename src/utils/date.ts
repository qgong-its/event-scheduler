export const formatDate = (date: string, locale = 'de-DE') =>
  new Date(date).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

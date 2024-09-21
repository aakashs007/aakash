'use client';

import { useEffect } from 'react';

function ThemeInitializer() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  return null;
}

export default ThemeInitializer;

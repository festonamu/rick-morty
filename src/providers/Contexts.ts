import { createContext } from 'react';

export const ThemeContext = createContext<[string, (theme: 'light' | 'dark') => void]>([
  'dark',
  () => { }
]);
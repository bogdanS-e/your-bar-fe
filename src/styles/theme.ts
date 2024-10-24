import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    availableBackground: '#E8F5E9',
    availableBorder: '#0084005e',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    up: (key: keyof DefaultTheme['breakpoints']['values']) => {
      const value = theme.breakpoints.values[key];
      return `@media (min-width:${value}px)`;
    },
    down: (key: keyof DefaultTheme['breakpoints']['values']) => {
      const value = theme.breakpoints.values[key];
      return `@media (max-width:${value}px)`;
    },
  },
};

export default theme;

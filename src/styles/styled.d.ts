import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      availableBackground: string;
      availableBorder: string;
    };
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      up: (key: keyof DefaultTheme['breakpoints']['values']) => string;
      down: (key: keyof DefaultTheme['breakpoints']['values']) => string;
    };
  }
}

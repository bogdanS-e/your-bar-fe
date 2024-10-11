import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      availableBackground: string;
      availableBorder: string;
    };
  }
}

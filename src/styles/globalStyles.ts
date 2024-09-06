import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ececec;
    color: #080808;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .dropdown-fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .dropdown-fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }
  .dropdown-fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .dropdown-fade-exit-active {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }
`;

export default GlobalStyle;
